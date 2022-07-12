const express = require ('express');
const router = express.Router();
const { validateFlagset, validateClientInit } = require('../validators/validators');
const { checkCache } = require('../controllers/cache');
const { createFlagset, initializeClientSDK, pushDisabledFlagsEvent, subscribeToUpdates } = require("../controllers/flagsetController");
const { initializeServerSDK } = require("../controllers/serverSdkController")

// route to receive webhook from flag manager
// also sends push event of disabled flags 
router.post('/flagset', validateFlagset, pushDisabledFlagsEvent, createFlagset);

// receives client SDK initialization requests
router.post(`/connect/clientInit`, validateClientInit, checkCache, initializeClientSDK)

// endpoint for client SDKs to establish SSE connections
router.get('/subscribe/client', subscribeToUpdates)

// receives client SDK initialization requests
router.post(`/connect/serverInit`, validateServerInit, initializeServerSDK)

module.exports = router;