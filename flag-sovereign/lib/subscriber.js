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
  }

  async init() {
    this.redis.on('connect', () => console.log('connected to redis'));
    this.redis.on('error', (err) => console.log('Error: ' + err));

    try {
      await this.redis.connect();
      await Promise.all([CHANNELS.map(c=> this.subscribeTo(c))]) // subscribe to available publisher channels

    } catch (err) {
      console.log('Error: ' + err);
    }
  }

  async subscribeTo(channelName) {
    // forwards published messages to SSE connections in subscriptions list
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
      // all sdk streams get updated when a flag is toggle on or off
      // TODO: client only needs to { flagkey: bool }
      
      
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

