/*
1. FLAGs from flag manager
- create a route to receive webhooks
- POST
- for updated flags, will we receive FULL flag ruleset, or just incremental updates? what does this look like?
- update cache, or populate cache if cache is empty
*/

// Saving flagset as local array for now;
let flagset;

const createFlagset = (req, res) => {
  // assuming Manager always sends full set of flags
  flagset = req.body;
  res.status(201).send('Flagset received');
}

module.exports = { createFlagset }