import { FlagRow } from "./FlagRow"

export const FlagTable = ({ flags }) => {
  if (!flags.length) {
    return (<>Loading...</>)
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Flag Name</th>
          <th>Flag Key</th>
          <th>Enabled</th>
          <th>Created</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {flags.map(flag => {
          return (<FlagRow key={flag.key} flag={flag} />)
        })}
      </tbody>
    </table>
  )
}