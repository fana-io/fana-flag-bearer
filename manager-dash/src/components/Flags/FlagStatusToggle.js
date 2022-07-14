import { useState } from "react"
import { useDispatch } from "react-redux";
import { editFlag } from "../../features/flags/flags";

export const FlagStatusToggle = ({ flag }) => {
  const [pendingToggle, setPendingToggle] = useState(false);
  const dispatch = useDispatch();

  const toggleFlagStatus = () => {
    setPendingToggle(true)
    // using key for now, but may need to use a more unique identifier since key can possibly change??
    dispatch(editFlag({ key: flag.key, updatedFields: { status: !flag.status }, callback: () => setPendingToggle(false)}))
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={flag.status} disabled={pendingToggle} onChange={toggleFlagStatus} />
      <span className="slider round"></span>
    </label>
  )
}