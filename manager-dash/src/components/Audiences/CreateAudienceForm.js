import { useState } from 'react';
import { attributes } from '../../lib/data';
/*
todo's
- if operator is IS IN, then value will be an array of comma separated values, clean whitespace

*/
const combinationOptions = [
  { value: '', text: 'Select a type' },
  { value: 'ANY', text: 'Any' },
  { value: 'ALL', text: 'All' },
];

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

export const CreateAudienceForm = () => {
  const [name, setName] = useState('');
  const [combination, setCombination] = useState('');
  // const [conditionCount, setConditionCount] = useState(1);
  // debug: this also resets the whole form 
  const [conditions, setConditions] = useState([]);
  let conditionCount = 1;

  // note: updating conditions with each saved condition to State directly rerenders the whole form and wipes the condition Form, so temporarily save in array. Once entire form is saved, then add savedConditions to conditions state.
  const savedConditions = []
  console.log('condition count:', conditionCount);
  console.log('saved conditions:', conditions);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConditions(...conditions, ...savedConditions)
    // TODO: submit to manager backend
  };

  const addConditionSection = (e) => {
    // tracks the number of Condition Forms shown
    e.preventDefault();
    conditionCount++;
  };
  const handlePassCondition = (newCondition) => {
    // receives saved condition from child component ConditionForm
    console.log(newCondition);
    savedConditions.push(newCondition)
  };

  let countOfConditions = new Array(conditionCount).fill(null); // utility to render correct number of Condition Forms

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
          {countOfConditions.map((c, idx) => (
            <ConditionComponent
              passData={handlePassCondition}
              index={idx}
              key={idx}
            />
          ))}
          <div>
            <button onClick={addConditionSection}>+Add Condition</button>
          </div>
        </div>
        <input type="submit" value="submit" disabled />
      </form>
    </div>
  );

  // Reusable form component that passes the parent Create Audience Form an object that represents a condition (attribute id, operator, and target value) 
  function ConditionComponent({ passData, index }) {
    const [attribute, setAttribute] = useState(attributeOptions[0].value);
    const [operator, setOperator] = useState('');
    const [targetValue, setTargetValue] = useState('');

    console.log(`condition #${index}: `, attribute, operator, targetValue);

    const handleSave = (e) => {
      // sends a saved condition to parent Create Audience Form
      e.preventDefault()
      passData({
        attribute,
        operator,
        value: targetValue
      })
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
      </div>
    );
  }
};
