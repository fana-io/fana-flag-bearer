const { validationResult } = require("express-validator");
const { getSdkInstance, evaluateFlags } = require('./parseFlagData');
const { populateCacheForUser } = require('./cache');

// Saving flagset as local array for now;
const allFlags = [
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
];
// queryCache is used to return value to SDK
let queryCache = {};

const createFlagset = (req, res) => {
  const errors = validationResult(req);
  // checks: flatset is array, sdkkey and flags array are provided
  if (errors.isEmpty()) {
    // assuming Manager always sends full set of flags
    allFlags = req.body;
    return res.status(201).send('201: Flagset created');
  } else {
    return res.status(404).send("Input field error.");
  }
}

const initializeClientSDK = (req, res) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    const { userId, ...remainingUserContext } = req.body.userContext
    
    const sdkInstance = getSdkInstance(req.body.sdkKey, allFlags);
    if (!sdkInstance) {
      return res.status(400).send({ error: "Invalid SDK key."})
    }
    const userFlagEvals = evaluateFlags(sdkInstance, userId);
    populateCacheForUser(req.body.sdkKey, userId, userFlagEvals);  
    
    res.json(userFlagEvals)
  } else {
    res.status(400).send({ error: "SDK key and userId are required."})
  }
}

module.exports = { createFlagset, initializeClientSDK }