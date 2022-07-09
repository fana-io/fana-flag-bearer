const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const FlagSchema = new Schema({
  key: {
    type: String,
    required: [true, 'The Flag key is required'],
  },
  sdkKey: String,
  audiences: [{ type: ObjectId, ref: 'Audience' }],
  combine: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Flag = mongoose.model('Flag', FlagSchema);

module.exports = Flag;