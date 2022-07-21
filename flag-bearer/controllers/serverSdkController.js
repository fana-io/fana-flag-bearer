const { validationResult } = require('express-validator');
const { getSdkInstance } = require('../utils/parseFlagData');
const { flagData } = require('../lib/FlagData');

const initializeServerSDK = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const allFlags = flagData.getFlagData();
    const sdkKey = req.header('Authorization');
    const sdkInstance = getSdkInstance(sdkKey, allFlags);

    if (!sdkInstance) {
      return res.status(400).send({ error: 'No data for this SDK key' });
    }

    res.json(sdkInstance);
  } else {
    res.status(401).send({ error: 'SDK key not authorized.' });
  }
}

module.exports = {
  initializeServerSDK
}