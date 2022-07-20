const express = require('express');
const router = express.Router();
const { validateFlagset, validateClientInit, validateServerInit } = require('../validators/validators');
const { checkCache } = require('../controllers/cache');
const { createFlagset } = require('../controllers/flagsetController');
const { initializeServerSDK } = require('../controllers/serverSdkController');
const {  initializeClientSDK, subscribeToUpdates } = require('../controllers/clientSdkController');

const ClientsManager = require('../lib/clientsManager')
const Subscriber = require('../lib/subscriber')
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

const manager = new ClientsManager()
const subscriber = new Subscriber(REDIS_PORT, REDIS_HOST, manager.subscriptions);

  
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
// router.get('/subscribe/client', subscribeToUpdates);

// proposed new route
// sdkType is either 'client' or 'server'
router.get('/stream/:sdkType', (req, res, next) => {
  manager.stream(req, res, next)
});

// receives server SDK initialization requests
router.get(`/connect/serverInit`, validateServerInit, initializeServerSDK);

module.exports = router;
