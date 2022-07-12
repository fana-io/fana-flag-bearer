const express = require('express');
const router = express.Router();
const managementController = require('../controllers/managementController');
const { getRuleset } = require('../controllers/providerController')
const {
  validateFlag,
  validateAudience,
  validateAttribute,
} = require('../validators/validators');

router.get('/ruleset', getRuleset)

router.post('/flags', validateFlag, managementController.createFlag);

router.post('/audiences', validateAudience, managementController.createAudience);

router.post('/attributes', validateAttribute, managementController.createAttribute);

module.exports = router;
