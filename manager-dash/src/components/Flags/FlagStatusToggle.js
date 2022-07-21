import { Switch } from "@mui/material";
import ApiClient from "../../lib/ApiClient";

export const FlagStatusToggle = ({ flag }) => {
  const toggleFlagStatus = async () => {
    console.log('flag status toggled')
    // await ApiClient.editFlag(flag.id, { status: !flag.status })
  }

  return (
    <Switch checked={flag.status} onChange={toggleFlagStatus} />
  )
}