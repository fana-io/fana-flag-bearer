import { Condition } from './Condition';
import { attributes } from '../../lib/data';

// List of conditions saved to Create Audience Form
export const ConditionListing = ({ conditions, removeCondition }) => {
  // map attr name to attr, since they only have attribute id
  const conditionsWithName = conditions.map((c) => {
    const attribute = attributes.find((a) => a._id === c.attributeId);
    return { ...c, name: attribute.name };
  });

  // send Condition id back to parent to remove from state
  const handleRemoveCondition = (e) => {
    e.preventDefault();
    removeCondition(e.target.getAttribute('data-id'));
  };

  return (
    <>
      <ul>
        {conditionsWithName.map((condition) => (
          <li>
            <Condition condition={condition} key={condition.id} />
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
    </>
  );
};
