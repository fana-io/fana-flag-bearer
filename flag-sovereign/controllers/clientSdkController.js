const { validationResult } = require('express-validator');
const { evaluateFlags } = require('../utils/parseFlagData');

// initializes sdk and returns evaluated flags
const initializeClientSDK = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const sdkKey = req.header('Authorization');
    const userContext = req.body;
    // validate sdkKey
    // if (!validSdkKey(sdkKey)) {
    //   return res.status(400).send({ error: 'Invalid SDK key.' });
    // }
    const userFlagEvals = evaluateFlags(userContext);
    return res.json(userFlagEvals);
  } else {
    return res.status(400).send({ error: 'Invalid SDK keyin header or no userId provided.' });
  }
};

module.exports = {
  initializeClientSDK
};