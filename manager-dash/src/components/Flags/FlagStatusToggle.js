import { Switch } from "@mui/material";
import apiClient from "../../lib/apiClient";

export const FlagStatusToggle = ({ flag, refreshFlags }) => {
  const toggleFlagStatus = async () => {
    try {
      await apiClient.toggleFlag(flag.id, { status: !flag.status })
      refreshFlags();
    } catch(e) {
      alert('Something went wrong. Please try again later')
    }
  }

  return (
    <Switch checked={flag.status} onChange={toggleFlagStatus} />
  )
}