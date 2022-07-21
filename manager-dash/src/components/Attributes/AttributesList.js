import { useEffect, useState } from 'react';
import { CreateAttributeModal } from "./CreateAttributeModal"
import { AttributeTable } from './AttributeTable';
import apiClient from '../../lib/ApiClient';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const AttributesList = () => {
  const [ready, setReady] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [displayedAttributes, setDisplayedAttributes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const attributes = await apiClient.getAttributes();
      setAttributes(attributes);
      setReady(true)
    }
    init();
  }, [])

  useEffect(() => {
    const lcSearchText = searchText.toLowerCase();
    const filteredAttributes = attributes.filter(a => {
      return (a.displayName.toLowerCase().includes(lcSearchText) || a.key.toLowerCase().includes(lcSearchText))
    })
    setDisplayedAttributes(filteredAttributes);
  }, [searchText, attributes])

  if (!ready) {
    return <>Loading...</>
  }

  return (
    <Grid container spacing={2} sx={{
      marginLeft: 8,
      maxWidth: 1000
    }}>
      <Grid item xs={12}>
        <Typography variant="h3">Attributes</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          id="outlined-basic"
          label="Search attributes"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Grid>
      <Grid item container xs={3} direction="column" alignItems="flex-end" justify="flex-end">
        <Button variant="outlined" onClick={() => setFormOpen(true)}>Create attribute</Button>
      </Grid>
      <CreateAttributeModal isOpen={formOpen} setFormOpen={setFormOpen} />
      <AttributeTable attributes={displayedAttributes} />
    </Grid>
  );
};