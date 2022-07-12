const { check, oneOf } = require('express-validator');

exports.validateFlag = [
  check('key').not().isEmpty(),
  check('sdkKey').not().isEmpty()
];

exports.validateAudience = [
  // check('audience.conditions').not().isEmpty(), // required?
  check('name').not().isEmpty(),
];

exports.validateAttribute = [check('name').not().isEmpty()];
