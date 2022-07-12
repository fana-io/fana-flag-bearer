const Audience = require('../../models/audience')
const Attribute = require('../../models/attribute')

async function processAPIFlag(rawReqFlag) {
  const {name, sdkKey, audiences} = rawReqFlag
  const [displayName, key] = processNameInput(name)
  const audienceKeys = await translateKeysToIds(Audience, audiences)

  return {
    key,
    displayName,
    sdkKey,
    audiences: audienceKeys
  }
}

async function processAPIAudience(rawReqAud) {
  const { name, combine, conditions } = rawReqAud
  const [displayName, key] = processNameInput(name)
  const curratedConds = await translateConditionAttrKeysToIds(conditions)

  return {
    key,
    displayName,
    combine,
    conditions: curratedConds
  }
}

async function processAPIAttribute(rawReqAttr) {
  const {name, attrType} = rawReqAttr
  const [displayName, key] = processNameInput(name)
  return {
    key,
    displayName,
    attrType
  }
}
  
function processNameInput(input) {
  // input name => make lowercase and replace whitespace with "_"
  const key = input.replace(/\s/g, "_").toLowerCase()
  return [input, key]
}

async function translateKeysToIds(mongooseModel, keysArr) {
  // this is a shim to translate API requests that use `key` values
  // in their requests to create flags with audiences, etc
  // this function translates the key values recieved by API into Mongo ObjectIds
  const curratedKeys = keysArr.map(inputKey => processNameInput(inputKey)[1])
  let collection = await mongooseModel.find().exec()

  try {
    return curratedKeys.map(key => {
      let doc = collection.find(document => document.key === key)
      if (!doc) throw `Invalid audience key ${key} in request data`
      return doc._id
    })
  } catch (err) {console.log(err)}
}

async function translateConditionAttrKeysToIds(condsArr) {
  // find attr collection
  // map conditions attribute to objectId matching key
  // return {...condition, attribute: doc._id}
  try {
    const attrKeys = condsArr.map(({attribute}) => processNameInput(attribute)[1])
    const attrIds = await translateKeysToIds(Attribute, attrKeys)

    const processedConds = condsArr.map((condition, ind) => {
      return {...condition, attribute: attrIds[ind]}
    })

    return processedConds
  } catch (err) {console.log(err)}
}

module.exports = { processAPIFlag, processAPIAudience, processAPIAttribute }