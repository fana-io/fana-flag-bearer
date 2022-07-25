const redis = require('redis');
require('dotenv').config();
const { getRuleset } = require('../utils/apiClient');
const eventEmitter = require('./EventEmitter')

class RedisCache {
  constructor(port, host) {
    this.redis = redis.createClient({
      name: 'flag-bearer-cache',
      port,
      host,
    });
    this.redis.on('connect', () => console.log(`Redis cache on port ${port}`));
    this.init();
  }

  async init() {
    this.redis.on('error', (err) => console.error('Error: ' + err));
    
    try {
      await this.redis.connect();
      await this.refreshData()
      eventEmitter.emit('cache-filled');
    } catch (err) {
      console.error('Error initializing cache: ' + err);
    }
  }
  async refreshData() {
    try {
      const data = await getRuleset();
      console.log('data from Manager:', data);
      this.sdkKeys = data.sdkKeys;
      this.flags = data.flags;

    } catch (err) {
      console.error(err);
      console.error('Could not fetch data from manager...');
    }
  }

  async getData() {
    this.sdkKeys = await redis.get('sdkKeys');
    if (this.sdkKeys) {
      this.flags = await redis.get('flags');
      console.log('Data set from redis');
    } else {
      console.log('Need to fetch from Manager');
      this.refreshData()
    }
    // returning this for serverSDK
    console.log('sdkKeys from getData', sdkKeys);
    return { sdkKeys, flags };
  }

  validSdkKey(sdkKey) {
    // return sdkKeys[sdkKey];
    // TODO: this is a temporary fix until the object returned by manager is a hashmap instead of array of sdk keys. Or is it supposed to be an array?
    return this.sdkKeys.includes(sdkKey);
  }
}

module.exports = RedisCache
