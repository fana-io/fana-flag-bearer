import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { FlagAudience } from "./FlagAudience"
import { FlagStatusToggle } from "./FlagStatusToggle";

export const Flag = () => {
  const flagId = useParams().id;

  useEffect(() => {
    // fetch single flag based on id
    // get all audiences to pass down to edit form
  }, [])

  return null;
  // return (
  //   <div>
  //     <h1>Flag Details</h1>
  //     <h2>Name: {flag.displayName}</h2>
  //     <h3>Key: {flag.key}</h3>
  //     <FlagStatusToggle flag={flag} />
  //     <h2>Targeted Audiences:</h2>
  //     <ul>
  //       {flag.audiences.map(audience => {
  //         // keeps giving me a warning about not using a key here?
  //         return (<FlagAudience key={audience.key} audience={audience} />)
  //       })}
  //     </ul>
  //   </div>
  // )
}