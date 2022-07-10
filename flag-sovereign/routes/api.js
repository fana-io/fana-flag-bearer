const express = require ('express');
const router = express.Router();
const { createFlagset } = require("../controllers/flagsetController");

// route to receive webhook from flag manager 
router.post('/flagset', createFlagset);

module.exports = router;