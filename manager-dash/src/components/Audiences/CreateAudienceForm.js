import { useState } from 'react';
import { attributes } from '../../lib/data';

export const CreateAudienceForm = () => {
  const [name, setName] = useState('');
  const [combination, setCombination] = useState('');
  const [attribute, setAttribute] = useState('');
  const [operator, setOperator] = useState('');
  const [targetValue, setTargetValue] = useState('');

  console.log('name: ', name);
  console.log('combination: ', combination);
  console.log(attribute, operator, targetValue);

  const combinationOptions = [
    { value: '', text: 'Select a type' },
    { value: 'ANY', text: 'Any' },
    { value: 'ALL', text: 'All' },
  ];

  function createAttrOptions(attributesArr) {
    return attributesArr.map((attr) => ({ value: attr._id, text: attr.name }));
  }
  // TODO: import dynamic list of attributes and operators from manager
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit to manager backend
  };

  const addConditionSection = (e) => {
    e.preventDefault()
    console.log('clicked');
    // TODO: add condition section
  }

  return (
    <div>
      <h3>Create a new audience</h3>
      <form onSubmit={null} className="form">
        <label>
          Audience Name
          <input
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Combination Operator
          <select onChange={(e) => setCombination(e.target.value)}>
            {combinationOptions.map((option) => {
              return <option value={option.value}>{option.text}</option>;
            })}
          </select>
        </label>
        <div>
        <h5>Define Condition(s)</h5>
            <ConditionComponent />
            <div>
              <button onClick={ addConditionSection }>Add Condition</button>
            </div>
        </div>
        <input type="submit" value="submit" disabled />
      </form>
    </div>
  );

  function ConditionComponent() {
    return (
      <>
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
      </>
    );
  }
};
