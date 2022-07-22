const condition_1 = {
  "attribute": "beta",
  "operator": "EQ",
  "vals": "true",
  "negate": false
}

const condition_2 = {
  "attribute": "location",
  "operator": "EQ",
  "vals": "California",
  "negate": false
}

const condition_3 = {
  "attribute": "age",
  "operator": "GT",
  "vals": "18",
  "negate": false
}

const seedData = {
  sdkKeys: {
    "beta_sdk_0":true,
    "de9-6bf1a0c-3":true,
    "fa4-d731f0e-4":true
  },

  "beta-header": {
      "status": true,
      "beta-testers": {
        combine: "ANY",
        conditions: [
          {
            "attribute": "beta",
            "operator": "EQ",
            "vals": ["true"],
            "negate": false
          }
        ]
      }
  },
  "CA-header": {
    "status": true,
    "na-testers": {
      combine: "ALL",
      conditions: [
        {
          "attribute": "country",
          "operator": "IN",
          "vals": ["canada", "usa"],
          "negate": false
        },
        {
          "attribute": "age",
          "operator": "GT",
          "vals": ["18"],
          "negate": false
        }
      ]
    }
  }
}
// ======================================//

class FlagData {
  constructor() {
    this._flagData = seedData;
  }

  setFlagData(newFlagData) {
    // assuming always receive full data set from Command
    this._flagData = newFlagData;
  }

  getFlagData() {
    return this._flagData;
  }

  
}

module.exports.flagData = new FlagData();