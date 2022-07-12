export const allFlags = [
  {
    sdkKey: 'beta_sdk_0',
    flags: [
      {
        flagKey: 'flag-evals-true',
        status: true,
        audiences: ['beta-testers', 'california_students'],
      },
      {
        flagKey: 'flag-evals-false',
        status: true,
        audiences: ['california_students'],
      },
      {
        flagKey: 'no-audiences-flag',
        status: true,
        audiences: [],
      },
      {
        flagKey: 'toggled-off-flag',
        status: false,
        audiences: ['beta-testers'],
      },
    ],
    audiences: [
      {
        audienceKey: 'beta-testers',
        combination: 'ANY',
        conditions: [
          {
            attribute: 'userId',
            type: 'STR',
            operator: 'EQ',
            value: 'jjuy',
          },
          {
            attribute: 'beta',
            type: 'BOOL',
            operator: 'EQ',
            value: true,
          },
        ],
      },
      {
        audienceKey: 'california_students',
        combination: 'ALL',
        conditions: [
          {
            attribute: 'state',
            type: 'STR',
            operator: 'EQ',
            value: 'california',
          },
          {
            attribute: 'userId',
            type: 'STR',
            operator: 'EQ',
            value: 'jjuy',
          },
        ],
      },
    ],
  },
  {
    sdkKey: 'beta_sdk_1',
    flags: [
      {
        flagKey: 'flag-evals-true',
        status: true,
        audiences: ['beta-testers', 'california_students'],
      },
      {
        flagKey: 'flag-evals-false',
        status: true,
        audiences: ['california_students'],
      },
      {
        flagKey: 'no-audiences-flag',
        status: true,
        audiences: [],
      },
      {
        flagKey: 'toggled-off-flag',
        status: false,
        audiences: ['beta-testers'],
      },
    ],
    audiences: [
      {
        audienceKey: 'beta-testers',
        combination: 'ANY',
        conditions: [
          {
            attribute: 'age',
            type: 'NUM',
            operator: 'GT',
            value: '25',
          },
          {
            attribute: 'beta',
            type: 'BOOL',
            operator: 'EQ',
            value: true,
          },
        ],
      },
      {
        audienceKey: 'california_students',
        combination: 'ALL',
        conditions: [
          {
            attribute: 'state',
            type: 'STR',
            operator: 'STR_CONTAINS',
            value: 'california',
          },
          {
            attribute: 'userId',
            type: 'STR',
            operator: 'EQ',
            value: 'jjuy',
          },
        ],
      },
    ],
  },
];

export const testUser = {
  userId: 'JJUY',
  beta: false,
  age: 24,
  country: 'CanAdA',
  state: 'CA'
}