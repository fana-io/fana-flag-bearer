import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlags } from '../../features/flags/flags';
import apiClient from '../../lib/ApiClient';
import { CreateFlagForm } from './CreateFlagForm';
import { FlagTable } from './FlagTable';

export const FlagsList = () => {
  const flags = useSelector(state => state.flags);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const [audiences, setAudiences] = useState([])

  useEffect(() => {
    dispatch(fetchFlags(() => setReady(true)));
  }, [dispatch, setReady])

  useEffect(() => {

    ;(async () => {
      let data =  await apiClient.getAudiences()
      console.log('data from fetchAud', data)
      setAudiences(data)
      
    })()
    
  },[])

  if (!ready) {
    return <>Loading...</>
  }

  return (
    <div className="list">
      <CreateFlagForm audiences={audiences}/>
      <FlagTable flags={flags} />
    </div>
  )
}