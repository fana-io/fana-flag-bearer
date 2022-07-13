import moment from 'moment';
import { Link } from 'react-router-dom';

export const FlagListing = ({ flagDetails }) => {
  const link = "/flags/" + flagDetails.key;
  return (
    <div className="listing">
      <h2><Link to={link}>{flagDetails.displayName}</Link></h2>
      <h3>{flagDetails.key}</h3>
      <label class="switch">
        <input type="checkbox" checked={flagDetails.status} />
        <span class="slider round"></span>
      </label>
      <ul>
        <li>Enabled: {String(flagDetails.status)}</li>
        <li>Created: {moment(flagDetails.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</li>
        <li>Last Updated: {moment(flagDetails.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</li>
      </ul>
    </div>
  )
}