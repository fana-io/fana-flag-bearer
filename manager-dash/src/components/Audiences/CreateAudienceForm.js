import { useState } from 'react';
import { ConditionListing } from '../Conditions/ConditionListing';
import { ConditionForm } from '../Conditions/CreateConditionForm';
import { useDispatch } from 'react-redux';
/*
todo's
- form error handling: require fields, attribute/op validator
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
  const dispatch = useDispatch()
  console.log('saved conditions:', conditions);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAudience = {
      name,
      conditions,
      combine: combination,
    };
    // dispatch(newAudience)
  };
  
  // receives saved condition from child component ConditionForm
  const handlePassCondition = (newCondition) => {
    const newCount = conditionCount + 1;
    setConditionCount(newCount)
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id) => {
    const conditionsLessRemoved = conditions.filter((condition) =>
      condition.id !== Number(id)) 
    setConditions([...conditionsLessRemoved]);
  };

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
          <h5>Conditions</h5>
          <ConditionListing
            conditions={conditions}
            removeCondition={removeCondition}
          />
        </div>
        <div>
          <h5>Define Condition</h5>
          {
            <ConditionForm
              passData={handlePassCondition}
              id={conditionCount}
              key={conditionCount}
            />
          }
          <div>
          </div>
        </div>
        <input type="submit" value="Save Audience" disabled />
      </form>
    </div>
  );
};
