import { useEffect, useState } from 'react';
import ApiClient from '../../lib/ApiClient';
import { CreateAttributeForm } from "./CreateAttributeForm"
import { AttributeTable } from './AttributeTable';

export const AttributesList = () => {
  const [ready, setReady] = useState(false);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const init = async () => {
      const attributes = await ApiClient.getAttributes();
      setAttributes(attributes);
      setReady(true)
    }
    init();
  }, [])

  if (!ready) {
    return <>Loading...</>
  }

  return (
    <div className="list">
      <CreateAttributeForm></CreateAttributeForm>
      <AttributeTable attributes={attributes} />
    </div>
  );
};