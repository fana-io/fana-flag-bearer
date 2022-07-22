import { useEffect, useState } from 'react';
import { CreateAttributeModal } from "./CreateAttributeModal"
import { AttributeTable } from './AttributeTable';
import apiClient from '../../lib/apiClient';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { initializationErrorMessage } from '../../lib/messages';

export const AttributesList = () => {
  const [ready, setReady] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [displayedAttributes, setDisplayedAttributes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const fetchAttributes = async () => {
    const a = await apiClient.getAttributes();
    setAttributes(a);
    return a;
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const a = await fetchAttributes();
        setDisplayedAttributes(a);
        setReady(true)
      } catch (e) {
        alert(initializationErrorMessage)
      }
    }
    initialize();
  }, [])

  useEffect(() => {
    const lcSearchText = searchText.toLowerCase();
    const filteredAttributes = attributes.filter(a => {
      return (a.attrType.toLowerCase().includes(lcSearchText) || a.key.toLowerCase().includes(lcSearchText))
    })
    setDisplayedAttributes(filteredAttributes);
  }, [searchText, attributes])

  if (!ready) {
    return <>Loading...</>
  }

  return (
    <Grid container spacing={2}>
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
      {formOpen && (<CreateAttributeModal isOpen={formOpen} setFormOpen={setFormOpen} refreshAtts={fetchAttributes} />)}
      <AttributeTable attributes={displayedAttributes} />
    </Grid>
  );
};