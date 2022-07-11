const express = require ('express');
const router = express.Router();
const { validateFlagset } = require('../validators/validators');
const { createFlagset, initializeClientSDK } = require("../controllers/flagsetController");

// route to receive webhook from flag manager 
router.post('/flagset', validateFlagset, createFlagset);
router.post(`/connect/clientInit`, validateClientInit, initializeClientSDK)

module.exports = router;