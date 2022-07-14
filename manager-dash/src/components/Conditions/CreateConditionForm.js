import { useState } from 'react';
import { attributes } from '../../lib/data';

// ============= Seeded Form Options =============
function createAttrOptions(attributesArr) {
  return attributesArr.map((attr) => ({ value: attr._id, text: attr.name }));
}
const attributeOptions = createAttrOptions(attributes);

// note: operands should be based on attribute type
const operatorOptions = [
  { value: '', text: 'Select an operator' },
  { value: 'EQ', text: 'is equal to' },
  { value: 'IN', text: 'is in' },
  { value: 'NOT_IN', text: 'is not in' },
  { value: 'STR_CONTAINS', text: 'contains' },
  { value: 'STR_STARTS_WITH', text: 'starts with' },
  { value: 'STR_ENDS_WITH', text: 'ends with' },
  { value: 'GT', text: '>' },
  { value: 'LT', text: '<' },
  { value: 'GT_EQ', text: '>=' },
  { value: 'LT_EQ', text: '<=' },
];
// ========================== =============
/*
todo's
- if operator is IS IN, then value will be an array of comma separated values, clean whitespace
- form error handling: require fields, attribute/op validator
*/
// Reusable form component that passes the parent Create Audience Form an object that represents a condition (attribute id, operator, and target value)
export const ConditionForm = ({ passData, id }) => {
  const [attributeId, setAttributeId] = useState(attributeOptions[0].value);
  const [operator, setOperator] = useState('');
  const [value, setValue] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    passData({ attributeId, operator, value, id: id });
  };

  return (
    <div>
      <label>
        Attribute
        <select
          onChange={(e) => {
            setAttributeId(e.target.value);
          }}
        >
          {attributeOptions.map((option) => {
            return <option value={option.value}>{option.text}</option>;
          })}
        </select>
      </label>
      <label>
        Operator
        <select onChange={(e) => setOperator(e.target.value)}>
          {operatorOptions.map((option) => {
            return <option value={option.value}>{option.text}</option>;
          })}
        </select>
      </label>
      <label>
        Value
        <input
          name="value"
          type="text"
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSave}>
        Save Condition
      </button>
    </div>
  );
};
