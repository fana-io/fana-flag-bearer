const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { ObjectId } = Schema.Types;

const AttributeSchema = new Schema({
  name: String,
  attrType: {
    type: String,
    enum: ["BOOL", "STR", "NUM", "DATETIME"],
    default: "STR"
  }
});

const Attribute = mongoose.model('Attribute', AttributeSchema);

module.exports = Attribute;