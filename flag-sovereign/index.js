const express = require("express");
const routes = require("./routes/api");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use("/api", routes);
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
  all flag evals for userA : [
    {
      flag-name: "new-button",
      status: true, 
      value: bool, (defaults to false if flag isn't active)
    }
  ]

3. Send SSE event to Client SDK on flag value change: rolling back
- need to know which SDK new flag values pertain to (through SDK Key)

*/

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});