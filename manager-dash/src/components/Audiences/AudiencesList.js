import { AudienceListing } from './AudienceListing';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAudiences } from '../../features/audiences/audiences';

export const AudiencesList = () => {
  const audiences = useSelector(state => state.audiences);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAudiences());
  }, [dispatch])
  
  return (
    <div className="list">
      {audiences.map(audience => {
        return (<AudienceListing key={audience._id} audienceDetails={audience} />)
      })}
    </div>
  )
}