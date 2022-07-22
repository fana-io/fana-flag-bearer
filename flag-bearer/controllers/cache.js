// TODO: make OO cache object?
// - initialize cache empty
// - add to cache
// - look up user flags from cache
const { createHash } = require('crypto');
const NodeCache = require("node-cache");
const cache = new NodeCache( { stdTTL: 60 } );

// populate cache for userId
function populateCacheForUser(sdkKey, userContext, flagEvaluations) {
  const userEvals = {};
  const { userId, ...userAttributes } = userContext;
  const hashedUserAttributes = createHashFromObject(userAttributes);
  userEvals[userId] = { "hashedAttribute": hashedUserAttributes }; 
  userEvals[userId]["flagEval"] = { ...flagEvaluations };
  cache.set(sdkKey, userEvals); // cache[sdkKey][userId][hashedAttribute] = { flagEval}
  return
}

// cache middleWare

// TODO: what to do when user attribute changes 
  // hashing attribute;
  // if hashed attributes == then use cache, else next

const checkCache = (req, res, next) => {
  let sdkKey = req.body.sdkKey
  let { userId, ...userAttributes } = req.body.userContext
  let reqHashedUserAttributes = createHashFromObject(userAttributes);
  
  try {
    if (cache.has(sdkKey)) { //just flag eval
      const sdkInstance = cache.get(sdkKey); 
      if (sdkInstance[userId]) {
        if (reqHashedUserAttributes == sdkInstance[userId]["hashedAttribute"]) {
          // console.log('hash is equal')
          return res.status(200).send(sdkInstance[userId]["flagEval"])
        }
      } 
    }
    return next();  
  } catch (err) {
    throw new Error(err);
  }
}

const createHashFromObject = (object) => {
  const hash = createHash('sha256');
  let hashedObject = hash.update(String(object)).digest('hex');
  return hashedObject;
} 
module.exports = { populateCacheForUser, checkCache, cache }