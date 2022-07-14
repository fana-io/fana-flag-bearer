import { AudienceTable } from './AudienceTable';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAudiences } from '../../features/audiences/audiences';
import { CreateAudienceForm } from './CreateAudienceForm';

export const AudiencesList = () => {
  const audiences = useSelector(state => state.audiences);
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(fetchAudiences(() => setReady(true)));
  }, [dispatch])

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