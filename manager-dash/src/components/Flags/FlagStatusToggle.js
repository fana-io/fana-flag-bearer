import { Switch } from "@mui/material";
import apiClient from "../../lib/apiClient";
import { generalErrorMessage } from "../../lib/messages";

export const FlagStatusToggle = ({ flag, refreshFlags, successStateSetter }) => {
  const toggleFlagStatus = async () => {
    try {
      await apiClient.toggleFlag(flag.id, { status: !flag.status })
      refreshFlags();
      successStateSetter(true);
    } catch(e) {
      alert(generalErrorMessage)
    }
  }

  return (
    <Switch checked={flag.status} onChange={toggleFlagStatus} />
  )
}