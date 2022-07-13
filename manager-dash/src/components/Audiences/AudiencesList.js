import { AudienceListing } from './AudienceListing';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAudiences } from '../../features/audiences/audiences';
import { CreateAudienceForm } from './CreateAudienceForm';

export const AudiencesList = () => {
  const audiences = useSelector(state => state.audiences);
  const dispatch = useDispatch();

  useEffect(() => {
    return (
      console.log('audiences unmounting')
    )
  }, [])
  useEffect(() => {
    dispatch(fetchAudiences());
  }, [dispatch])

  return (
    <>
    <CreateAudienceForm></CreateAudienceForm>
    <div className="list">
      {audiences.map(audience => {
        return (<AudienceListing key={audience._id} audienceDetails={audience} />)
      })}
    </div>
      </>
  )
}