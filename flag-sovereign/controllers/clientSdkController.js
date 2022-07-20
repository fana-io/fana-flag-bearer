const { validationResult } = require('express-validator');
const { flagData } = require('../lib/flagData');
const { getSdkInstance, evaluateFlags, findDisabledFlags } = require('../utilities/parseFlagData');
const { populateCacheForUser } = require('./cache');



const client = { stream: null }; // stores response object to stream SSE

// initializes sdk and returns evaluated flags
const initializeClientSDK = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { userId } = req.body.userContext;
    const allFlags = flagData.getFlagData();
    // rename sdkInstance
    const sdkInstance = getSdkInstance(req.body.sdkKey, allFlags);

    if (!sdkInstance) {
      return res.status(400).send({ error: 'Invalid SDK key.' });
    }
    const userFlagEvals = evaluateFlags(sdkInstance, req.body.userContext);
    // populateCacheForUser(req.body.sdkKey, userId, userFlagEvals);
    return res.json(userFlagEvals);
  } else {
    return res.status(400).send({ error: 'Invalid SDK keyin header or no userId provided.' });
  }
};

// route to receive SSE connection requests from client SDKs
const subscribeToUpdates = (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  console.log('subscriber hit me');
  res.writeHead(200, headers);
  res.write(
    `data: Success: subscribed to messages for disabled flags.`
  );
  res.write('\n\n');
  client.stream = res; // store response obj to be written to later
};

const pushDisabledFlagsEvent = (newFlagData) => {
  // if no open connections, move onto return
  if (!client.stream) {
    return
  }
  
  const flagUpdates = findDisabledFlags(newFlagData);
  
  flagUpdates.forEach(sdkUpdate => {
    // custom event type -- client SDKs must listen for custom event
    client.stream.write(`event: ${sdkUpdate.sdk}\n`);
    client.stream.write(`data: ${JSON.stringify(sdkUpdate)}\n`);
    client.stream.write('\n\n');
  });
};

module.exports = {
  initializeClientSDK,
  subscribeToUpdates,
  pushDisabledFlagsEvent,
};