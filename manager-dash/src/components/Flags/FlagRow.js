import { Link } from "react-router-dom"
import moment from "moment";
import { FlagStatusToggle } from "./FlagStatusToggle";

export const FlagRow = ({ flag }) => {
  const link = "/flags/" + flag.key;

  return (
    <tr>
      <td><Link to={link}>{flag.displayName}</Link></td>
      <td>{flag.key}</td>
      <td>
        <FlagStatusToggle flag={flag} />
      </td>
      <td>{moment(flag.createdAt).format("MMM Do YY")}</td>
      <td>{moment(flag.updatedAt).format("MMM Do YY")}</td>
    </tr>
  )
}