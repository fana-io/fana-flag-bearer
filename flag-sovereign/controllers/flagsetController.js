const { validationResult } = require('express-validator');
const { flagData } = require('../lib/flagData');
const { getRuleset } = require('../utils/apiClient')

const getFlagset = async () => {
  let updatedFlagData = await getRuleset();
  // to do: get flag data from redis
  flagData.setFlagData(updatedFlagData);
  return
};

const createFlagset = (req, res, next) => {
  const errors = validationResult(req);
  // checks: flatset is array, sdkkey and flags array are provided
  if (errors.isEmpty()) {
    // redis will be written by manager
    // flagData.setFlagData(req.body);
    res.status(201).send('201: Flagset created');
  } else {
    return res.status(404).send('Input field error.');
  }
};

module.exports = {
  createFlagset,
  getFlagset,
};