const { evaluateCondition } = require('./evaluateCondition')
// const { flagData } = require('../lib/flagData');
const { getRuleset } = require('./apiClient');
const redis = require('redis');
require("dotenv").config();

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
// instantiating a connection for cache
const redisClient = redis.createClient(
  {
    port: REDIS_PORT,
    host: REDIS_HOST,
  }
);

// connect to redis
;(async () => {
try {
  await redisClient.connect();
  
  redisClient.on('connect', () => console.log(`Cache redis on port ${REDIS_PORT}`));
  redisClient.on('error', (err) => console.error('Error: ' + err));
} catch (err) { console.error(err)}
})()

// get Data from redis or Manager
let sdkKeys;
let flags;
const getData = async () => {
  sdkKeys = await redisClient.get('sdkKeys');
  if (sdkKeys) {
    flags = await redisClient.get('flags');
    console.log('Data set from redis')
  } else {
    console.log('Need to fetch from Manager');
    try {
      const data  = await getRuleset();
      console.log('data from Manager:', data)
      sdkKeys = data.sdkKeys;
      flags = data.flags;
    } catch(err) {
      console.error(err);
      console.error("Could fetch data from manager...");
    }

  }
  // returning this for serverSDK
  console.log('sdkKeys from getData', sdkKeys);
  return { sdkKeys, flags }
}

const validSdkKey = (sdkKey) => {
  console.log(sdkKeys)
  // return sdkKeys[sdkKey]; NOTE: this is a temporary fix until the object returned by manager is a hashmap instead of array of sdk keys
  return sdkKeys.includes(sdkKey);
}

// evaluate audience conditions based on user attributes
function evaluateAudience(audienceContext, userContext) {
  let evaluation = false; // default to false
  for (const condition of audienceContext.conditions) {
    if (evaluateCondition(userContext, condition)) {
      evaluation = true;
      if (audienceContext.combine === 'ANY') {
        // if 'ANY' set, then return as soon as one condition is satisfied
        break;
      } else if (audienceContext.combine === 'ALL') {
        // keep going until all conditions are evaluated
        continue;
      }
    } else { // condition was false
      // if condition is not met and ANY, keep going until theres no more conditions
      if (audienceContext.combine === 'ALL') {
        // exit early because at least one condition was not met.
        evaluation = false;
        break;
      }
      // 'ANY' and false, go to next condition
    }
  }
  // console.log('audience key evaluations', audienceEvals);
  return evaluation;
}

// Returns overall flag evaluation based on set of audience logic evaluations for a given user
function evaluateFlags(userContext) {
  const flagEvals = {};
  const audienceEvals = {};
  // const userAudienceEvals = evaluateAudiences(sdkInstance, userContext);
  // Evaluate each flag
  for (const flag in flags) {
    let evaluation = false;
    const { status, ...audiences} = flags[flag]
    const audienceKeys = Object.keys(audiences)
    if (status && audienceKeys.length == 0)  {
      // flags without any audience targeting apply to everyone
      evaluation = true
    } else if (status) {
      // loop through all audiences to determine final flag evaluation
      // whenever audience eval is true, break. if it's false, go to next;
      for (const audience of audienceKeys) {
        if (audienceEvals[audience]) {
          evaluation = true;
          break; // return early as soon as one audience satisfied
        } else if (!audienceEvals.hasOwnProperty(audience)) {
          // if audience eval is undefine, evaluate;
          const audienceContext = flags[flag][audience];
          audienceEvals[audience] = evaluateAudience(audienceContext, userContext)
          // console.log('audience:', audience, 'eval:', evaluateAudience(audienceContext, userContext))
          if (audienceEvals[audience]) {
            evaluation = true;
            break;
          }
        }
      }
    } 
    flagEvals[flag] = evaluation; 
  };
  console.log('evaluated flags: ', flagEvals)
  return flagEvals;
}

// TEST
// flags = {
//   sdkKeys: {
//     "beta_sdk_0":true,
//     "de9-6bf1a0c-3":true,
//     "fa4-d731f0e-4":true
//   },

//   "beta-header": {
//       "status": true,
//       "beta-testers": {
//         combine: "ANY",
//         conditions: [
//           {
//             "attribute": "beta",
//             "operator": "EQ",
//             "vals": ["true"],
//             "negate": false
//           }
//         ]
//       }
//   },
//   "CA-header": {
//     "status": true,
//     "na-testers": {
//       combine: "ALL",
//       conditions: [
//         {
//           "attribute": "country",
//           "operator": "IN",
//           "vals": ["canada", "usa"],
//           "negate": false
//         },
//         {
//           "attribute": "age",
//           "operator": "GT",
//           "vals": ["18"],
//           "negate": false
//         }
//       ]
//     }
//   }
// }
// const testUserContext1 = {
//   userId: 'JJUY',
//   beta: false,
//   age: 16,
//   country: 'CanadA',
// }
// const testUserContext2 = {
//   userId: 'JJUY',
//   beta: true,
//   age: 24,
//   country: 'CanadA',
// }
// console.log('NONE', evaluateFlags(testUserContext1))
// console.log('=====')
// console.log('beta & canada', evaluateFlags(testUserContext2))

module.exports = { evaluateFlags, validSdkKey, getData }