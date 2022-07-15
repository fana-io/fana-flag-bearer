import { useState } from "react"
import ApiClient from "../../lib/ApiClient";

export const FlagStatusToggle = ({ flag }) => {
  const [pendingToggle, setPendingToggle] = useState(false);

  const toggleFlagStatus = async () => {
    setPendingToggle(true)
    await ApiClient.editFlag(flag.id, { status: !flag.status })
    setPendingToggle(false);
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={flag.status} disabled={pendingToggle} onChange={toggleFlagStatus} />
      <span className="slider round"></span>
    </label>
  )
}