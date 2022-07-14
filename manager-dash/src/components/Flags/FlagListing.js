import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { editFlag } from '../../features/flags/flags';

export const FlagListing = ({ flagDetails }) => {
  const dispatch = useDispatch();
  const link = "/flags/" + flagDetails.key;

  const toggleFlagStatus = () => {
    console.log('toggled')
    // using key for now, but may need to use a more unique identifier since key can possibly change??
    dispatch(editFlag({ key: flagDetails.key, updatedFields: { status: !flagDetails.status }}))
  }

  return (
    <div className="listing">
      <h2><Link to={link}>{flagDetails.displayName}</Link></h2>
      <div className="key-and-switch">
        <h3>{flagDetails.key}</h3>
        <label className="switch">
          <input type="checkbox" checked={flagDetails.status} onChange={toggleFlagStatus} />
          <span className="slider round"></span>
        </label>
      </div>
      <ul>
        <li>Enabled: {String(flagDetails.status)}</li>
        <li>Created: {flagDetails.createdAt}</li>
        <li>Last Updated: {flagDetails.updatedAt}</li>
      </ul>
    </div>
  )
}