const Flag = require('../models/flag');
const Audience = require('../models/audience');
const Attribute = require('../models/attribute');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');
const {
  processAPIFlag,
  processAPIAudience,
  processAPIAttribute
} = require('./helpers/managementHelpers');
const { request } = require('express');

const createFlag = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      let createFlag = await processAPIFlag(req.body)
      let flag = await Flag.create(createFlag);

      res.json({
        key: flag.key,
        displayName: flag.displayName,
        sdkKey: flag.sdkKey,
        audiences: flag.audiences,
        status: flag.status,
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
      const createAttribute = await processAPIAttribute(req.body)
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
      const createAudience = await processAPIAudience(req.body)
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
    const updatedFlag = await Flag.findOneAndUpdate(
      {key: keyToToggle},
      {status: req.body.status},
      {new: true}
    )

    res.json(updatedFlag)
  } catch (err) { next(new HttpError(err, 500)) }
}

exports.createFlag = createFlag;
exports.toggleFlag = toggleFlag;
exports.createAudience = createAudience;
exports.createAttribute = createAttribute;