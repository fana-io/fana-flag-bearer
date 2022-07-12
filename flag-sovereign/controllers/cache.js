// TODO: make OO cache object?
// - initialize cache empty
// - add to cache
// - look up user flags from cache
const NodeCache = require("node-cache");
const cache = new NodeCache( { stdTTL: 60 } );
// TODO: what to do when user attribute changes 
// hashing attribute?
// populate cache for userId
function populateCacheForUser(sdkKey, userId, flagEvaluations) {
  const userEvals = {};
  userEvals[userId] = { ...flagEvaluations };
  cache.set(sdkKey, userEvals); // cache[sdkKey][userId] = { flagEval}
}

// cache middleWare
const checkCache = (req, res, next) => {
  let sdkKey = req.body.sdkKey
  let userId = req.body.userContext.userId
  // need to fix  
  try {
    if (cache.has(sdkKey)) { //just flag eval
      console.log('from cache');
      return res.status(200).send(cache.get(sdkKey[userId]))
    } else {
      console.log('not found in cache', cache.get(sdkKey));
      return next();  
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { populateCacheForUser, checkCache }