import moment from "moment";

export const AttributeRow = ({ attribute }) => {
  return (
    <tr>
      <td>{attribute.displayName}</td>
      <td>{attribute.key}</td>
      <td>{moment(attribute.createdAt).format("MMM Do YY")}</td>
      <td>{moment(attribute.updatedAt).format("MMM Do YY")}</td>
    </tr>
  )
}