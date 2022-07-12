const { validationResult } = require('express-validator');
const { getSdkInstance, evaluateFlags, findDisabledFlags } = require('../utilities/parseFlagData');
const { populateCacheForUser } = require('./cache');

let allFlags = [
  {
    sdkKey: 'beta_sdk_0',
    flags: [
      {
        flagKey: 'flag-evals-true',
        status: true,
        audiences: ['beta-testers', 'california_students'],
      },
      {
        flagKey: 'flag-evals-false',
        status: true,
        audiences: ['california_students'],
      },
      {
        flagKey: 'no-audiences-flag',
        status: true,
        audiences: [],
      },
      {
        flagKey: 'toggled-off-flag',
        status: false,
        audiences: ['beta-testers'],
      },
    ],
    audiences: [
      {
        audienceKey: 'beta-testers',
        combination: 'ANY',
        conditions: [
          {
            attribute: 'userId',
            type: 'STR',
            operator: 'EQ',
            value: 'jjuy',
          },
          {
            attribute: 'beta',
            type: 'BOOL',
            operator: 'EQ',
            value: true,
          },
        ],
      },
      {
        audienceKey: 'california_students',
        combination: 'ALL',
        conditions: [
          {
            attribute: 'state',
            type: 'STR',
            operator: 'EQ',
            value: 'california',
          },
          {
            attribute: 'userId',
            type: 'STR',
            operator: 'EQ',
            value: 'jjuy',
          },
        ],
      },
    ],
  },
  {
    sdkKey: 'beta_sdk_1',
    flags: [
      {
        flagKey: 'flag-evals-true',
        status: true,
        audiences: ['beta-testers', 'california_students'],
      },
      {
        flagKey: 'flag-evals-false',
        status: true,
        audiences: ['california_students'],
      },
      {
        flagKey: 'no-audiences-flag',
        status: true,
        audiences: [],
      },
      {
        flagKey: 'toggled-off-flag',
        status: false,
        audiences: ['beta-testers'],
      },
    ],
    audiences: [
      {
        audienceKey: 'beta-testers',
        combination: 'ANY',
        conditions: [
          {
            attribute: 'userId',
            type: 'STR',
            operator: 'EQ',
            value: 'jjuy',
          },
          {
            attribute: 'beta',
            type: 'BOOL',
            operator: 'EQ',
            value: true,
          },
        ],
      },
      {
        audienceKey: 'california_students',
        combination: 'ALL',
        conditions: [
          {
            attribute: 'state',
            type: 'STR',
            operator: 'EQ',
            value: 'california',
          },
          {
            attribute: 'userId',
            type: 'STR',
            operator: 'EQ',
            value: 'jjuy',
          },
        ],
      },
    ],
  },
];

const client = { stream: null }; // stores response object to stream SSE

// TODO: refactor to handle other attributes besides userId
// TODO: move populate cache

// initializes sdk and returns evaluated flags
const initializeClientSDK = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { userId, ...remainingUserContext } = req.body.userContext;

    const sdkInstance = getSdkInstance(req.body.sdkKey, allFlags);
    if (!sdkInstance) {
      return res.status(400).send({ error: 'Invalid SDK key.' });
    }
    const userFlagEvals = evaluateFlags(sdkInstance, userId);
    populateCacheForUser(req.body.sdkKey, userId, userFlagEvals);

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

  const flagData = req.body;
  const flagUpdates = findDisabledFlags(flagData);
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
