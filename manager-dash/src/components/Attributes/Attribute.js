import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import apiClient from '../../lib/apiClient';
import { attrTypeMapper } from '../../lib/formConstants';
import { AttributeAudience } from './AttributeAudience';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletedEntityMessageCreator, generalErrorMessage } from '../../lib/messages';
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
  const history = useHistory();

  useEffect(() => setReady(true), [ready]);

  const fetchAttribute = useCallback(async () => {
    const a = await apiClient.getAttribute(attrId);
    setAttribute(a);
    return a;
  }, [attrId]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const a = await fetchAttribute(attrId);
        setReady(true);
      } catch (e) {
        alert(initializationErrorMessage)
      }
    }
    // uncomment this once the endpoint is ready
    // initialize();
  }, [fetchAttribute, attrId])

  // i wrote this bit for the Audience page, so i figured i might as well put it here too! sorry, don't mean to step on toes -j
  const handleDelete = async () => {
    const audienceCount = attribute.audiences.length;
    if (audienceCount > 0) {
      alert(`This attribute is being used in ${audienceCount} audience${audienceCount > 1 ? 's' : ''}. Please remove before deleting.`)
    } else {
      if (window.confirm('Are you sure you want to delete this attribute?')) {
        try {
          await apiClient.deleteAudience(attribute.id);
          history.push("/attributes")
          alert(deletedEntityMessageCreator('attribute', attribute.key))
        } catch (e) {
          alert(generalErrorMessage);
        }
      }
    }
  }

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
