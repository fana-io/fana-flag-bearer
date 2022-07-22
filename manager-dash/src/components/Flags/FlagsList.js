import { useEffect, useState } from 'react';
import apiClient from '../../lib/apiClient';
import { CreateFlagModal } from './CreateFlagModal';
import { FlagTable } from './FlagTable';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const FlagsList = () => {
  const [ready, setReady] = useState(false);
  const [flags, setFlags] = useState([]);
  const [displayedFlags, setDisplayedFlags] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [enabledOnly, setEnabledOnly] = useState(false);

  const fetchFlags = async () => {
    const f = await apiClient.getFlags();
    setFlags(f);
    setDisplayedFlags(f);
  }

  useEffect(() => {
      fetchFlags();
      setReady(true)
  }, [])

  useEffect(() => {
    const lcSearchText = searchText.toLowerCase();
    const filteredFlags = flags.filter(f => {
      if (enabledOnly && !f.status) {
        return false;
      }
      return (f.displayName.toLowerCase().includes(lcSearchText) || f.key.toLowerCase().includes(lcSearchText))
    })
    setDisplayedFlags(filteredFlags);
  }, [searchText, flags, enabledOnly])

  if (!ready) {
    return <>Loading...</>
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Flags</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-basic"
          label="Search flags"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel control={
          <Checkbox checked={enabledOnly} onChange={() => setEnabledOnly(!enabledOnly)} />
        } label="Show Enabled Only" />
      </Grid>
      <Grid item container xs={3} direction="column" alignItems="flex-end" justify="flex-end">
        <Button variant="outlined" onClick={() => setFormOpen(true)}>Create flag</Button>
      </Grid>
      {formOpen && (<CreateFlagModal isOpen={formOpen} setFormOpen={setFormOpen} refreshFlags={fetchFlags} />)}
      <FlagTable flags={displayedFlags} refreshFlags={fetchFlags} />
    </Grid>
  )
}