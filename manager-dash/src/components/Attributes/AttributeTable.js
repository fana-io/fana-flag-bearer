import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { AttributeRow } from "./AttributeRow"

export const AttributeTable = ({ attributes }) => {
  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          <TableCell style={{width: 300}}>Attribute Name</TableCell>
          <TableCell style={{width: 200}}>Attribute Key</TableCell>
          <TableCell style={{width: 200}}>Data Type</TableCell>
          <TableCell>Created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {attributes.map(attribute => {
          return (<AttributeRow key={attribute.key} attribute={attribute} />)
        })}
      </TableBody>
    </TableContainer>
  )
}