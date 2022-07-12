const Flag = require('../models/flag');
const Audience = require('../models/audience');
const Attribute = require('../models/attribute');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const createFlag = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      let flagDocObj = processAPIFlag(req.body)
      let flag = await Flag.create(req.body);
      const [displayName, key] = processNameInput(flag.name)
      res.json({
        key,
        name: displayName,
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
    // next(new HttpError('Creating flag failed, please try again', 500));
    next(new HttpError(err, 500));
  }
};

const createAttribute = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      let attribute = await Attribute.create(req.body);
      const [displayName, key] = processNameInput(attribute.name)
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
      let audience = await Audience.create(req.body);
      const [displayName, key] = processNameInput(audience.name)
      res.json({
        key,
        name: displayName,
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

function processNameInput(input) {
  const key = input.replace(/\s/, "_").toLowerCase()
  return [input, key]
}

function processAPIFlag(rawReqFlag) {
  console.log("raw request flag", rawReqFlag)
}



exports.createFlag = createFlag;
exports.createAudience = createAudience;
exports.createAttribute = createAttribute;