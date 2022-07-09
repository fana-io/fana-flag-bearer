const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { ObjectId } = Schema.Types;

/*
Attribute Object:
{
  name: str,
  attrType: str
}
*/

const AttributeSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  attrType: {
    type: String,
    enum: ["BOOL", "STR", "NUM", "DATETIME"],
    default: "STR"
  }
}, { timestamps: true });

const Attribute = mongoose.model('Attribute', AttributeSchema);

module.exports = Attribute;