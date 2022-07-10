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
// user has attribute "attribute"
// evaluate value for flag "flagName";

// cache object would look something like this?
  // queryCache[] = {
  //   sdkKey1: {
  //       flageName1: {
  //          attribute1: (bool),
  //          attribute2: (bool),
  //        },
  //       flageName2: {
  //          attribute1: (bool),
  //          attribute2: (bool),
  //        },
  //    }

// const storeFlagset = (flagsetFromManager) => {
//   flagsetFromManager.forEach(set => {
//     let sdkKeyObj = {};    
//     set.flags.forEach(flag => {
//       let flagObject = {};
//       set.flags.audiences.forEach(audience => {
//        // if combination.toLowerCase() === "any"
//           // for each audience, add a field for attribute
//       // if combination.toLowerCase() === "all"
//           // need to check all attribute exist
//       })

//     })  
//     queryCache[set.sdkKey] = sdkKeyObj;
//   })
// }

module.exports = { createFlagset }