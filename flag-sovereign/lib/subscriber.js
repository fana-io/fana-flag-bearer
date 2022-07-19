const redis = require('redis');
require('dotenv').config();
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

class Subscriber {
  constructor(port, host) {
    this.redis = redis.createClient({
      name: 'flag-bearer',
      port,
      host,
    });

    this.init();
  }
  async init() {
    this.redis.on('connect', () => console.log('connected to redis'));
    this.redis.on('error', (err) => console.log('Error: ' + err));

    try {
      await this.redis.connect();

      await this.subscribeTo('flag-toggle-channel')
      await this.subscribeTo('flag-update-channel')

    } catch (err) {
      console.log('Error: ' + err);
    }
  }

  async subscribeTo(channelName) {
    try {
      await this.redis.subscribe(channelName, (message, channel) => {
        console.log(`${channel}: ${message}`);
        // TODO: do something with data, e.g. update cache
        let data = JSON.parse(message)
    });
    } catch (err) {
      console.error(err);
    }
  }
}

const subscriber = new Subscriber(REDIS_PORT, REDIS_HOST);
module.exports = subscriber;
