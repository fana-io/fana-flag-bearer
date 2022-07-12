const express = require ('express');
const router = express.Router();
const { validateFlagset, validateClientInit } = require('../validators/validators');
const { createFlagset, initializeClientSDK, pushFlagUpdates, subscribeToUpdates } = require("../controllers/flagsetController");
const { checkCache } = require('../controllers/cache');

// route to receive webhook from flag manager
// also sends push event of disabled flags 
router.post('/flagset', validateFlagset, pushFlagUpdates, createFlagset);

// receives client SDK initialization requests
router.post(`/connect/clientInit`, validateClientInit, checkCache, initializeClientSDK)

// endpoint for client SDKs to establish SSE connections
router.get('/subscribe/client', subscribeToUpdates)
module.exports = router;