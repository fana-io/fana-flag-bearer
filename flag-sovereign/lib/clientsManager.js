const MINIMUM_ID_LENGTH = 30;

class ClientsManager {
  constructor() {
    this.subscriptions = {servers: [], clients: []}
    this.responseHeaders = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    this.validParams = ['server', 'client'] // as of now, we only have two different subscription lists
  }

  stream(req, res, next) {
    const { sdkType, id} = req.params;
    const result = this.validateParam(sdkType)

    if (!result.valid) {
      return res.status(result.code).send(result.error)
    }

    const client = this.addClient(sdkType, id)
    this.connectClient(client, req, res)
    this.reportOnAllConnections()
  }

  validateParam(sdkType) {
    return this.validParams.includes(sdkType) ? {valid:true} : { valid: false, code: 400, error: "Invalid subscription topic." } 
  }

  addClient(sdkType, id) {
    if (!id || typeof id !== 'string') id = this.generateRandomId(MINIMUM_ID_LENGTH)
    const newClient = { id }

    if (sdkType === 'client') {
      this.subscriptions.clients.push(newClient)
    } else {
      this.subscriptions.servers.push(newClient)
    }
    return newClient
  }

  connectClient(client, req, res) {
    res.writeHead(200, this.responseHeaders);
    res.write(
    `data: Success: subscribed to messages.`
    );
    res.write('\n\n');
    console.log(`client ${client.id} connected successfully.`);
    
    req.on('close', () => {
      this.subscriptions.clients = this.subscriptions.clients.filter(c => c.id !== client.id)
      console.log(`client ${client.id} disconnected`);
      this.reportOnAllConnections()
    })
    client.stream = res; // store response obj to be written to later
  }

  reportOnAllConnections() {
    let totalConns = 0;
    for (let sdkType in this.subscriptions) {
      totalConns += this.subscriptions[sdkType].length;
    }
    console.log(`--- ${totalConns} total connections ---`);
  }

  generateRandomId(size) {
    return [...Array(size)].map(() => {
      return (Math.floor(Math.random() * 36)).toString(36)
    }
  ).join('')

  }
}


module.exports = ClientsManager