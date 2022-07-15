import { operators } from "../../lib/formConstants";

export const Condition = ({ condition, attributes }) => {

  // mapp attributeId in condition to attribute displayName
  const attribute = attributes.find(a=> a._id === condition.attributeId)
  return (
  <>
    {attribute.displayName} {operators[condition.operator]} {condition.value}
  </>
  );
};

