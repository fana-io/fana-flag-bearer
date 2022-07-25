const ClientsManager = require('./ClientsManager');
const Subscriber = require('./Subscriber');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

// client manager manages SDK SSE connections
const clientManager = new ClientsManager((SDK_KEYS = ['c3e-db3100c-8'])); // TODO: needs to be fed sdk keys from manager
// subscriber is subscribed to Redis message broker and forwards real-time messages
const subscriber = new Subscriber(REDIS_PORT, REDIS_HOST, clientManager);

module.exports = { clientManager };
