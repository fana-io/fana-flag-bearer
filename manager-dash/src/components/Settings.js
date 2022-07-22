import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';

export const Settings = () => {
  const [sdkKey, setSdkKey] = useState('beta_sdk_0');
  const [copied, setCopied] = useState(false);
  const regenerateKey = async () => {
    const accept = window.confirm('This will invalidate your current SDK key. Are you sure you want to regenerate?');
    // get request to regenerate sdk key, expect the sdk key back
    // const newSdkKey = await apiClient.regenerateSdkKey();
    if (accept) {
      const newSdkKey="new_sdk_key";
      setSdkKey(newSdkKey)
      setCopied(false);
    }
  }

  const copyKeyToClipboard = () => {
    navigator.clipboard.writeText(sdkKey);
    setCopied(true);
  }

  return (
    <Stack container="true" spacing={2}>
      <Typography variant="h4">Settings</Typography>
      <Stack spacing={1}>
        <Typography variant="h6">SDK Key</Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="subtitle1">{sdkKey}</Typography>
          <Button variant={copied ? "text" : "outlined"} onClick={copyKeyToClipboard}>{copied ? 'Copied!' : 'Copy'}</Button>
        </Stack>
        <Button variant="contained" onClick={regenerateKey}>Regenerate SDK Key</Button>
      </Stack>
    </Stack>
  )
}