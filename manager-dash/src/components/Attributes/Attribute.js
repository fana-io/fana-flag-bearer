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
import { initializationErrorMessage } from '../../lib/messages';

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

  useEffect(() => setReady(true), [ready]);

  const fetchAttribute = useCallback(async () => {
    const a = await apiClient.getAttribute(attrId);
    setAttribute(a);
    return a;
  }, [attrId]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const a = await fetchAttribute();
        setReady(true);
      } catch (e) {
        alert(initializationErrorMessage)
      }
    }
    // uncomment this once the endpoint is ready
    // initialize();
  }, [fetchAttribute])

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
    // <Box
    //   container="true"
    //   spacing={2}
    //   sx={{
    //     marginLeft: 8,
    //     maxWidth: 1000,
    //   }}
    // >
    <Grid container>
      <Stack container="true" spacing={3}>
        <Typography variant="h3">Attribute Details</Typography>

        <Grid item xs={10}>
          <Stack>
            <Typography variant="caption">Title</Typography>
            <Typography variant="subtitle1">{attribute.attribute}</Typography>
          </Stack>
          <Stack>
            <Typography variant="caption">Type</Typography>
            <Typography variant="subtitle1">
              {attrTypeMapper[attribute.type]}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={2}
          direction="column"
          alignItems="flex-end"
          justify="flex-end"
          container
        >
          <Button
            variant="outlined"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            color="secondary"
          >
            Delete attribute
          </Button>
        </Grid>

        {/* Related Audiences */}
        <Stack container="true">
          <Typography variant="h4">Related Audiences</Typography>
          <Typography variant="subtitle2">
            List of audiences that reference this attribute
          </Typography>
        </Stack>
        <Stack
          container="true"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={10}
          direction="row"
        >
          <Stack>
            <List style={{ width: 350 }}>
              {attribute.audiences.map((aud) => {
                return <AttributeAudience key={aud.id} audience={aud} />;
              })}
            </List>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
    // </Box>
  );
};
