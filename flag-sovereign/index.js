require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: cache rules
  // populated on initial SDK request for a given user context
  // when Manager sends new data, is the cache emptied out completely? 
const cache = {}; 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use("/", routes);
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
app.post(`/connect/clientInit/`, (req, res, next) => {
  const sdkKey = req.body.sdkKey
  const userContext = req.body.userContext

  // TODO: replace hard coded response object with dynamic
  res.json({
    'new-button': true,
    'new-nav-bar': false,
    'flag-without-audience': false
  })

})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});