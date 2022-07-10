const express = require ('express');
const router = express.Router();
const flagsetController = require("../controllers/flagsetController");

// route to receive webhook from flag manager 
router.post('/flagset', flagsetController.createFlagset);

/*
1. FLAGs from flag manager
- create a route to receive webhooks
- POST
- for updated flags, will we receive FULL flag ruleset, or just incremental updates? what does this look like?
- update cache, or populate cache if cache is empty
*/

module.exports = router;