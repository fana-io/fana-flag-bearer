import { AudienceRow } from "./AudienceRow"

export const AudienceTable = ({ audiences }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Audience Name</th>
          <th>Audience Key</th>
          <th>Created</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {audiences.map(audience => {
          return (<AudienceRow key={audience.key} audience={audience} />)
        })}
      </tbody>
    </table>
  )
}