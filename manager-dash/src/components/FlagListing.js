import moment from 'moment';

export const FlagListing = ({ flagDetails }) => {
  return (
    <div className="listing">
      <h2>{flagDetails.displayName}</h2>
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