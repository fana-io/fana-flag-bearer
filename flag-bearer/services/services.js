const ClientsManager = require('../lib/ClientsManager');
const Subscriber = require('../lib/Subscriber');
const RedisCache = require('../lib/RedisCache')
const eventEmitter = require('../lib/EventEmitter')
require('dotenv').config();

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PW = process.env.REDIS_PW

// cache must populate first
const cache = new RedisCache(REDIS_PORT, REDIS_HOST, REDIS_PW); 

let clientManager = new ClientsManager();

eventEmitter.on('cache-filled', () => {
  // client manager manages SDK SSE connections
  clientManager.addKeys(cache.sdkKeys);
  // subscriber is subscribed to Redis message broker and forwards real-time messages
  const subscriber = new Subscriber(REDIS_PORT, REDIS_HOST, REDIS_PW, clientManager);
  
})

module.exports = { clientManager, cache, eventEmitter };