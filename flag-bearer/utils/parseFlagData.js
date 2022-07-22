const { evaluateCondition } = require('./evaluateCondition')
// const { allFlagData, testUser } = require('../seed-data')
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
    const { data } = await getRuleset();
    sdkKeys = data.sdkKeys;
    flags = data.flags;
  }
  // returning this for serverSDK
  return { sdkKeys, flags }
}

const validSdkKey = (sdkKey) => {
  return sdkKeys[sdkKey];
}

// evaluate audience conditions based on user attributes
function evaluateAudience(audienceContext, userContext) {
  let eval = false; // default to false
  for (const condition of audienceContext.conditions) {
    if (evaluateCondition(userContext, condition)) {
      eval = true;
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
        eval = false;
        break;
      }
      // 'ANY' and false, go to next condition
    }
  }
  // console.log('audience key evaluations', audienceEvals);
  return eval;
}

// Returns overall flag evaluation based on set of audience logic evaluations for a given user
function evaluateFlags(userContext) {
  const flagEvals = {};
  const audienceEvals = {};
  // const userAudienceEvals = evaluateAudiences(sdkInstance, userContext);
  // Evaluate each flag
  for (const flag in flags) {
    let eval = false;
    const { status, ...audiences} = flags[flag]
    const audienceKeys = Object.keys(audiences)

    if (status && audienceKeys.length == 0)  {
      // flags without any audience targeting apply to everyone
      eval = true
    } else if (status) {
      // loop through all audiences to determine final flag evaluation
      // whenever audience eval is true, break. if it's false, go to next;
      for (const audience of audienceKeys) {
        if (audienceEvals[audience]) {
          eval = true;
          break; // return early as soon as one audience satisfied
        } else if (!audienceEvals.hasOwnProperty(audience)) {
          // if audience eval is undefine, evaluate;
          const audienceContext = flags[flag][audience];
          audienceEvals[audience] = evaluateAudience(audienceContext, userContext)
          // console.log('audience:', audience, 'eval:', evaluateAudience(audienceContext, userContext))
          if (audienceEvals[audience]) {
            eval = true;
            break;
          }
        }
      }
    } 
    flagEvals[flag] = eval; 
  };
  return flagEvals;
}

// depricated: updating via pubsub/sse
// function findDisabledFlags(flagData) {
//   const flagUpdates = flagData.map(sdkInstance => {
//     let flagUpdate = {};
//     flagUpdate['sdk'] = sdkInstance.sdkKey;

//     const disabledFlags = sdkInstance.flags.reduce((accum, flag) => {
//       let { status, flagKey } = flag;
//       if (!status) {
//         accum.push({
//           flagKey,
//           status,
//           value: false,
//         });
//       }
//       return accum;
//     }, []);

//     flagUpdate['flags'] = disabledFlags;
//     return flagUpdate;
//   });

//   return flagUpdates;
// }

// TEST
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
// getData();
module.exports = { evaluateFlags, validSdkKey, getData }