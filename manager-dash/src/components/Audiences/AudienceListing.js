import moment from 'moment';
import { Link } from 'react-router-dom';

export const AudienceListing = ({ audienceDetails }) => {
  const link = '/audiences/' + audienceDetails.key;
  return (
    <div className="listing">
      <h2><Link to={link}>{audienceDetails.displayName}</Link></h2>
      <h3>{audienceDetails.key}</h3>
      <ul>
        <li>Created: {moment(audienceDetails.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</li>
        <li>Last Updated: {moment(audienceDetails.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</li>
      </ul>
    </div>
  )
}