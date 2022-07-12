// TODO: make OO cache object?
// - initialize cache empty
// - add to cache
// - look up user flags from cache
const NodeCache = require("node-cache");
const cache = new NodeCache( { stdTTL: 3600, checkperiod: 3620 } ); // what is the difference between stdTTL and checkperiod?

// populate cache for userId
function populateCacheForUser(sdkKey, userId, flagEvaluations) {
  const userEvals = {};
  userEvals[userId] = { ...flagEvaluations };
  cache.set(sdkKey, userEvals); // cache[sdkKey][userId] = { flagEval}
}

// cache middleWare
const checkCache = (req, res, next) => {
  try {
    if (cache.has(sdkKey[userId])) {
      return res.status(200).send(cache.get(sdkKey[userId]))
    }
    return next();
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { populateCacheForUser, checkCache }