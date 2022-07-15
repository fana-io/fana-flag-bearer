import { useState } from 'react';
import { operatorOptions } from '../../lib/formConstants';

// Reusable form component that passes the parent Create Audience Form an object that represents a condition (attribute id, operator, and target value)
export const ConditionForm = ({ passData, id, attributes }) => {
  const attributeOptions = createAttrOptions(attributes);
  const [attributeId, setAttributeId] = useState(attributeOptions[0].id);
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
            return (
              <option value={option.id} data-key={option.key} key={option.id}>
                {option.text}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Operator
        <select onChange={(e) => setOperator(e.target.value)}>
          {operatorOptions.map((option, idx) => {
            return (
              <option value={option.value} key={idx}>
                {option.text}
              </option>
            );
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

function createAttrOptions(attributesArr) {
  return attributesArr.map((attr) => ({
    id: attr._id,
    text: attr.displayName,
    key: attr.key,
  }));
}
