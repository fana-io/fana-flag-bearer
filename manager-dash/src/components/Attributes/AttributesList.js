import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAttributes } from '../../features/attributes/attributes';
import { CreateAttributeForm } from "./CreateAttributeForm"
import { AttributeTable } from './AttributeTable';

export const AttributesList = () => {
  const attributes = useSelector(state => state.attributes);
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(fetchAttributes(() => setReady(true)));
  }, [dispatch])

  if (!ready) {
    return <>Loading...</>
  }

  return (
    <div className="list">
      <AttributeTable attributes={attributes} />
      <CreateAttributeForm />
    </div>
  );
};