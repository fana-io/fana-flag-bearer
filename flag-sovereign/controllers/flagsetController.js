const { validationResult } = require('express-validator');
const { flagData } = require('../utilities/flagData');
const { pushDisabledFlagsEvent } = require('./clientSdkController');
const { getRuleset } = require('../utilities/apiClient')

const getFlagset = async () => {
  let updatedFlagData = await getRuleset();
  flagData.setFlagData(updatedFlagData);
  return
};

const createFlagset = (req, res, next) => {
  const errors = validationResult(req);
  // checks: flatset is array, sdkkey and flags array are provided
  if (errors.isEmpty()) {
    // assuming Manager always sends full set of flags
    flagData.setFlagData(req.body);
    // sends push event of disabled flags to clientSDK
    pushDisabledFlagsEvent(req.body);
    res.status(201).send('201: Flagset created');
  } else {
    return res.status(404).send('Input field error.');
  }
};

module.exports = {
  createFlagset,
  getFlagset,
};