require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: cache rules
  // populated on initial SDK request for a given user context
  // when Manager sends new data, is the cache emptied out completely? 
const cache = {}; 

/*
1. FLAGs from flag manager
- create a route to receive webhooks
- POST
- for updated flags, will we receive FULL flag ruleset, or just incremental updates? what does this look like?
- update cache, or populate cache if cache is empty
- TODO: forward updated flag rules to server-side SDK

2. Receive Client SDK initialization request
- POST
  - user context obj, SDK key, flag id --> or will we only be getting flag name as unique identifier? 
  - evaluate flag value 
  - respond with flag value
  - what does response object look like?

3. Send SSE event to Client SDK on flag value change: rolling back
- need to know which SDK new flag values pertain to (through SDK Key)

*/

// axios.post(`${this.config.sovAddress}/clientInit/${this.config.sdkKey}`, this.config.userContext);
// assuming we need to send back all rules for this userId 
app.post(`/connect/clientInit/:sdkKey`, (req, res, next) => {
  const sdkKey = req.sdkKey
  const userContext = req.body.userContext

  // given a userContext.userId, find all flags 

})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});