import { useParams } from "react-router-dom"
import { audiences } from "../../lib/data";
import { AudienceCondition } from "./AudienceCondition";

export const Audience = () => {
  const audienceKey = useParams().key;

  const audienceDetails = audiences.find(audience => audience.key === audienceKey);
  // since audience specifics don't live in the flag, we'll probably need to pull audience data and map it appropriately
  // this probably means we'll have to use redux since passing audience information everywhere doesn't seem great
  return (
    <div>
      <h1>Audience Details</h1>
      <h2>Name: {audienceDetails.displayName}</h2>
      <h3>Key: {audienceDetails.key}</h3>
      <h2>Conditions:</h2>
      <ul>
        {audienceDetails.conditions.map(condition => {
          return (<li><AudienceCondition condition={condition} /></li>)
        })}
      </ul>
    </div>
  )
}