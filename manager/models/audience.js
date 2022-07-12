const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

/*
Audience Object:
{
  name: str,
  combine: str,  // "ANY" | "ALL"  // conditions in audience
  conditions: [
    {
      attribute: attribute._id
      operator: String,
      value: String
    }
  ]
}
*/

const AudienceSchema = new Schema({
  // expects {name}
  // returns {displayName, key} (key = parseName(displayName))
  // name = "California Students"; key = "california_students"
  key: {
    type: String,
    unique: true
  },
  name: String,
  combine: {
    type: String,
    enum: ['ANY', 'ALL'],
    default: 'ANY'
  },
  conditions: [
    {
      attribute: { type: ObjectId, ref: 'Attribute' },
      operator: String,
      value: String /*depends, but it's JSON*/
    }
  ]
}, { timestamps: true });

const Audience = mongoose.model('Audience', AudienceSchema);

module.exports = Audience;