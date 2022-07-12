const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

/*
Raw Flag Object:
{
  key: str,
  sdkKey: str,
  status: bool,
  combine: str,  // "ANY" | "ALL"  // audiences in flag
  audiences: [audience._id],
}

Additional Props in DB:
{ createdAt, updatedAt, _id, __v }
*/

const FlagSchema = new Schema({
  key: {
    type: String,
    unique: true,
    required: [true, 'The Flag key is required'],
  },
  sdkKey: String,
  status: {
    type: Boolean,
    default: false
  },
  audiences: [{ type: ObjectId, ref: 'Audience' }],
  combine: {
    type: Boolean,
    default: false
  },
  combine: {
    type: String,
    enum: ['ANY', 'ALL'],
    default: 'ANY'
  },
}, { timestamps: true });

const Flag = mongoose.model('Flag', FlagSchema);

module.exports = Flag;