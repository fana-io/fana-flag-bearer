import { Switch } from "@mui/material";
import apiClient from "../../lib/apiClient";
import { generalErrorMessage } from "../../lib/messages";

export const FlagStatusToggle = ({ flag, refreshFlags }) => {
  const toggleFlagStatus = async () => {
    try {
      await apiClient.toggleFlag(flag.id, { status: !flag.status })
      refreshFlags();
    } catch(e) {
      alert(generalErrorMessage)
    }
  }

  return (
    <Switch checked={flag.status} onChange={toggleFlagStatus} />
  )
}