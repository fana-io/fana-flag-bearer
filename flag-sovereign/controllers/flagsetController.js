const { validationResult } = require("express-validator");
/*
1. FLAGs from flag manager
- create a route to receive webhooks
  - POST   
  - Store full flag set from Manager
  - Transform full flag set in a way that is easily searchable for when client sdks make requests
  - store transformed flag evals in cache object
*/

// Saving flagset as local array for now;
let flagset;
// queryCache is used to return value to SDK
let queryCache = {};

const createFlagset = (req, res) => {
  const errors = validationResult(req);
  // checks: flatset is array, sdkkey and flags array are provided
  if (errors.isEmpty()) {
    // assuming Manager always sends full set of flags
    flagset = req.body;
    return res.status(201).send('201: Flagset created');
  } else {
    return res.status(404).send("Input field error.");
  }
}

module.exports = { createFlagset }