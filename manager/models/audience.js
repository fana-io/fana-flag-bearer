const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const AudienceSchema = new Schema({
  name: String,
  combine: {
    type: Boolean,
    default: false
  },
  conditions: [
    {
      attribute: { type: ObjectId, ref: 'Attribute' },
      operator: String,
      value: String /*depends, but it's JSON*/
    }
  ]
});

const Audience = mongoose.model('Audience', AudienceSchema);

module.exports = Audience;