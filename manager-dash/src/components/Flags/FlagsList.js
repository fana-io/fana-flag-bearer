import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlags } from '../../features/flags/flags';
import { CreateFlagForm } from './CreateFlagForm';
import { FlagListing } from './FlagListing';

export const FlagsList = () => {
  const flags = useSelector(state => state.flags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlags());
  }, [dispatch])

  return (
    <>
    <CreateFlagForm></CreateFlagForm>
    <div className="list">
      {flags.map(flag => {
        return (<FlagListing key={flag._id} flagDetails={flag} />)
      })}
    </div>
      </>
  )
}