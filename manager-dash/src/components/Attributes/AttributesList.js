import { attributes } from '../../lib/data';
import { AttributeListing } from './AttributeListing';
import { CreateAttributeForm } from "./CreateAttributeForm"

export const AttributesList = () => {
  return (
    <>
      <div>
        <CreateAttributeForm></CreateAttributeForm>
      </div>
      <div className="list">
        {attributes.map((attribute) => {
          return (
            <AttributeListing
              key={attribute.name}
              attributeDetails={attribute}
            />
          );
        })}
      </div>
    </>
  );
};
