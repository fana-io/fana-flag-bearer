import { useState, useEffect } from 'react';
import { ConditionListing } from '../Conditions/ConditionListing';
import { ConditionForm } from '../Conditions/ConditionForm';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAttributes } from '../../features/attributes/attributes';
import { combinationOptions } from '../../lib/formConstants';
import apiClient from '../../lib/ApiClient';


export const CreateAudienceForm = () => {
  const attributes = useSelector((state) => state.attributes);
  const [ready, setReady] = useState(false);
  const [name, setName] = useState('');
  const [combination, setCombination] = useState('');
  const [conditionCount, setConditionCount] = useState(1);
  const [conditions, setConditions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAttributes(() => setReady(true)));
  }, [dispatch]);

  if (!ready) {
    return <>Loading...</>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiClient.createAudience({
      name,
      conditions,
      combine: combination,
    })
  };
  
  // receives saved condition from child component ConditionForm
  const handlePassCondition = (newCondition) => {
    console.log('new condition received', newCondition);
    const newCount = conditionCount + 1;
    setConditionCount(newCount)
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id) => {
    const updatedConditions = conditions.filter((condition) =>
      condition.id !== Number(id)) 
    setConditions([...updatedConditions]);
  };

  return (
    <div>
      <h3>Create a new audience</h3>
      <form onSubmit={ null } className="form">
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
            {combinationOptions.map((option, index) => {
              return <option value={option.value} key={index}>{option.text} </option>;
            })}
          </select>
        </label>
        <div>
          <h5>Conditions</h5>
          <ConditionListing
            conditions={conditions}
            removeCondition={removeCondition}
            attributes={attributes}
            />
        </div>
        <div>
          <h5>Define Condition</h5>
          {
            <ConditionForm
              attributes={attributes}
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
