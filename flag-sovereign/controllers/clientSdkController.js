const { validationResult } = require('express-validator');
const { evaluateFlags } = require('../utils/parseFlagData');

// initializes sdk and returns evaluated flags
const initializeClientSDK = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
<<<<<<< HEAD
    const sdkKey = req.header('Authorization');
    const userContext = req.body;
    // validate sdkKey
    // if (!validSdkKey(sdkKey)) {
    //   return res.status(400).send({ error: 'Invalid SDK key.' });
    // }
    const userFlagEvals = evaluateFlags(userContext);
=======
    const allFlags = flagData.getFlagData();
    const sdkKey = req.header('Authorization');

    const sdkInstance = getSdkInstance(sdkKey, allFlags);

    if (!sdkInstance) {
      return res.status(400).send({ error: 'Invalid SDK key.' });
    }
    const userFlagEvals = evaluateFlags(sdkInstance, req.body.userContext);
    // populateCacheForUser(req.body.sdkKey, userId, userFlagEvals);
>>>>>>> 73a603c574accdb0a2ee809d3efd685e1f2fe7db
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
