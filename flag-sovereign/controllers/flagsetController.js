const { validationResult } = require('express-validator');
const { flagData } = require('../utilities/flagData');
const { pushDisabledFlagsEvent } = require('./clientSdkController');
// const { findDisabledFlags } = require('../utilities/parseFlagData');
// const client = { stream: null }; // stores response object to stream SSE

const createFlagset = (req, res, next) => {
  const errors = validationResult(req);
  // checks: flatset is array, sdkkey and flags array are provided
  if (errors.isEmpty()) {
    // assuming Manager always sends full set of flags
    flagData.setFlagData(req.body);
    // pushDisabledFlagsEvent(req.body);
    res.status(201).send('201: Flagset created');
  } else {
    return res.status(404).send('Input field error.');
  }
};

// const subscribeToUpdates = (req, res) => {
//   const headers = {
//     'Content-Type': 'text/event-stream',
//     Connection: 'keep-alive',
//     'Cache-Control': 'no-cache',
//   };
//   res.writeHead(200, headers);
//   res.write(
//     `data: Success: subscribed to messages for disabled flags.`
//   );
//   res.write('\n\n');
//   client.stream = res; // store response obj to be written to later
// };

// const pushDisabledFlagsEvent = (newFlagData) => {
//   // if no open connections, move onto return
//   if (!client.stream) {
//     // next()
//     console.log('no stream')
//     return
//   }

//   // const newFlagData = req.body;
//   const flagUpdates = findDisabledFlags(newFlagData);

//   flagUpdates.forEach(sdkUpdate => {
//     client.stream.write(`data: ${JSON.stringify(sdkUpdate)}`);
//     client.stream.write('\n\n');
//   });
//   // next();
//   console.log('client stream', client)
// };

module.exports = {
  createFlagset,
  // subscribeToUpdates,
};
