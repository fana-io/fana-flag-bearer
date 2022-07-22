require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/api");
const ClientsManager = require('../lib/clientsManager')
const Subscriber = require('../lib/subscriber')

const PORT = process.env.PORT || 3001;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

// client manager manages SDK SSE connections 
const manager = new ClientsManager(SDK_KEYS=['beta_sdk_0']) // TODO: needs to be fed sdk keys from manager
// subscriber is subscribed to Redis message broker and forwards real-time messages
const subscriber = new Subscriber(REDIS_PORT, REDIS_HOST, manager);

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ error: err.message || 'An unknown error occured' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});