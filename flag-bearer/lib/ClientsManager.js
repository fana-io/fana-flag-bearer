const MINIMUM_ID_LENGTH = 30;
// recommended ms to wait in-between failed SSE connection attempts
const SEC_TO_RETRY = 7000;
const SUBSCRIPTION_TYPES = ['server', 'client'];

class ClientsManager {
  constructor() {
    this.subscriptions = { servers: [], clients: [] }; // tracks open SSE connections & their response objects
    this.responseHeaders = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    this.sdkKeys;
    this.subscriptionTypes = SUBSCRIPTION_TYPES;
    this.retryTimeout = SEC_TO_RETRY;
  }

  addKeys(keys) {
    this.sdkKeys = keys;
  }

  stream(req, res) {
    const { sdkType, id } = req.params;
    const sdkKey = req.query.sdkKey;
    const result = this.validateParams(sdkType, sdkKey);

    if (!result.valid) {
      console.log('error valiating sdkkey');
      return res.status(result.code).send(result.error);
    }

    const client = this.addClient(sdkType, id, sdkKey);
    this.connectClient(client, req, res);
    this.reportOnAllConnections();
  }

  validateParams(sdkType, sdkKey) {
    const validType = this.subscriptionTypes.includes(sdkType);
    const validKey = this.sdkKeys[sdkKey];

    if (validType && validKey) return { valid: true };

    let errorMessage = validKey
      ? 'Invalid subscription topic.'
      : 'Invalid sdk key provided.';

    return { valid: false, code: 400, error: errorMessage };
  }

  // SSE connections are organized by sdk type
  addClient(sdkType, id, sdkKey) {
    if (!id || typeof id !== 'string')
      id = this.generateRandomId(MINIMUM_ID_LENGTH);

    const newClient = { id, sdkKey };

    if (sdkType === 'client') {
      this.subscriptions.clients.push(newClient);
    } else {
      this.subscriptions.servers.push(newClient);
    }
    return newClient;
  }

  // create initial SSE streaming connection
  connectClient(client, req, res) {
    res.writeHead(200, this.responseHeaders);
    res.write(`retry: ${this.retryTimeout}.\n`);
    res.write(`data: Success: subscribed to messages.`);
    res.write('\n\n');
    console.log(`--- client ${client.id} connected successfully. ---`);

    // store response obj to be written to later
    client.stream = res;

    // remove SSE client from appropriate subscriptions list when conn is closed
    req.on('close', () => {
      this.subscriptions.clients = this.subscriptions.clients.filter(
        (c) => c.id !== client.id
      );
      console.log(`client ${client.id} disconnected`);
      this.reportOnAllConnections();
    });
  }

  reportOnAllConnections() {
    let totalConns = 0;
    for (let sdkType in this.subscriptions) {
      totalConns += this.subscriptions[sdkType].length;
    }
    console.log(`--- ${totalConns} total connections ---`);
  }

  generateRandomId(size) {
    return [...Array(size)]
      .map(() => {
        return Math.floor(Math.random() * 36).toString(36);
      })
      .join('');
  }
}

module.exports = ClientsManager;
