import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import apiClient from '../lib/apiClient';
import { initializationErrorMessage } from '../lib/messages';

export const Settings = () => {
  const [sdkKey, setSdkKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchSdkKey = async () => {
      try {
        const keys = await apiClient.getSdkKey();
        setSdkKey(keys[0].key);
        setReady(true);
      } catch (e) {
        alert(initializationErrorMessage)
      }
    }
    fetchSdkKey()
  }, [])

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

  if (!ready) {
    return <>Loading...</>
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