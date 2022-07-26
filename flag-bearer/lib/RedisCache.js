const redis = require('redis');
const { getRuleset } = require('../utils/apiClient');
const eventEmitter = require('./EventEmitter');

class RedisCache {
  constructor(port, host, password) {
    this.redis = redis.createClient({
      name: 'flag-bearer-cache',
      port,
      host,
      password
    });
    this.init();
    this.sdkKeys;
    this.flags;

    this.redis.on('connect', () => console.log(`Redis cache on port ${port}`));
  }

  async init() {
    this.redis.on('error', (err) => console.error('Error: ' + err));

    try {
      await this.redis.connect();
      console.log('refreshing cache...\n');
      await this.refreshData();
      eventEmitter.emit('cache-filled');
    } catch (err) {
      console.error('Error initializing cache: ' + err);
    }
  }
  // fetch full flag ruleset from manager
  async refreshData() {
    try {
      let { sdkKeys, flags } = await getRuleset();
      // console.log('data from Manager:', flags);
      this.sdkKeys = sdkKeys;
      this.flags = flags;

    } catch (err) {
      console.error(err);
      console.error('Could not fetch data from manager...');
    }
  }
  // try reading from cache first
  async getData() {
    try {
      const response = await this.redis.get('data');

      if (response) {
        const { sdkKeys, flags } = JSON.parse(response);
        this.sdkKeys = sdkKeys;
        this.flags = flags;
        console.log('Got data from redis successfully: ', this.flags);
      } else {
        // cache is empty or network connection error
        console.log('Need to fetch from Manager');
        await this.refreshData();

      }
      // returning this for serverSDK
      return { sdkKeys: this.sdkKeys, flags: this.flags };

    } catch (err) {
      console.error(err);
      console.error('Error connecting to redis');
    }
  }

  validSdkKey(sdkKey) {
    return this.sdkKeys[sdkKey];
  }
}

module.exports = RedisCache;
