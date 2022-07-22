import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import moment from "moment";
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell";
import { attrTypeMapper } from '../../lib/formConstants';

export const AttributeRow = ({ attribute }) => {
  const link = "/attributes/" + attribute.id;
  return (
    <TableRow>
      <TableCell><Link underline="hover">
      <RouterLink to={link}>{attribute.key}</RouterLink>
      </Link >
      </TableCell>
      <TableCell>{attrTypeMapper[attribute.type]}</TableCell>
      <TableCell>{moment(attribute.CreatedAt).format("MMM Do YY")}</TableCell>
    </TableRow>
  )
}