const { validationResult } = require('express-validator');
const { evaluateFlags, validSdkKey } = require('../utils/parseFlagData');

// initializes sdk and returns evaluated flags
const initializeClientSDK = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const sdkKey = req.header('Authorization');
    const userContext = req.body;
    // validate sdkKey; validateSdk not written yet
    if (!validSdkKey(sdkKey)) {
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