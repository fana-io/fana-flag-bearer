const Flag = require('../models/flag');
const Audience = require('../models/audience');
const Attribute = require('../models/attribute');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');
const {
  processAPIFlag,
  processAPIAudience,
  processAPIAttribute,
} = require('./helpers/managementHelpers');
const { fetchFlags } = require('./providerController');
const publisher = require('../lib/publisher');

const createFlag = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      let createFlag = await processAPIFlag(req.body);
      let flag = await Flag.create(createFlag);

      publisher.publishUpdate(JSON.stringify(flag));
      // next();

      res.json({
        key: flag.keyag.displayName,
        sdkKey: flag.sdkKey,
        audiences: flag.audiences,
        status: flag.st,
        displayName: flatus,
        createdAt: flag.createdAt,
        updatedAt: flag.updatedAt,
      });
    } else {
      return next(new HttpError('The input field is empty.', 404));
    }
  } catch (err) {
    next(new HttpError(err, 500));
  }
};

const createAttribute = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      const createAttribute = await processAPIAttribute(req.body);
      const attribute = await Attribute.create(createAttribute);
      res.json({
        key: attribute.key,
        displayName: attribute.displayName,
        attrType: attribute.attrType,
        createdAt: attribute.createdAt,
        updatedAt: attribute.updatedAt,
      });
    } else {
      return next(new HttpError('The input field is empty.', 404));
    }
  } catch (err) {
    next(new HttpError(err, 500));
  }
};

const createAudience = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      const createAudience = await processAPIAudience(req.body);
      const audience = await Audience.create(createAudience);
      res.json({
        key: audience.key,
        name: audience.displayName,
        combine: audience.combine,
        conditions: audience.conditions,
        createdAt: audience.createdAt,
        updatedAt: audience.updatedAt,
      });
    } else {
      return next(new HttpError('The input field is empty.', 404));
    }
  } catch (err) {
    next(new HttpError(err, 500));
  }
};

const toggleFlag = async (req, res, next) => {
  try {
    const keyToToggle = req.params.key;
    // toggles status in place via aggregation pipeline opperator `$set`
    const updatedFlag = await Flag.findOneAndUpdate(
      { key: keyToToggle },
      [
        // do we want to do this?
        { $set: { status: { $not: '$status' } } },
      ],
      { new: true }
    );
    console.log('publishing a toggle');
    publisher.publishFlagToggle(JSON.stringify(updatedFlag));
    // next()

    res.json(updatedFlag);
  } catch (err) {
    next(new HttpError(err, 500));
  }
};

const getFlags = async (req, res, next) => {
  let flags = []; // initialize return array

  // streams query one result at a time (see .cursor method)
  for await (const flag of Flag.find()) {
    try {
      // `flag` is a Mongoose query object, so it has method `populate`
      flags.push(
        await flag.populate({
          path: 'audiences',
          populate: {
            path: 'conditions.attribute',
          },
        })
      );
    } catch (err) {
      next(new HttpError(err, 500));
    } // we can't console log errors dude
  }

  res.json(flags);
};

const getAudiences = async (req, res, next) => {
  try {
    const audiences = await Audience.find({}).populate({
      path: 'conditions.attribute',
    });
    res.json(audiences);
  } catch (err) {
    next(new HttpError(err, 500));
  }
};

const getAttributes = async (req, res, next) => {
  try {
    const attributes = await Attribute.find({});
    res.json(attributes);
  } catch (err) {
    next(new HttpError(err, 500));
  }
};

const updateFlag = async (req, res, next) => {
  try {
    const keyToUpdate = req.params.key;
    const update = req.body;
    // toggles status in place via aggregation pipeline opperator `$set`
    const updatedFlag = await Flag.findOneAndUpdate(
      { key: keyToUpdate },
      { ...update },
      { new: true }
    );

    publisher.publishUpdate(JSON.stringify(processedFlags));
    // next()

    res.json(updatedFlag);
  } catch (err) {
    next(new HttpError(err, 500));
  }
};

const updateAudience = async (req, res, next) => {
  try {
    const keyToUpdate = req.params.key;
    const update = req.body;
    // toggles status in place via aggregation pipeline opperator `$set`
    const updatedAud = await Audience.findOneAndUpdate(
      { key: keyToUpdate },
      { ...update },
      { new: true }
    );
    next();

    res.json(updatedAud);
  } catch (err) {
    next(new HttpError(err, 500));
  }
};

const updateAttribute = async (req, res, next) => {
  try {
    const keyToUpdate = req.params.key;
    const update = req.body;
    // toggles status in place via aggregation pipeline opperator `$set`
    const updatedAttr = await Attribute.findOneAndUpdate(
      { key: keyToUpdate },
      { ...update },
      { new: true }
    );
    next();

    res.json(updatedAttr);
  } catch (err) {
    next(new HttpError(err, 500));
  }
};

exports.getFlags = getFlags;
exports.getAudiences = getAudiences;
exports.getAttributes = getAttributes;
exports.createFlag = createFlag;
exports.updateFlag = updateFlag;
exports.toggleFlag = toggleFlag;
exports.createAudience = createAudience;
exports.updateAudience = updateAudience;
exports.createAttribute = createAttribute;
exports.updateAttribute = updateAttribute;
