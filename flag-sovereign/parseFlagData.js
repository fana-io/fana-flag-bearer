// PEDAC
// === Transform data dump from Manager into cache object form ====
// 1. query full ruleset array to find sdkKey instance. 
/*
i: sdk, userid
o: object containing flag evaluations, key: flagname, value: eval
  user {
    new-button: true,
    new-nav-bar: false,
  }
  2. for each flag in sdkInstance, return an evaluation for a user
    - iterate through each audienceId. for each:
      - iterate through array of conditions
        - if conditions.attribute === "userID" && operator === "=" && value === userContext.userID
        - user is part of audience (flag eval value = TRUE)
        - else, user isn't part of audience (flag eval value = FALSE)
*/
/*
Test cases:
- audience exists and targets specific userId, flag toggled on
  - userID isn't target user
  - userID is target user
  - ANY combo
  - ALL combo
  - audience exists and targets userId, flag toggled off
  */

// ============== Sample data ============== 
let USERID = "jjuy"
let SDKKEY = "my-sdk-key"
const allFlags = [
  {
    sdkKey: "my-sdk-key",
    flags: [ 
      {
        name: "new-button",
        status: true, 
        combination: 'ANY',
        audiences: [1,2]
      },
      {
        name: "new-nav-bar",
        status: true, 
        combination: 'ALL',
        audiences: [1,2]
      },
      {
        name: "flag-without-audience",
        status: true, 
        combination: null,
        audiences: []
      }
    ],
    audiences: [
      {
        audienceId: 1,
        combination: 'ALL',
        conditions: [
          {
            attribute: "userId",
            operator: "=",
            value: "jjuy"
          },
          {
            attribute: "userId",
            operator: "=",
            value: "ahsu"
          },
        ]
      },
      {
        audienceId: 2,
        combination: 'ANY',
        conditions: [
          {
            attribute: "email",
            operator: "=",
            value: "jjuy@gmail.com"
          },
          {
            attribute: "userId",
            operator: "=",
            value: "jjuy"
          },
        ]
      },
      {
        audienceId: 3,
        combination: 'ANY',
        conditions: [
          {
            attribute: "email",
            operator: "=",
            value: "yoorhim@gmail.com"
          },
          {
            attribute: "name",
            operator: "=",
            value: "Yoorhim"
          },
        ]
      },
    ]
  }
];

// ============== DRIVER CODE ============== 
const cache = {} 
const sdkInstance = getSdkInstance(SDKKEY, allFlags)
const juanAudienceEvals = evaluateAudiencesOnUserId(sdkInstance, USERID);
const juanFlagEvaluations = evaluateFlags(sdkInstance, juanAudienceEvals)
populateCacheForUser(SDKKEY, USERID, juanFlagEvaluations)

// If client SDK re-initializes with same sdk key and user, we can serve cached values
console.log(cache['my-sdk-key']['jjuy'])

// ============== FUNCTION DEFINITIONS ============== 

// query flag data based on unique user id -- IS THIS NEEDED?
function getUserFlags(userId, sdkKey) {
  const flagsWithAudienceIds = []
  sdkInstance.flags.forEach(flag => {
    if (flag.audiences.length) {
      flagsWithAudienceIds.push(...flag.audiences)
    }
  });
  return flagsWithAudienceIds;
}

// finds sdkInstance object from full flag data set
function getSdkInstance(sdkKey, allFlagData) {
  const sdkInstance = allFlagData.find(sdk => sdk.sdkKey === sdkKey)
  return sdkInstance ? sdkInstance : new Error('sdk data not found')
}

// evaluate audience conditions & whether they satsify userId as target attribute for MVP
// note - this needs to be generalized to work with any attribute, not just userId
function evaluateAudiencesOnUserId (sdkInstance, userId) {
  const audienceEvals = {}
  sdkInstance.audiences.forEach(audience => {
    const id = audience.audienceId
    let eval = false; // default to false
    let countConditionsLeftToEvaluate = audience.conditions.length;

    for (const condition of audience.conditions) {
      countConditionsLeftToEvaluate--;
      
      if (condition.attribute === 'userId' && condition.operator === '=' && condition.value === userId) {
        eval = true; 
        if (audience.combination === 'ANY') {
          // if 'ANY' set, then return as soon as one condition is satisfied
          break 
        } else if (audience.combination === 'ALL') {
          // keep going until all conditions are evaluated
          continue
        }
      } else {
        // if condition is not met and ANY, keep going until theres no more conditions
        if (audience.combination === 'ALL') {
          // exit early because at least one condition was not met.
          eval = false;
          break 
        } else if (audience.combination === 'ANY' && countConditionsLeftToEvaluate > 0) {
          continue 
        } else {
          eval = false 
        }
      }
    }
    audienceEvals[id] = eval;
  })
  console.log('audience id evaluations', audienceEvals);
  return audienceEvals
}

// Returns overall flag evaluation based on set of audience logic evaluations for a given user 
function evaluateFlags(sdkInstance, userAudienceEvals) {
   const flagEvals = {}

   // Evlauate each flag in sdkInstance
   sdkInstance.flags.forEach(flag => {
    let eval = false;
    let countAudiencesLeftToEvaluate = flag.audiences.length
    
    // loop through all audiences to determine final flag evaluation
    for (const audienceId of flag.audiences) {
      countAudiencesLeftToEvaluate--;

      if (userAudienceEvals[audienceId]) {
        eval = true 
        if (flag.combination=== 'ANY') {
          break // return early as soon as one audience satisfied
        } else if (flag.combination === 'ALL') {
          continue // check remaining audiences
        }
      } else {
        if (flag.combination === 'ALL') {
          eval = false;
          break // return early as soon as one audience isn't satisified
        } else if (flag.combination === 'ANY' && countAudiencesLeftToEvaluate > 0) {
          continue
        } 
      }
    }
    flagEvals[flag.name] = eval; 
  })
  console.log('flag evals for user:', flagEvals);
  return flagEvals
}

// populate cache for userId
function populateCacheForUser (sdkKey, userId, flagEvaluations) {
  const userEvals = {}
  userEvals[userId] = {...flagEvaluations}
  cache[sdkKey] = userEvals
  console.log('Cache updated for jjuy:', cache);
}