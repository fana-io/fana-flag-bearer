const { body, header } = require('express-validator');
const SDK_KEYS = ['test','beta_sdk_0'] // TODO: should be fetched from cache

// validate POST body contains sdkkey and flags array
exports.validateFlagset = [
  body().isArray(),
  body('*.sdkKey').notEmpty(),
  body('*.flags').isArray(),

];

exports.validateClientInit = [
  body('userContext.userId').notEmpty(),
  header('Authorization').custom((value) => SDK_KEYS.includes(value)) // check if valid sdk key is provided in authorization header
];
exports.validateServerInit = [
  header('Authorization').custom((value) => SDK_KEYS.includes(value))
];