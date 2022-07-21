/*
  {
    combine: "ALL",
    conditions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    _id: 'abd',
    key: "california_students",
    displayName: "California Students"
  },
*/
const operators = {
  EQ: '=',
  IN: 'is in',
  STR_CONTAINS: 'contains',
  STR_STARTS_WITH: 'starts with',
  STR_ENDS_WITH: 'ends with',
  GT: '>',
  LT: '<',
  LT_EQ: '<=',
  GT_EQ: '>='
}

export const AudienceCondition = ({ condition }) => {
  return (
    <li>
      {condition.attributeKey} {operators[condition.operator]} {condition.vals}
    </li>
  )
}