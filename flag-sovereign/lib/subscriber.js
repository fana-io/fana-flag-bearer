require('dotenv').config();
const redis = require('redis');
const ClientsManager = require('./clientsManager')
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

// may need to add more based on types of updates being sent
const CHANNELS = ['flag-update-channel', 'flag-toggle-channel']

class Subscriber {
  constructor(port, host, subscriptionList) {
    this.redis = redis.createClient({
      name: 'flag-bearer',
      port,
      host,
    });
    this.list = subscriptionList;
    this.init();
  }

  async init() {
    this.redis.on('connect', () => console.log('connected to redis'));
    this.redis.on('error', (err) => console.log('Error: ' + err));

    try {
      await this.redis.connect();
      await Promise.all([CHANNELS.map(c=> this.subscribeTo(c))])
      
    } catch (err) {
      console.log('Error: ' + err);
    }
  }

  async subscribeTo(channelName) {
    try {
      await this.redis.subscribe(channelName, (message, channel) => {
        console.log(`${channel}: ${message}`);
        let data = JSON.parse(message)

        this.publish(channel, data)
      
    });
    } catch (err) {
      console.error(err);
    }
  }

  publish(channel, data) {
    if (channel === 'flag-toggle-channel') {
      for (let sdkType in this.list) {
        this.list[sdkType].forEach(client => {
          client.stream.write(`event: sdkKey\n`)
          client.stream.write(`channel: ${JSON.stringify(channel)}\n`)
          client.stream.write(`data: ${JSON.stringify(data)}\n`)
          client.stream.write(`\n\n`);
        })
      }
    } else {
      this.list.servers.forEach(client => {
        client.stream.write(`event: sdkKey\n`)
        client.stream.write(`channel: ${JSON.stringify(channel)}\n`)
        client.stream.write(`data: ${JSON.stringify(data)}\n`)
        client.stream.write(`\n\n`);
      })
    }
    console.log('done publishing');
  }
}





module.exports = Subscriber;

