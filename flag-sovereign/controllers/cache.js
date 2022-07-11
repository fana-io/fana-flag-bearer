// TODO: make OO cache object?
// - initialize cache empty
// - add to cache
// - look up user flags from cache

const cache = {}

// populate cache for userId
function populateCacheForUser(sdkKey, userId, flagEvaluations) {
  const userEvals = {};
  userEvals[userId] = { ...flagEvaluations };
  cache[sdkKey] = userEvals;
  console.log('Cache updated for jjuy:', cache);
}

module.exports = { populateCacheForUser }
  
