require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/api");
const { initializeClientSDK } = require("./controllers/flagsetController");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
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

3. Send SSE event to Client SDK on flag value change: rolling back
- need to know which SDK new flag values pertain to (through SDK Key)

*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});