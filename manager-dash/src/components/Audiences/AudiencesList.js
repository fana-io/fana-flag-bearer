import { audiences } from '../../lib/data';
import { AudienceListing } from './AudienceListing';

export const AudiencesList = () => {
  return (
    <div className="list">
      {audiences.map(audience => {
        return (<AudienceListing key={audience._id} audienceDetails={audience} />)
      })}
    </div>
  )
}