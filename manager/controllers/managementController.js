// create flag
// add audiences to flag
// create an audience based on attributes

const Flag = require('../models/flag');
const Audience = require('../models/audience');
const Attribute = require('../models/attribute');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const createFlag = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      let flag = await Flag.create(req.body.flag);
      res.json({
        key: flag.key,
        sdkKey: flag.sdkKey,
        audiences: flag.audiences,
        combine: flag.combine,
        status: flag.status,
        createdAt: flag.createdAt,
        updatedAt: flag.updatedAt,
      });
    } else {
      return next(new HttpError('The input field is empty.', 404));
    }
  } catch (err) {
    next(new HttpError('Creating flag failed, please try again', 500));
  }
};

const createAttribute = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      let attribute = await Attribute.create(req.body.attribute);
      res.json({
        name: attribute.name,
        attrType: attribute.attrType,
        createdAt: attribute.createdAt,
        updatedAt: attribute.updatedAt,
      });
    } else {
      return next(new HttpError('The input field is empty.', 404));
    }
  } catch (err) {
    next(new HttpError('Creating flag failed, please try again', 500));
  }
};

const createAudience = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      let audience = await Audience.create(req.body.audience);
      res.json({
        name: audience.name,
        combine: audience.combine,
        conditions: audience.conditions,
        createdAt: audience.createdAt,
        updatedAt: audience.updatedAt,
      });
    } else {
      return next(new HttpError('The input field is empty.', 404));
    }
  } catch (err) {
    next(new HttpError('Creating flag failed, please try again', 500));
  }
};



exports.createFlag = createFlag;
exports.createAudience = createAudience;
exports.createAttribute = createAttribute;