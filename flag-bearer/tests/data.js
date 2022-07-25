export const data = {
  "sdkKeys": [
      "c3e-db3100c-8",
      "de9-6bf1a0c-3",
      "fa4-d731f0e-4"
  ],
  "flags": {
      "beta-flag": {
          "beta_testers": {
              "combine": "ANY",
              "conditions": [
                  {
                      "negate": false,
                      "operator": "EQ",
                      "attribute": "beta",
                      "vals": [
                          "true"
                      ]
                  }
              ]
          },
          "status": true
      },
      "not-beta-flag": {
          "beta_testers": {
              "combine": "ANY",
              "conditions": [
                  {
                      "negate": true,
                      "operator": "EQ",
                      "attribute": "beta",
                      "vals": [
                          "true"
                      ]
                  }
              ]
          },
          "status": true
      },
      "toggled-off-flag-all": {
          "status": false
      },
      "toggled-on-flag-all": {
          "status": true
      },
      "cali-or-student": {
          "california_students": {
              "combine": "ANY",
              "conditions": [
                  {
                      "negate": false,
                      "operator": "EQ",
                      "attribute": "state",
                      "vals": [
                          "california"
                      ]
                  },
                  {
                      "negate": false,
                      "operator": "EQ",
                      "attribute": "student",
                      "vals": [
                          "true"
                      ]
                  }
              ]
          },
          "status": true
      },
      "cali-and-student": {
          "california_students": {
              "combine": "AND",
              "conditions": [
                  {
                      "negate": false,
                      "operator": "EQ",
                      "attribute": "state",
                      "vals": [
                          "california"
                      ]
                  },
                  {
                      "negate": false,
                      "operator": "EQ",
                      "attribute": "student",
                      "vals": [
                          "true"
                      ]
                  }
              ]
          },
          "status": true
      },
      "not-cali-nor-student": {
          "california_students": {
              "combine": "AND",
              "conditions": [
                  {
                      "negate": true,
                      "operator": "EQ",
                      "attribute": "state",
                      "vals": [
                          "california"
                      ]
                  },
                  {
                      "negate": true,
                      "operator": "EQ",
                      "attribute": "student",
                      "vals": [
                          "true"
                      ]
                  }
              ]
          },
          "status": true
      },
      "non-cali-student": {
          "california_students": {
              "combine": "AND",
              "conditions": [
                  {
                      "negate": true,
                      "operator": "EQ",
                      "attribute": "state",
                      "vals": [
                          "california"
                      ]
                  },
                  {
                      "negate": false,
                      "operator": "EQ",
                      "attribute": "student",
                      "vals": [
                          "true"
                      ]
                  }
              ]
          },
          "status": true
      },
      "qa-user-ids": {
          "qa_users": {
              "combine": "ANY",
              "conditions": [
                  {
                      "negate": false,
                      "operator": "IN",
                      "attribute": "userId",
                      "vals": [
                          "jjuy",
                          "yrc",
                          "ahsu"
                      ]
                  },
              ]
          },
          "status": true
      },
      "userId-contains": {
          "qa_users": {
              "combine": "ANY",
              "conditions": [
                  {
                      "negate": false,
                      "operator": "STR_CONTAINS",
                      "attribute": "userId",
                      "vals": [
                          "u",
                      ]
                  },
              ]
          },
          "status": true
      },
      "older-than-20": {
          "adults": {
              "combine": "ANY",
              "conditions": [
                  {
                      "negate": false,
                      "operator": "GT",
                      "attribute": "age",
                      "vals": [
                          20,
                      ]
                  },
              ]
          },
          "status": true
      },
      "less-than-or-eq-20": {
          "adults": {
              "combine": "ANY",
              "conditions": [
                  {
                      "negate": false,
                      "operator": "LT_EQ",
                      "attribute": "age",
                      "vals": [
                          20,
                      ]
                  },
              ]
          },
          "status": true
      },
  }
}