import { Condition } from './Condition';

// List of conditions saved to Create Audience Form
export const ConditionListing = ({ conditions, removeCondition, attributes }) => {

  // send Condition id back to parent to remove from state
  const handleRemoveCondition = (e) => {
    e.preventDefault();
    removeCondition(e.target.getAttribute('data-id'));
  };

  return (
    <>
    { conditions.length ? (
      <ul>
        {conditions.map(condition => (
          <li>
            <Condition condition={condition} key={condition.id} attributes={attributes} />
            <button
              type="button"
              onClick={handleRemoveCondition}
              data-id={condition.id}
              >
              Remove Condition
            </button>
          </li>
        ))}
      </ul>
        )
      : <p>No conditions created yet.</p>
    }
    </>
  );
};
