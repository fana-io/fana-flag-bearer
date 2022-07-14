import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchFlags } from "../../features/flags/flags";
import { FlagAudience } from "./FlagAudience"
import { FlagStatusToggle } from "./FlagStatusToggle";

export const Flag = () => {
  const flagKey = useParams().key;
  const flags = useSelector(state => state.flags);
  const dispatch = useDispatch();

  if (!flags.length) {
    dispatch(fetchFlags());
    return null;
  }

  const flag = flags.find(flag => flag.key === flagKey);

  return (
    <div>
      <h1>Flag Details</h1>
      <h2>Name: {flag.displayName}</h2>
      <h3>Key: {flag.key}</h3>
      <FlagStatusToggle flag={flag} />
      <h2>Targeted Audiences:</h2>
      <ul>
        {flag.audiences.map(audience => {
          // keeps giving me a warning about not using a key here?
          return (<FlagAudience key={audience.key} audience={audience} />)
        })}
      </ul>
    </div>
  )
}