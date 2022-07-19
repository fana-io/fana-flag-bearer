const express = require('express');
const router = express.Router();
const managementController = require('../controllers/managementController');
const {
  getRuleset,
  pushUpdatesWH,
} = require('../controllers/providerController');
const {
  validateFlag,
  validateAudience,
  validateAttribute,
} = require('../validators/validators');


// const publisher = require('../lib/publisher');
// const pushMessage = async (req, res, next) => {
//   publisher.publishFlagToggle('a flag was disabled');

//   res.send('finished publishing message');
// };
// testing pubsub route
// router.get('/publish', pushMessage);

router.get('/ruleset', getRuleset);

router.get('/flags', managementController.getFlags);

router.get('/audiences', managementController.getAudiences);

router.get('/attributes', managementController.getAttributes);

router.post('/flags', validateFlag, managementController.createFlag);

router.patch('/flags/:key/toggle', managementController.toggleFlag);

router.patch('/flags/:key', managementController.updateFlag);

router.post(
  '/audiences',
  validateAudience,
  managementController.createAudience,
  pushUpdatesWH
);

router.patch(
  '/audiences/:key',
  managementController.updateAudience,
  pushUpdatesWH
);

router.post(
  '/attributes',
  validateAttribute,
  managementController.createAttribute,
  pushUpdatesWH
);

router.patch(
  '/attributes/:key',
  managementController.updateAttribute,
  pushUpdatesWH
);

module.exports = router;
