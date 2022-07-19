const express = require('express');
const router = express.Router();
const {
  validateFlagset,
  validateClientInit,
  validateServerInit,
} = require('../validators/validators');
const { checkCache } = require('../controllers/cache');
const { createFlagset } = require('../controllers/flagsetController');
const { initializeServerSDK } = require('../controllers/serverSdkController');
const {
  initializeClientSDK,
  subscribeToUpdates,
} = require('../controllers/clientSdkController');

  
// route to receive webhook from flag manager
// also sends push event of disabled flags within createFlagset
router.post('/flagset', validateFlagset, createFlagset);

// receives client SDK initialization requests
router.post(
  `/connect/clientInit`,
  validateClientInit,
  checkCache,
  initializeClientSDK
);

// endpoint for client SDKs to establish SSE connections
router.get('/subscribe/client', subscribeToUpdates);

// receives server SDK initialization requests
router.post(`/connect/serverInit`, validateServerInit, initializeServerSDK);

module.exports = router;
