import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchFlags } from "../../features/flags/flags";
import { FlagAudience } from "./FlagAudience"

export const Flag = () => {
  const flagKey = useParams().key;
  const flags = useSelector(state => state.flags);
  const flagDetails = flags.find(flag => flag.key === flagKey);
  const dispatch = useDispatch();

  if (!flags.length) {
    dispatch(fetchFlags());
    return null;
  }
  
  return (
    <div>
      <h1>Flag Details</h1>
      <h2>Name: {flagDetails.displayName}</h2>
      <h3>Key: {flagDetails.key}</h3>
      <p>Enabled: {String(flagDetails.status)}</p>
      <h2>Targeted Audiences:</h2>
      <ul>
        {flagDetails.audiences.map(audience => {
          // keeps giving me a warning about not using a key here?
          return (<FlagAudience key={audience.key} audience={audience} />)
        })}
      </ul>
    </div>
  )
}