import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import apiClient from '../../lib/apiClient';
import { attrTypeMapper } from '../../lib/formConstants';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  deletedEntityMessageCreator,
  generalErrorMessage,
} from '../../lib/messages';
import { Button, Stack, List, Typography, Grid } from '@mui/material';
import { initializationErrorMessage } from '../../lib/messages';
import { EntityNotFoundPage } from '../EntityNotFoundPage';
import { RelatedEntityList } from '../Shared/RelatedEntityList';

export const Attribute = () => {
  const attrId = useParams().id;
  const [ready, setReady] = useState(false);
  const [attribute, setAttribute] = useState();
  const [loadError, setLoadError] = useState(false);

  const history = useHistory();

  const fetchAttribute = useCallback(async () => {
    const attr = await apiClient.getAttribute(attrId);
    setAttribute(attr);
    return attr;
  }, [attrId]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await fetchAttribute(attrId);
        setReady(true);
      } catch (e) {
        if (e.response.status === 404) {
          setLoadError(true);
        } else {
          alert(initializationErrorMessage);
        }
      }
    };
    initialize();
  }, [fetchAttribute, attrId]);

  const handleDelete = async () => {
    const audienceCount = attribute.audiences.length;
    if (audienceCount > 0) {
      alert(
        `This attribute is being used in ${audienceCount} audience${
          audienceCount > 1 ? 's' : ''
        }. Please remove before deleting.`
      );
    } else {
      if (window.confirm('Are you sure you want to delete this attribute?')) {
        try {
          await apiClient.deleteAudience(attribute.id);
          history.push('/attributes');
          alert(deletedEntityMessageCreator('attribute', attribute.key));
        } catch (e) {
          alert(generalErrorMessage);
        }
      }
    }
  };

  if (loadError) {
    return <EntityNotFoundPage />;
  }

  if (!ready) {
    return <>Loading...</>;
  }

  return (
    <Stack spacing={4}>
      <Grid container>
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
        {attribute.audiences.map((aud) => (
          <RelatedEntityList
            key={aud.id}
            entity={aud}
            entityName={'audiences'}
          />
        ))}
      </List>
    </Stack>
  );
};
