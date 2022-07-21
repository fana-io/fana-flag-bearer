import { Link } from "react-router-dom"
import moment from "moment";
import { FlagStatusToggle } from "./FlagStatusToggle";
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell";

export const FlagRow = ({ flag }) => {
  const link = "/flags/" + flag.ID;
  console.log(flag);

  return (
    <TableRow>
      <TableCell><Link to={link}>{flag.displayName}</Link></TableCell>
      <TableCell>{flag.key}</TableCell>
      <TableCell>
        <FlagStatusToggle flag={flag} />
      </TableCell>
      <TableCell>{moment(flag.CreatedAt).format("MMM Do YY")}</TableCell>
      <TableCell>{moment(flag.UpdatedAt).format("MMM Do YY")}</TableCell>
    </TableRow>
  )
}