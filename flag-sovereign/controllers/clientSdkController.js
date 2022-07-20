const { validationResult } = require('express-validator');
const { flagData } = require('../lib/flagData');
const { getSdkInstance, evaluateFlags } = require('../utilities/parseFlagData');

// initializes sdk and returns evaluated flags
const initializeClientSDK = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const allFlags = flagData.getFlagData();
    
    const sdkInstance = getSdkInstance(req.body.sdkKey, allFlags);

    if (!sdkInstance) {
      return res.status(400).send({ error: 'Invalid SDK key.' });
    }
    const userFlagEvals = evaluateFlags(sdkInstance, req.body.userContext);
    // populateCacheForUser(req.body.sdkKey, userId, userFlagEvals);
    return res.json(userFlagEvals);
  } else {
    return res.status(400).send({ error: 'Invalid SDK keyin header or no userId provided.' });
  }
};

module.exports = {
  initializeClientSDK
};