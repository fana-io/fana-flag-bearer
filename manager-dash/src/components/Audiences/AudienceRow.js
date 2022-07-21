import { Link } from "react-router-dom"
import moment from "moment";
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell";

export const AudienceRow = ({ audience }) => {
  const link = "/audiences/" + audience.ID;
  return (
    <TableRow>
      <TableCell><Link to={link}>{audience.displayName}</Link></TableCell>
      <TableCell>{audience.key}</TableCell>
      <TableCell>{moment(audience.CreatedAt).format("MMM Do YY")}</TableCell>
      <TableCell>{moment(audience.UpdatedAt).format("MMM Do YY")}</TableCell>
    </TableRow>
  )
}