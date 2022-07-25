const { validationResult } = require('express-validator');
const { evaluateFlags, validSdkKey, getData } = require('../utils/parseFlagData');

// initializes sdk and returns evaluated flags
const initializeClientSDK = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const sdkKey = req.header('Authorization');
    const userContext = req.body;
    // get data from redis or from manager
    await getData();

    if (!validSdkKey(sdkKey)) {
      console.log('failing validSdkKey')
      return res.status(400).send({ error: 'Invalid SDK key.' });
    }
    
    const userFlagEvals = evaluateFlags(userContext);
    // populateCacheForUser(req.body.sdkKey, userId, userFlagEvals);
    return res.json(userFlagEvals);
  } else {
    return res
      .status(400)
      .send({ error: 'Invalid SDK key in header or no userId provided.' });
  }
};

module.exports = {
  initializeClientSDK,
};