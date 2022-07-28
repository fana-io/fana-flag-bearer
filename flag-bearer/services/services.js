const ClientsManager = require('../lib/ClientsManager');
const Subscriber = require('../lib/Subscriber');
const RedisCache = require('../lib/RedisCache')
const eventEmitter = require('../lib/EventEmitter')
require('dotenv').config();

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

// cache must populate first
const cache = new RedisCache(REDIS_PORT, REDIS_HOST); 

let clientManager = new ClientsManager();

eventEmitter.on('cache-filled', () => {
  // client manager manages SDK SSE connections
  clientManager.addKeys(cache.sdkKeys);
  // subscriber is subscribed to Redis message broker and forwards real-time messages
  const subscriber = new Subscriber(REDIS_PORT, REDIS_HOST, clientManager);
  
})

module.exports = { clientManager, cache, eventEmitter };