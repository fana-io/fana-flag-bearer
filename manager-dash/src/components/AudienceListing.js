import moment from 'moment';

export const AudienceListing = ({ audienceDetails }) => {
  return (
    <div className="listing">
      <h2>{audienceDetails.displayName}</h2>
      <h3>{audienceDetails.key}</h3>
      <ul>
        <li>Created: {moment(audienceDetails.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</li>
        <li>Last Updated: {moment(audienceDetails.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</li>
      </ul>
    </div>
  )
}