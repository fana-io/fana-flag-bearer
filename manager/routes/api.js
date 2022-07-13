const express = require('express');
const router = express.Router();
const managementController = require('../controllers/managementController');
const { getRuleset, pushUpdatesWH } = require('../controllers/providerController')
const {
  validateFlag,
  validateAudience,
  validateAttribute,
} = require('../validators/validators');

router.get('/ruleset', getRuleset)

router.post('/flags', validateFlag, managementController.createFlag, pushUpdatesWH);

router.patch('/flags/:key/toggle', managementController.toggleFlag, pushUpdatesWH);

router.post('/audiences', validateAudience, managementController.createAudience, pushUpdatesWH);

router.post('/attributes', validateAttribute, managementController.createAttribute, pushUpdatesWH);

module.exports = router;
