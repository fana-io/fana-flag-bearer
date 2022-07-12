/*Test cases:
input: test for userId as only attribute passed in from userContext object
- audience exists and targets specific userId, flag toggled on
  - userID isn't target user
  - userID is target user
  - ANY combo
  - ALL combo
  - audience exists and targets userId
  */

// finds sdkInstance object from full flag data set
function getSdkInstance(sdkKey, allFlagData) {
  return allFlagData.find(sdk => sdk.sdkKey === sdkKey);
}

// evaluate audience conditions & whether they satsify userId as target attribute for MVP
// TODO: this needs to be generalized to work with any attribute, not just userId
function evaluateAudiences(sdkInstance, targetAttribute, targetAttrValue) {
  const audienceEvals = {};
  sdkInstance.audiences.forEach((audience) => {
    const audienceKey = audience.audienceKey;
    let eval = false; // default to false
    // let countConditionsLeftToEvaluate = audience.conditions.length;

    for (const condition of audience.conditions) {
      // countConditionsLeftToEvaluate--;

      if (
        condition.attribute === targetAttribute &&
        condition.operator === 'EQ' &&
        condition.value === targetAttrValue
      ) {
        eval = true;
        if (audience.combination === 'ANY') {
          // if 'ANY' set, then return as soon as one condition is satisfied
          break;
        } else if (audience.combination === 'ALL') {
          // keep going until all conditions are evaluated
          continue;
        }
      } else { // condition was false
        // if condition is not met and ANY, keep going until theres no more conditions
        if (audience.combination === 'ALL') {
          // exit early because at least one condition was not met.
          eval = false;
          break;
        }
        // 'ANY' and false, go to next condition
      }
    }
    audienceEvals[audienceKey] = eval;
  });
  // console.log('audience key evaluations', audienceEvals);
  return audienceEvals;
}

// Returns overall flag evaluation based on set of audience logic evaluations for a given user
// TODO: update hard coding for `targetAttribute`
function evaluateFlags(sdkInstance, userId) {
  const flagEvals = {};
  const userAudienceEvals = evaluateAudiences(sdkInstance, "userId", userId);
  // Evaluate each flag in sdkInstance
  sdkInstance.flags.forEach((flag) => {
    let eval = false;
    
    if (flag.status && flag.audiences.length === 0) {
      // flags without any audience targeting apply to everyone
      eval = true
    } else if (flag.status) {
      // loop through all audiences to determine final flag evaluation
      for (const audience of flag.audiences) {
        if (userAudienceEvals[audience]) {
          eval = true;
          break; // return early as soon as one audience satisfied
        }
      }
    } 

    flagEvals[flag.flagKey] = eval; 
  });
  // console.log('flag evals for user:', flagEvals);
  return flagEvals;
}


  // returns an array of 'update' objects organized by SDK instance, which holds array of flags that have been toggled off
function findDisabledFlags(flagData) {
  const flagUpdates = flagData.map(sdkInstance => {
    let flagUpdate = {};
    flagUpdate['sdk'] = sdkInstance.sdkKey;

    const disabledFlags = sdkInstance.flags.reduce((accum, flag) => {
      let { status, flagKey } = flag;
      if (!status) {
        accum.push({
          flagKey,
          status,
          value: false,
        });
      }
      return accum;
    }, []);

    flagUpdate['flags'] = disabledFlags;
    return flagUpdate;
  });
  return flagUpdates;
}

module.exports = { getSdkInstance, evaluateFlags, findDisabledFlags }