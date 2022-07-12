const { validationResult } = require('express-validator');
const { getSdkInstance, evaluateFlags } = require('./parseFlagData');
const { populateCacheForUser } = require('./cache');

// Saving flagset as local array for now;
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
// queryCache is used to return value to SDK
let queryCache = {};
const client = { stream: null }; // stores response object to stream SSE

const createFlagset = (req, res, next) => {
  const errors = validationResult(req);
  // checks: flatset is array, sdkkey and flags array are provided
  if (errors.isEmpty()) {
    // assuming Manager always sends full set of flags
    allFlags = req.body;
    res.status(201).send('201: Flagset created');
  } else {
    return res.status(404).send('Input field error.');
  }
};

// TODO: refactor to handle other attributes besides userId
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
// should this part of client initialization route, after successful sdk auth?
const subscribeToUpdates = (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);
  res.write(
    `data: you are now subscribed receive messages containing disabled flags.`
  );
  res.write('\n\n');
  client.stream = res; // store response obj to be written to later
};

const pushFlagUpdates = (req, res, next) => {
  // check if any open connections, if not, go next()

  // return an array of update objects for each SDK instance
  function findDisabledFlags(flagData) {
    const flagUpdates = flagData.map((sdkInstance) => {
      let flagUpdate = {};
      flagUpdate['type'] = sdkInstance.sdkKey;

      const disabledFlags = sdkInstance.flags.reduce((accum, flag) => {
        let { status, flagKey } = flag;
        if (!status) {
          accum.push({
            flagKey,
            status,
            value: false,
          });
        }
        return accum;
      }, []);

      flagUpdate['message'] = disabledFlags;
      return flagUpdate;
    });
    return flagUpdates;
  }

  const flagData = req.body;

  const flagUpdates = findDisabledFlags(flagData);
  console.log('FLAG UPDATES', flagUpdates);
  /*
  FLAG UPDATES [
  { type: 'beta_sdk_0', message: [ [Object], [Object], [Object] ] },
  { type: 'beta_sdk_1', message: [ [Object] ] }
]
  */
  flagUpdates.forEach((sdkUpdate) => {
    client.stream.write(`data: ${JSON.stringify(sdkUpdate)}`); // Note: string must start with "data: "
    client.stream.write('\n\n'); // Note: this must be a separate write from data (above)
  });
  next();
};

module.exports = {
  createFlagset,
  initializeClientSDK,
  subscribeToUpdates,
  pushFlagUpdates,
};
