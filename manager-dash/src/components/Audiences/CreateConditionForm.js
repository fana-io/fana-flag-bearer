import { useState } from 'react';
import { attributes } from '../../lib/data';

// Seeded Form Options
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


// Reusable form component that passes the parent Create Audience Form an object that represents a condition (attribute id, operator, and target value) 
export const ConditionForm = ({ passData, id, removeCondition }) => {
  const [attribute, setAttribute] = useState(attributeOptions[0].value);
  const [operator, setOperator] = useState('');
  const [targetValue, setTargetValue] = useState('');

  console.log(`condition #${id}: `, attribute, operator, targetValue);

  const handleSave = (e) => {
    // sends a saved condition to parent Create Audience Form
    e.preventDefault()
    passData({
      attribute,
      operator,
      value: targetValue,
      id: id
    })
  }
  // send Condition Form index back to parent to remove
  const handleRemoveCondition = (e) => {
    e.preventDefault()
    removeCondition(id)
  }

  return (
    <div>
      <label>
        Attribute
        <select onChange={(e) => setAttribute(e.target.value)}>
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
          onChange={(e) => setTargetValue(e.target.value)}
        />
      </label>
      <button type="button" onClick={ handleSave }>Save Condition</button>
      <button type="button" onClick={ handleRemoveCondition }>Remove Condition</button>
    </div>
  );
}
