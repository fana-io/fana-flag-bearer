const express = require('express');
const router = express.Router();
const managementController = require('../controllers/managementController');
const {
  validateFlag,
  validateAudience,
  validateAttribute,
} = require('../validators/validators');

router.post('/flags', validateFlag, managementController.createFlag);

router.post('/audiences', validateAudience, managementController.createAudience);

router.post('/attributes', validateAttribute, managementController.createAttribute);

module.exports = router;
