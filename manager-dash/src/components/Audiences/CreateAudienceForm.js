import { useState } from 'react';
import { attributes } from '../../lib/data';
import { ConditionForm } from './CreateConditionForm';
/*
todo's
- if operator is IS IN, then value will be an array of comma separated values, clean whitespace
- instead of using Save Condition Button, just use one button
- form error handling: require fields, attribute/op validator
- removeCondition removes the last condition not matter what

*/
// Seeded Form Options
const combinationOptions = [
  { value: '', text: 'Select a type' },
  { value: 'ANY', text: 'Any' },
  { value: 'ALL', text: 'All' },
];

export const CreateAudienceForm = () => {
  const [name, setName] = useState('');
  const [combination, setCombination] = useState('');
  const [conditionCount, setConditionCount] = useState(1);
  const [conditions, setConditions] = useState([]);

  console.log('condition count:', conditionCount);
  console.log('saved conditions:', conditions);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAudience = {
      name,
      conditions,
      combine: combination, 
    }
    // setConditions(...conditions, ...savedConditions)
    // TODO: submit to manager backend
  };

  // tracks the number of Condition Forms shown
  const addConditionSection = (e) => {
    e.preventDefault();
    const newCount = conditionCount + 1;
    setConditionCount(newCount)
  };

  // receives saved condition from child component ConditionForm
  const handlePassCondition = (newCondition) => {
    console.log('condition from child:', newCondition);
    setConditions([...conditions, newCondition])
  };

  const removeCondition = (id) => {
    setConditions(conditions.filter(c => c.id !== id))
    const newCount = conditionCount - 1;
    setConditionCount(newCount);
  } 

  let idCounter = 0 // utility to render correct number of Condition Forms

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
          {
            new Array(conditionCount).fill(null).map(c => {
              idCounter++;
            return (
              <ConditionForm
              passData={handlePassCondition}
              removeCondition={removeCondition}
              id={idCounter}
              key={idCounter}
              />
              )
            })}
          <div>
            <button onClick={addConditionSection}>+Add Condition</button>
          </div>
        </div>
        <input type="submit" value="submit" disabled />
      </form>
    </div>
  );

};
