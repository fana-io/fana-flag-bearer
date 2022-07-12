import { flags } from '../lib/data';
import { FlagListing } from './FlagListing';

export const FlagsList = () => {
  return (
    <div className="list">
      {flags.map(flag => {
        return (<FlagListing key={flag._id} flagDetails={flag} />)
      })}
    </div>
  )
}