import { AttributeListing } from './AttributeListing';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAttributes } from '../../features/attributes/attributes';
import { CreateAttributeForm } from "./CreateAttributeForm"

export const AttributesList = () => {
  const attributes = useSelector(state => state.attributes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch])

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
