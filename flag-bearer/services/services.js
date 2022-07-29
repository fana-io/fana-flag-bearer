const ClientsManager = require('../lib/ClientsManager');
const Subscriber = require('../lib/Subscriber');
const RedisCache = require('../lib/RedisCache')
require('dotenv').config();

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

// cache must populate first
const cache = new RedisCache(REDIS_PORT, REDIS_HOST); 

let clientManager = new ClientsManager();
const subscriber = new Subscriber(REDIS_PORT, REDIS_HOST, clientManager);

module.exports = { clientManager, cache };