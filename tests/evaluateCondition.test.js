const {evaluateCondition, convertAttributeType} = require("../utils/evaluateCondition")
const testData = require('./testData')

/*
2. evaluateCondition - user context and condiittion 
*/
let testConditions = testData.testConditions

describe('attribute type converstion Boolean and String values', () => {

  test('condition containing true string returns boolean true', () => {
    let condition = testConditions.trueValue
    expect(convertAttributeType(condition.vals, condition.operator)).toBe(true)
  })
  
  test('condition containing false string returns boolean false', () => {
    let condition = testConditions.falseValue
    expect(convertAttributeType(condition.vals, condition.operator)).toBe(false)
  })
  
  test('condition using EQ and one string val returns one string', () => {
    let condition = testConditions.eQstring
    expect(convertAttributeType(condition.vals, condition.operator)).toBe('california')
  })

  test('condition using IS_IN and many string vals returns array with same number of elements', () => {
    let condition = testConditions.isInstring
    let attribute = convertAttributeType(condition.vals, condition.operator)

    expect(attribute).toEqual(expect.arrayContaining(['california', 'washington', 'oregon']))
    expect(attribute).toHaveLength(3)
  })

  test('condition using STR_CONTAINS and string val returns string', () => {
    let condition = testConditions.strContains
    expect(convertAttributeType(condition.vals, condition.operator)).toBe('california') 
  })
  test('condition using STR_ENDS_WITH and string val returns string', () => {
    let condition = testConditions.strEndsWith
    expect(convertAttributeType(condition.vals, condition.operator)).toBe('california') 
  })
  test('condition using STR_STARTS_WITH and string val returns string', () => {
    let condition = testConditions.strStartsWith
    expect(convertAttributeType(condition.vals, condition.operator)).toBe('california') 
  })

})

describe('attribute converstion for Number values using', () => {
  
  test('condition using LT_EQ and string val returns number', () => {
    let condition = testConditions.lessThanOrEqualTo20
    expect(convertAttributeType(condition.vals, condition.operator)).toBe(20) 
  })
  test('condition using LT and string val returns number', () => {
    let condition = testConditions.lessThan20
    expect(convertAttributeType(condition.vals, condition.operator)).toBe(20) 
  })
  test('condition using GT and string val returns number', () => {
    let condition = testConditions.greaterThan20
    expect(convertAttributeType(condition.vals, condition.operator)).toBe(20) 
  })
  test('condition using GT_EQ and string val returns number', () => {
    let condition = testConditions.greaterThanOrEqualTo
    expect(convertAttributeType(condition.vals, condition.operator)).toBe(20) 
  })

})
/*
- beta is true
- Not beta
- off flag for all
- on flag for all,
- cali or student
- cali AND student
- neither cali nor student
- userid is in 
- user id contains "u"
- age is greater than 
- age lt eq 20
*/
describe.only('testing the evaluation of a single attribute condition against a user context', () => {
  let users = testData.users

  test('california beta tester non-student is a beta tester', () => {
    let userContext = users[0]

    expect(evaluateCondition(userContext, testConditions.trueValue))
  })

  test('user is not a beta tester evalutes false', () => {
    
  })
  test('user is a beta tester evalutes true', () => {
    
  })
  test('user in washington evalutes for state IS_IN true', () => {
    
  })

  test('georgia user evalutes to false for west coast states', () => {
    
  })

  test('age 50 evalues to false age 20', () => {
    
  })
  test('age 50 evalues to true for GT age 20', () => {
    
  })
  test('age 20 evalues to true for age 20', () => {
    
  })
  test('age 20 evalues to true for GT_EQ age 20', () => {
    
  })
  test('age 19 evalues to true for LT age 20', () => {
    
  })
  test('age 19 evalues to true for LT_EQ age 20', () => {
    
  })
  
})