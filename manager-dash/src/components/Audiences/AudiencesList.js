import { AudienceTable } from './AudienceTable';
import { useEffect, useState } from 'react';
import ApiClient from '../../lib/ApiClient';
import { CreateAudienceForm } from './CreateAudienceForm';

export const AudiencesList = () => {
  const [ready, setReady] = useState(false);
  const [audiences, setAudiences] = useState([]);

  useEffect(() => {
    const init = async () => {
      const audiences = await ApiClient.getAudiences();
      // also get all attributes for the create form
      setAudiences(audiences);
      setReady(true)
    }
    init();
  }, [])

  if (!ready) {
    return <>Loading...</>
  }

  if (!audiences.length) {
    return null;
  }

  return (
    <div className="list">
      <CreateAudienceForm></CreateAudienceForm>
      <AudienceTable audiences={audiences} />
    </div>
  )
}