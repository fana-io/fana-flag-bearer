// for both strings and booleans
// targetVal is from flag rules
// candidateVal is from userContext
const isEq = (targetVal, candidateVal) => {
  if (typeof candidateVal === 'string') {
    candidateVal = candidateVal.toLowerCase();
  }

  if (targetVal === 'true' || targetVal === 'false') {
    // this needs to be redone, this hacky af
    return Boolean(targetVal) === candidateVal;
  }
  return candidateVal === targetVal;
};
const isIn = (targetVals, candidateVal) =>
  targetVals.includes(candidateVal.toLowerCase());
const isNotIn = (targetVals, candidateVal) =>
  !targetVals.includes(candidateVal.toLowerCase());
const strContains = (targetVal, candidateVal) =>
  candidateVal.toLowerCase().includes(targetVal);
const strEndsWith = (targetVal, candidateVal) =>
  candidateVal.toLowerCase().endsWith(targetVal);
const strStartsWith = (targetVal, candidateVal) =>
  candidateVal.toLowerCase().startsWith(targetVal);

const isGreaterThan = (targetVal, candidateVal) => candidateVal > targetVal;
const isGreaterEqThan = (targetVal, candidateVal) => candidateVal >= targetVal;
const isLessThan = (targetVal, candidateVal) => candidateVal < targetVal;
const isLessEqThan = (targetVal, candidateVal) => candidateVal <= targetVal;

let operandMapper = {
  EQ: isEq,
  IN: isIn,
  NOT_IN: isNotIn,
  STR_CONTAINS: strContains,
  STR_ENDS_WITH: strEndsWith,
  STR_STARTS_WITH: strStartsWith,
  GT: isGreaterThan,
  LT: isLessThan,
  LT_EQ: isLessEqThan,
  GT_EQ: isGreaterEqThan,
};
// for one attribute
const evaluateCondition = (userContext, condition) => {
  const op = condition.operator;
  const attribute = condition.attribute;
  // targetValue needs to be cast to whatever condition.type is
  const targetValue = condition.value;
  const candidateValue = userContext[attribute];
  if (!candidateValue) return false;
  return operandMapper[op](targetValue, candidateValue);
};

module.exports = {
  evaluateCondition,
};
