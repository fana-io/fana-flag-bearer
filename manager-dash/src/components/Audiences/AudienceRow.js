import { Link } from "react-router-dom"
import moment from "moment";

export const AudienceRow = ({ audience }) => {
  const link = "/audiences/" + audience.key;
  return (
    <tr>
      <td><Link to={link}>{audience.displayName}</Link></td>
      <td>{audience.key}</td>
      <td>{moment(audience.createdAt).format("MMM Do YY")}</td>
      <td>{moment(audience.updatedAt).format("MMM Do YY")}</td>
    </tr>
  )
}