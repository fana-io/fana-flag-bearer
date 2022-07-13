import { useParams } from "react-router"
import { FlagAudience } from "./FlagAudience"
import { flags } from "../lib/data";

export const Flag = () => {
  const flagKey = useParams().key;

  const flagDetails = flags.find(flag => flag.key === flagKey);
  // since audience specifics don't live in the flag, we'll probably need to pull audience data and map it appropriately
  // this probably means we'll have to use redux since passing audience information everywhere doesn't seem great
  return (
    <div>
      <h1>Flag Details</h1>
      <h2>Name: {flagDetails.displayName}</h2>
      <h3>Key: {flagDetails.key}</h3>
      <h2>Targeted Audiences:</h2>
      <ul>
        {flagDetails.audiences.map(audience => {
          return (<li><FlagAudience audience={audience} /></li>)
        })}
      </ul>
    </div>
  )
}