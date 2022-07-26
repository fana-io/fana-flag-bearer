const redis = require('redis');
require('dotenv').config();
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

class Publisher {
  constructor(port, host) {
    this.redis = redis.createClient({
      name: 'flag-bearer',
      socket: {
        host,
        port
      },
      password: process.env.REDIS_PW
    });
    this.redis.connect();
  }

  publishUpdate(message) {
    this.redis.publish('flag-update-channel', message, this.logReply);
  }

  publishFlagToggle(message) {
    this.redis.publish('flag-toggle-channel', message, this.logReply);
  }

  logReply(err, reply) {
    console.log('redis reply:', reply);
  }
}

module.exports = new Publisher(REDIS_PORT, REDIS_HOST);
