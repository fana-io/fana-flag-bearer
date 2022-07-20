const { validationResult } = require('express-validator');
const { getSdkInstance } = require('../utils/parseFlagData');
const { flagData } = require('../lib/flagData');

const initializeServerSDK = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const allFlags = flagData.getFlagData();
    const sdkInstance = getSdkInstance(req.body.sdkKey, allFlags);

    if (!sdkInstance) {
      return res.status(400).send({ error: 'Invalid SDK key.' });
    }

    res.json(sdkInstance);
  } else {
    res.status(401).send({ error: 'SDK key is required in Authorization header.' });
  }
}

module.exports = {
  initializeServerSDK
}