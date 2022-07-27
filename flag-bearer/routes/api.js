const express = require('express');
const router = express.Router();
const { validateFlagset, validateClientInit, validateServerInit } = require('../validators/validators');
const { createFlagset } = require('../controllers/flagsetController');
const { initializeServerSDK } = require('../controllers/serverSdkController');
const { initializeClientSDK } = require('../controllers/clientSdkController');
const {clientManager} = require('../services/services')
// route to receive webhook from flag manager
// also sends push event of disabled flags within createFlagset
router.post('/flagset', validateFlagset, createFlagset);

// receives client SDK initialization requests
router.post(
  `/connect/clientInit`,
  validateClientInit,
  initializeClientSDK
);

// SSE connection endpoint
// sdkType is either 'client' or 'server'
router.get('/stream/:sdkType', (req, res, next) => {
  clientManager.stream(req, res, next)
});

// receives server SDK initialization requests
router.get(`/connect/serverInit`, validateServerInit, initializeServerSDK);
module.exports = router;
