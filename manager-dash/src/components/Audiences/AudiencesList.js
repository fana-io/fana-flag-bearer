import { AudienceTable } from './AudienceTable';
import { useEffect, useState } from 'react';
import apiClient from '../../lib/apiClient';
import { CreateAudienceModal } from './CreateAudienceModal';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { initializationErrorMessage } from '../../lib/messages';

export const AudiencesList = () => {
  const [ready, setReady] = useState(false);
  const [audiences, setAudiences] = useState([]);
  const [displayedAudiences, setDisplayedAudiences] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const fetchAudiences = async () => {
    const a = await apiClient.getAudiences();
    setAudiences(a);
    return a;
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const a = await fetchAudiences();
        setDisplayedAudiences(a);
        setReady(true)
      } catch (e) {
        alert(initializationErrorMessage)
      }
    }

    initialize();
  }, [])

  useEffect(() => {
    const lcSearchText = searchText.toLowerCase();
    const filteredAudiences = audiences.filter(a => {
      return (a.displayName.toLowerCase().includes(lcSearchText) || a.key.toLowerCase().includes(lcSearchText))
    })
    setDisplayedAudiences(filteredAudiences);
  }, [searchText, audiences])

  if (!ready) {
    return <>Loading...</>
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Audiences</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          id="outlined-basic"
          label="Search audiences"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Grid>
      <Grid item container xs={3} direction="column" alignItems="flex-end" justify="flex-end">
        <Button variant="outlined" onClick={() => setFormOpen(true)}>Create audience</Button>
      </Grid>
      {formOpen && (<CreateAudienceModal isOpen={formOpen} setFormOpen={setFormOpen} refreshAudiences={fetchAudiences} />)}
      <AudienceTable audiences={displayedAudiences} />
    </Grid>
  )
}

