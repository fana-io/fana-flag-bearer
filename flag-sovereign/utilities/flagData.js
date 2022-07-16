class FlagData {
  constructor() {
    this._flagData;
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