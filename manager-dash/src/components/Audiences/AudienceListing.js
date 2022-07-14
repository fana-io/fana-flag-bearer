import { Link } from 'react-router-dom';

export const AudienceListing = ({ audienceDetails }) => {
  const link = '/audiences/' + audienceDetails.key;
  return (
    <div className="listing">
      <h2><Link to={link}>{audienceDetails.displayName}</Link></h2>
      <h3>{audienceDetails.key}</h3>
      <ul>
        <li>Created: {audienceDetails.createdAt}</li>
        <li>Last Updated: {audienceDetails.updatedAt}</li>
      </ul>
    </div>
  )
}