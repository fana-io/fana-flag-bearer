import { Link } from "react-router-dom";
import moment from "moment";
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell";

export const AttributeRow = ({ attribute }) => {
  const link = "/attributes/" + attribute.id;
  return (
    <TableRow>
      <TableCell><Link to={link}>{attribute.key}</Link></TableCell>
      <TableCell>{attribute.type}</TableCell>
      <TableCell>{moment(attribute.CreatedAt).format("MMM Do YY")}</TableCell>
    </TableRow>
  )
}