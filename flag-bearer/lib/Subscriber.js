require('dotenv').config();
const redis = require('redis');

// may need to add more based on types of updates being sent
const CHANNELS = process.env.CHANNELS || ['flag-update-channel', 'flag-toggle-channel']

class Subscriber {
  constructor(port, host, manager) {
    this.redis = redis.createClient({
      name: 'flag-bearer',
      port,
      host,
    });
    this.init();
    this.manager = manager

    this.redis.on('connect', () => console.log(`Redis subscriber on port ${port}`));
  }

  async init() {
    this.redis.on('error', (err) => console.error('Error: ' + err));

    try {
      await this.redis.connect();
      await Promise.all([CHANNELS.map(channel => this.subscribeTo(channel ))])

    } catch (err) {
      console.error('Error: ' + err);
    }
  }

  async subscribeTo(channelName) {
    try {
      await this.redis.subscribe(channelName, (message, channel) => {
        console.log(`${channel}: ${message}\n`);

        this.publish(channel, JSON.parse(message))
    });
    } catch (err) {
      console.error(err);
    }
  }

  publish(channel, data) {
    if (channel === 'flag-toggle-channel' && data.status) {
      this.manager.subscriptions.servers.forEach(client => {
        client.stream.write(`event: ${client.sdkKey}\n`)
        client.stream.write(`channel: ${channel}\n`)
        client.stream.write(`data: ${JSON.stringify(data)}\n`)
        client.stream.write(`\n\n`);
      })
    } else if (channel === 'flag-toggle-channel' && !data.status) {
      // all sdk streams get updated when a flag is toggle off
      for (let sdkType in this.manager.subscriptions) {
        this.manager.subscriptions[sdkType].forEach(client => {
          client.stream.write(`event: ${client.sdkKey}\n`)
          client.stream.write(`channel: ${channel}\n`)
          client.stream.write(`data: ${JSON.stringify(data)}\n`)
          client.stream.write(`\n\n`);
        })
      }
    } else {
      // only server streams get updates to individual flags
      this.manager.subscriptions.servers.forEach(client => {
        client.stream.write(`event: ${client.sdkKey}\n`)
        client.stream.write(`channel: ${channel}\n`)
        client.stream.write(`data: ${JSON.stringify(data)}\n`)
        client.stream.write(`\n\n`);
      })
    }
  }
}

module.exports = Subscriber;