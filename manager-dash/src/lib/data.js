export const flags = [
  {
    _id: '123',
    key: "flag_1",
    displayName: "Flag 1",
    status: false,
    audiences: [{ name: "Beta testers" }, { name: "California Students" }],
    combine: "ALL",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '124',
    key: "flag_2",
    displayName: "Flag 2",
    status: true,
    audiences: [{ name: "Beta testers" }],
    combine: "ANY",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const audiences = [
  {
    combine: "ANY",
    conditions: [
      {
        attribute: 'beta',
        operator: 'EQ',
        value: 'true'
      }],
    createdAt: new Date(),
    updatedAt: new Date(),
    _id: 'abc',
    key: "beta_testers",
    displayName: "Beta Testers"
  },
  {
    combine: "ALL",
    conditions: [
      {
        attribute: 'state',
        operator: 'EQ',
        value: 'california'
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    _id: 'abd',
    key: "california_students",
    displayName: "California Students"
  },
]

export const attributes = [
  {
    _id: "1",
    name: "beta",
    type: "boolean"
  },
  {
    _id: "2",
    name: "state",
    type: "string"
  }
]