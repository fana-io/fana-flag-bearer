const { validationResult } = require('express-validator');
const { validSdkKey, getData } = require('../utils/parseFlagData');
const { flagData } = require('../lib/FlagData');

const initializeServerSDK = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    // const allFlags = flagData.getFlagData();
    const sdkKey = req.header('Authorization');
    // returns { sdkKeys, flags }
    const { flags } = getData();

    if (!validSdkKey(sdkKey)) {
      return res.status(400).send({ error: 'Invalid SDK key.' });
    }

    res.json(flags);
  } else {
    res.status(401).send({ error: 'SDK key not authorized.' });
  }
}

module.exports = {
  initializeServerSDK
}