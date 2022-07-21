// for both strings and booleans
// targetVal is from flag rules
// candidateVal is from userContext
// if condition is negate, flip
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
  const targetValue = condition.vals;
  const candidateValue = userContext[attribute];
  if (!candidateValue) return false;
  return operandMapper[op](targetValue, candidateValue);
};

// TESTS
// let con1 = {
//   attribute: 'userId',
//   type: 'STR',
//   operator: 'STR_CONTAINS',
//   value: 'uy',
// };
// let con2 = {
//   attribute: 'beta',
//   type: 'BOOL',
//   operator: 'EQ',
//   value: true,
// };
// let con3 = {
//   attribute: 'age',
//   type: 'NUM',
//   operator: 'EQ',
//   value: 24,
// };
// let con4 = {
//   attribute: 'flower',
//   type: 'STR',
//   operator: 'STR_CONTAINS',
//   value: 25,
// };
// let con5 = {
//   attribute: 'country',
//   type: 'STR',
//   operator: 'STR_CONTAINS',
//   value: 'n',
// };
// let con6 = {
//   attribute: 'country',
//   type: 'STR',
//   operator: 'STR_STARTS_WITH',
//   value: 'c',
// };
// let con7 = {
//   attribute: 'country',
//   type: 'STR',
//   operator: 'STR_ENDS_WITH',
//   value: 'a',
// };
// let user = {
//   userId: 'JJUY',
//   beta: false,
//   age: 24,
//   country: 'CanadA',
// };

// console.log('1: ', evaluateCondition(user, con1));
// console.log('2: ', evaluateCondition(user, con2));
// console.log('3: ', evaluateCondition(user, con3));
// console.log('4: ', evaluateCondition(user, con4));
// console.log('5: ', evaluateCondition(user, con5));
// console.log('6: ', evaluateCondition(user, con6));
// console.log('7: ', evaluateCondition(user, con7));
// let allFlags = [
//   {
//     sdkKey: 'beta_sdk_1',
//     flags: [
//       {
//         flagKey: 'flag-evals-true',
//         status: true,
//         audiences: ['beta-testers', 'california_students'],
//       },
//       {
//         flagKey: 'flag-evals-false',
//         status: true,
//         audiences: ['california_students'],
//       },
//       {
//         flagKey: 'no-audiences-flag',
//         status: true,
//         audiences: [],
//       },
//       {
//         flagKey: 'toggled-off-flag',
//         status: false,
//         audiences: ['beta-testers'],
//       },
//     ],
//     audiences: [
//       {
//         audienceKey: 'beta-testers',
//         combination: 'ANY',
//         conditions: [
//           {
//             attribute: 'userId',
//             type: 'STR',
//             operator: 'EQ',
//             value: 'jjuy',
//           },
//           {
//             attribute: 'beta',
//             type: 'BOOL',
//             operator: 'EQ',
//             value: true,
//           },
//           {
//             attribute: 'age',
//             type: 'NUM',
//             operator: 'EQ',
//             value: 25,
//           },
//         ],
//       },
//     ],
//   },
// ];

module.exports = {
  evaluateCondition,
};
