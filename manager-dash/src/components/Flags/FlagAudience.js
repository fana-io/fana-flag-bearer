import { Link } from "react-router-dom"
import { Condition } from "../Conditions/Condition";

export const FlagAudience = ({ audience }) => {
  const link = "/audiences/" + audience.key;
  return (
    <li>
      <Link to={link}><h4>{audience.displayName}</h4></Link>
      <ul>
        {audience.conditions.map(condition => {
          return (<Condition key={condition.attribute.key} condition={condition} />)
        })}
      </ul>
    </li>
  )
}