import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlags } from '../../features/flags/flags';
import { CreateFlagForm } from './CreateFlagForm';
import { FlagTable } from './FlagTable';

export const FlagsList = () => {
  const flags = useSelector(state => state.flags);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlags(() => setReady(true)));
  }, [dispatch, setReady])

  if (!ready) {
    return <>Loading...</>
  }

  return (
    <div className="list">
      <CreateFlagForm></CreateFlagForm>
      <FlagTable flags={flags} />
    </div>
  )
}