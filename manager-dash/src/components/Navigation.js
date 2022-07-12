import { Link } from "react-router-dom"

export const Navigation = () => {
  return (
    <ul id="nav">
      <li><Link to="/">Flags</Link></li>
      <li><Link to="/audiences">Audiences</Link></li>
      <li><Link to="/attributes">Attributes</Link></li>
    </ul>
  )
}