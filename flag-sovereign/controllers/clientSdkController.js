const { validationResult } = require('express-validator');
const { flagData } = require('../utilities/flagData');
const { getSdkInstance, evaluateFlags, findDisabledFlags } = require('../utilities/parseFlagData');
const { populateCacheForUser } = require('./cache');

const client = { stream: null }; // stores response object to stream SSE

// TODO: refactor to handle other attributes besides userId
// TODO: move populate cache

// initializes sdk and returns evaluated flags
const initializeClientSDK = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { userId, ...remainingUserContext } = req.body.userContext;
    const allFlags = flagData.getFlagData();
    const sdkInstance = getSdkInstance(req.body.sdkKey, allFlags);
    if (!sdkInstance) {
      return res.status(400).send({ error: 'Invalid SDK key.' });
    }
    const userFlagEvals = evaluateFlags(sdkInstance, userId);
    populateCacheForUser(req.body.sdkKey, userId, userFlagEvals);
    console.log('not from cache')
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
  // todo: check if any open connections, if not, go next()

  const newFlagData = req.body;
  const flagUpdates = findDisabledFlags(newFlagData);
  /*
  FLAG UPDATES [
  { sdkKey: 'beta_sdk_0', flags: [ [Object], [Object], [Object] ] },
  { sdkKey: 'beta_sdk_1', flags: [ [Object] ] }
]
  */
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
