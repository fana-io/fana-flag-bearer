import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"
import apiClient from "../../lib/apiClient";
import { FlagAudience } from "./FlagAudience"
import { FlagStatusToggle } from "./FlagStatusToggle";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { AddAudienceToFlag } from "./AddAudienceToFlag";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import _ from 'lodash';

export const Flag = () => {
  const flagId = useParams().id;
  const [ready, setReady] = useState(false);
  const [flag, setFlag] = useState();
  const [temporaryAudiences, setTemporaryAudiences] = useState([]);
  const [allAudiences, setAllAudiences] = useState([]);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [temporaryDisplayName, setTemporaryDisplayName] = useState([]);

  console.log(temporaryAudiences);
  const removeAudience = (audienceKey) => {
    const updatedAudiences = temporaryAudiences.filter(a => {
      if (a.key === audienceKey) {
        return false;
      }

      return true;
    })

    setTemporaryAudiences(updatedAudiences);
  }

  const addAudience = (audienceKey) => {
    const addedAudience = allAudiences.find(a => a.key === audienceKey)
    const updatedAudiences = temporaryAudiences.concat(addedAudience);
    console.log('updated audiences', updatedAudiences)
    setTemporaryAudiences(updatedAudiences);
  }

  const submitAudienceEdit = async () => {
    // api patch request with temporary fields
    // hardcoding status: false bc go will determine that it is a zero value, and won't update it
    // this patch is only for updating audiences, so that's okay
    const patchedFlag = {
      displayName: flag.displayName,
      audiences: temporaryAudiences.map(a => a.key)
    }

    console.log('sent this to manager:', patchedFlag)
    await apiClient.editFlag(flag.id, patchedFlag)
  }

  const submitDisplayNameEdit = async () => {
    const patchedFlag = {
      displayName: temporaryDisplayName,
      audiences: flag.audiences
    }

    await apiClient.editFlag(flag.id, patchedFlag)
  }

  const fetchFlag = useCallback(async () => {
    const f = await apiClient.getFlag(flagId);
    setFlag(f);
    return f;
  }, [flagId])

  const fetchAudiences = async () => {
    const a = await apiClient.getAudiences();
    setAllAudiences(a);
  }

  useEffect(() => {
    const initialize = async () => {
      const newFlag = await fetchFlag();
      setTemporaryAudiences(newFlag.audiences);
      setTemporaryDisplayName(newFlag.displayName);
      fetchAudiences();
      setReady(true);
    }
    initialize();
  }, [fetchFlag])

  useEffect(() => {
    // when temporaryAudiences changes, see if it matches the actual audiences
    if (ready) {
      const tempKeys = temporaryAudiences.map(a => a.key);
      const appliedKeys = flag.audiences.map(a => a.key)
      if (!_.isEqual(tempKeys, appliedKeys)) {
        setPendingChanges(true);
      } else {
        setPendingChanges(false);
      }
    }
  }, [temporaryAudiences, ready, flag?.audiences])

  if (!ready) {
    return <>Loading...</>
  }
  return (
    <Box container="true" spacing={1} sx={{
      marginLeft: 8,
      maxWidth: 1000
    }}>
      <Stack container="true" spacing={2}>
        <Typography variant="h3">Flag Details</Typography>
        <Stack>
          <Typography variant="caption">Title</Typography>
          <Typography variant="subtitle1">{flag.displayName}</Typography>
        </Stack>
        <Stack>
          <Typography variant="caption">Key</Typography>
          <Typography variant="subtitle1">{flag.key}</Typography>
        </Stack>
        <Stack>
          <InputLabel id="flag-toggle-label">Enabled</InputLabel>
          <FlagStatusToggle flag={flag} labelId="flag-toggle-label" refreshFlags={fetchFlag} />
        </Stack>
        <Typography variant="h4">Targeted Audiences</Typography>
        <Stack
          container="true"
          divider={<Divider orientation="vertical" flexItem />} 
          spacing={10}
          direction="row"
        >
          <Stack>
            <List style={{ width: 350 }}>
              {temporaryAudiences.map(audience => {
                return (<FlagAudience key={audience.key} audience={audience} removeAudience={removeAudience} />)
              })}
            </List>
            <Button disabled={!pendingChanges} variant="outlined" onClick={submitAudienceEdit}>Save Audiences</Button>
          </Stack>
          <AddAudienceToFlag allAudiences={allAudiences} addAudience={addAudience} currentAppliedAudiences={temporaryAudiences} />
        </Stack>
      </Stack>
    </Box>
  )
}