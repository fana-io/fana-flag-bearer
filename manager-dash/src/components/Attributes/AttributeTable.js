import { AttributeRow } from "./AttributeRow"

export const AttributeTable = ({ attributes }) => {
  if (!attributes.length) {
    return (<>Loading...</>)
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Attribute Name</th>
          <th>Attribute Key</th>
          <th>Created</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {attributes.map(attribute => {
          return (<AttributeRow key={attribute.key} attribute={attribute} />)
        })}
      </tbody>
    </table>
  )
}