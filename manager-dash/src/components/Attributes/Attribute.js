import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import apiClient from '../../lib/apiClient';
import { attrTypeMapper } from '../../lib/formConstants';
import { AttributeAudience } from './AttributeAudience';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Box,
  Button,
  Stack,
  List,
  Divider,
  Typography,
  Grid,
} from '@mui/material';

const testAttribute = {
  attribute: 'beta',
  type: 'BOOL',
  createdAt: new Date(),
  audiences: [
    {
      displayName: 'Beta Testers',
      key: 'beta-testers',
      id: 1,
    },
    {
      displayName: 'Millenial Men',
      key: 'millenial-men',
      id: 2,
    },
  ],
};

export const Attribute = () => {
  const attrId = useParams().id;
  const [ready, setReady] = useState(false);
  const [attribute, setAttribute] = useState(testAttribute);

  console.log('attribute:', attribute);

  useEffect(() => setReady(true), [ready]);

  // const fetchAttribute = useCallback(async () => {
  //   const attr = await apiClient.getAttribute(attrId);
  //   setAttribute(attr);
  //   return attr;
  // }, [attrId])

  // useEffect(() => {
  //   const initialize = async () => {
  //     await fetchAttribute();
  //     setReady(true);
  //   }
  //   try {
  //     initialize();
  //   } catch (err) { console.error(err);}
  // }, [fetchAttribute])

  const handleDelete = async () => {
    try {
      const response = await apiClient.deleteAttribute(attrId);
    } catch (err) {
      console.error();
    }
  };

  if (!ready) {
    return <>Loading...</>;
  }

  return (
    <Stack spacing={4}>
      <Grid container>
        {/* <Stack container="true" spacing={3}> */}
        <Grid item xs={12}>
          <Typography variant="h3">Attribute Details</Typography>
        </Grid>

        <Grid item xs={8}>
          <Typography variant="caption">Title</Typography>
          <Typography variant="subtitle1">{attribute.attribute}</Typography>
          <Typography variant="caption">Type</Typography>
          <Typography variant="subtitle1">
            {attrTypeMapper[attribute.type]}
          </Typography>
        </Grid>
        <Grid item justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            color="secondary"
          >
            Delete attribute
          </Button>
        </Grid>
      </Grid>
      {/* Related Audiences */}
      <Stack>
        <Typography variant="h4">Related Audiences</Typography>
        <Typography variant="subtitle2">
          List of audiences that reference this attribute{' '}
        </Typography>
      </Stack>
      <List style={{ width: 350 }}>
        {attribute.audiences.map((aud) => {
          return <AttributeAudience key={aud.id} audience={aud} />;
        })}
      </List>
    </Stack>
  );
};
