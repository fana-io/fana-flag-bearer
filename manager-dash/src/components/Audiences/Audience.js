import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { AudienceCondition } from "./AudienceCondition";

export const Audience = () => {
  const audienceId = useParams().id;

  useEffect(() => {
    // fetch single audience based on id
    // get all attributes for edit form
  })

  return null; 
  // return (
  //   <div>
  //     <h1>Audience Details</h1>
  //     <h2>Name: {audienceDetails.displayName}</h2>
  //     <h3>Key: {audienceDetails.key}</h3>
  //     <h2>Conditions:</h2>
  //     <ul>
  //       {audienceDetails.conditions.map(condition => {
  //         return (<AudienceCondition condition={condition} />)
  //       })}
  //     </ul>
  //   </div>
  // )
}