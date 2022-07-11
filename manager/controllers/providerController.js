const Flag = require('../models/flag');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const getRuleset = async(req, res, next) => {
  try {
    const fullFlags = await fetchFlags()
    // to see the raw flag object, uncomment this
    // console.log(fullFlags[0])

    const processedFlags = flattenFlags(fullFlags)

    res.json(processedFlags)

  } catch (err) {
    next(new HttpError('Query failed, please try again', 500));
  }
}

async function fetchFlags() {
  let flags = [] // initialize return array

  // streams query one result at a time
  for await (const flag of Flag.find()) {
    try {
      // `flag` is a Mongoose query object, so it has method `populate`
      flags.push(await flag.populate({
        path: 'audiences',
        populate: {
          path: 'conditions.attribute',
        },
      }));

    } catch (err) { console.log(err) }    // we can't console log errors dude
  }

  return flags
}

function flattenFlags(rawFlags){
  // flattens the raw object returned from the Mongo query
  // into the object expected by the Flag Bearer

  
  let result = []
  for (let rawFlag of rawFlags) {
    let sdkEntryInd = result.findIndex(({sdkKey}) => {
      return rawFlag.sdkKey == sdkKey
    })
    
    if (sdkEntryInd < 0) includeNewSDK(result, rawFlag)
    else appendToExistingSDK(result, sdkEntryInd, rawFlag)
  }

  return result
}

function includeNewSDK(resultArr, flag) {
  let sdkRuleset = {
    sdkKey: flag.sdkKey,

    flags: [buildFlattenedFlag(flag)],

    audiences: flag.audiences.map(audience => {
      return buildFlattenedAudience(audience)
    })
  }

  resultArr.push(sdkRuleset)
}

function appendToExistingSDK(resultArr, sdkInd, flag) {
  resultArr[sdkInd].flags.push(buildFlattenedFlag(flag))

  // if audience _doesn't_ already exist, push audience to result
  // else, do nothing
  flag.audiences.forEach(flagAud => {
    let exists = resultArr.find(({audiences}) => {
      return audiences.find(({audienceId}) => {
        return audienceId === flagAud._id.toString()
      })
    })

    if (!exists) resultArr.audiences.push(buildFlattenedAudience(audience))
  })
}


function buildFlattenedFlag(rawFlagObj) {
  return {
    name: rawFlagObj.key,
    status: rawFlagObj.status,
    combination: rawFlagObj.combine,
    audiences: rawFlagObj.audiences.map(({_id}) => _id.toString())
  }
}

function buildFlattenedAudience(rawAudienceObj) {
  let {_id, conditions} = rawAudienceObj

  return {
    audienceId: _id.toString(),
    conditions: conditions.map(({attribute, operator, value}) => {
      return {
        attribute: attribute.name,
        operator,
        value
      }
    })
  }
}

exports.getRuleset = getRuleset;