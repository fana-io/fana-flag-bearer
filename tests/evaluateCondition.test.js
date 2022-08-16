const {evaluateCondition, convertAttributeType} = require("../utils/evaluateCondition")
const testData = require('./testData')


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

describe('testing the evaluation of a single attribute condition against a user context', () => {
  let jjuy = testData.testUser1.userContext
  let yrc = testData.testUser2.userContext
  let ahsu = testData.testUser3.userContext

  test('beta user evaluates true', () => {
    expect(evaluateCondition(jjuy, testConditions.trueValue)).toBe(true)
  })
  
  test('user is not a beta tester evalutes false', () => {
    expect(evaluateCondition(yrc, testConditions.trueValue)).toBe(false)
  })
  test('user does not have beta attribute evalutes false', () => {
    expect(evaluateCondition(ahsu, testConditions.trueValue)).toBe(false)
  })
  test('user in washington evalutes for state IN true', () => {
    expect(evaluateCondition(ahsu, testConditions.isInstring)).toBe(true)
  })
  
  test('new jersey user evalutes to false for west coast states', () => {
    expect(evaluateCondition(yrc, testConditions.isInstring)).toBe(false)
    
  })
  test('new jersey user evalutes to false for NOT IN west coast states', () => {
    let negatedCondition = testConditions.isInstring
    negatedCondition.negate = true
    expect(evaluateCondition(yrc, negatedCondition)).toBe(true)
  })
  
  test('age 50 evalues to false age 20', () => {
    expect(evaluateCondition(ahsu, testConditions.equalTo20)).toBe(false)
    
  })
  test('age 50 evalues to true for GT age 20', () => {
    expect(evaluateCondition(ahsu, testConditions.greaterThan20)).toBe(true)
    
  })
  test('age 20 evalues to true for age 20', () => {
    expect(evaluateCondition(jjuy, testConditions.equalTo20)).toBe(true)
    
  })
  test('age 20 evalues to true for GT_EQ age 20', () => {
    expect(evaluateCondition(jjuy, testConditions.equalTo20)).toBe(true)
    
  })
  test('age 19 evalues to true for LT age 20', () => {
    expect(evaluateCondition(yrc, testConditions.lessThan20)).toBe(true)
    
  })
  test('age 19 evalues to true for LT_EQ age 20', () => {
    expect(evaluateCondition(yrc, testConditions.lessThan20)).toBe(true)
  })
  
})