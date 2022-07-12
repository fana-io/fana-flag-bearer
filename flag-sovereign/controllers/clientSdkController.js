const { validationResult } = require('express-validator');
const { getSdkInstance, evaluateFlags, findDisabledFlags } = require('../utilities/parseFlagData');
const { populateCacheForUser } = require('./cache');

const client = { stream: null }; // stores response object to stream SSE

// initializes sdk and returns evaluated flags
const initializeClientSDK = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const userContext = req.body.userContext;

    const sdkInstance = getSdkInstance(req.body.sdkKey, allFlags);
    if (!sdkInstance) {
      return res.status(400).send({ error: 'Invalid SDK key.' });
    }
    const userFlagEvals = evaluateFlags(sdkInstance, userContext);
    populateCacheForUser(req.body.sdkKey, userContext.userId, userFlagEvals);

    res.json(userFlagEvals);
  } else {
    res.status(400).send({ error: 'SDK key and userId are required.' });
  }
};

// route to receive SSE connection requests from client SDKs
const subscribeToUpdates = (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);
  res.write(
    `data: Success: subscribed to messages for disabled flags.`
  );
  res.write('\n\n');
  client.stream = res; // store response obj to be written to later
};

const pushDisabledFlagsEvent = (req, res, next) => {
  // if no open connections, move onto next
  if (!client.stream) next();

  const flagData = req.body;
  const flagUpdates = findDisabledFlags(flagData);
  
  flagUpdates.forEach(sdkUpdate => {
    client.stream.write(`data: ${JSON.stringify(sdkUpdate)}`);
    client.stream.write('\n\n');
  });
  next();
};

module.exports = {
  initializeClientSDK,
  subscribeToUpdates,
  pushDisabledFlagsEvent,
};