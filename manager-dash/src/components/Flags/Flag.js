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
import TextField from "@mui/material/TextField";
import _ from 'lodash';
import { generalErrorMessage, initializationErrorMessage } from "../../lib/messages";

export const Flag = () => {
  const flagId = useParams().id;
  const [ready, setReady] = useState(false);
  const [flag, setFlag] = useState();
  const [temporaryAudiences, setTemporaryAudiences] = useState([]);
  const [allAudiences, setAllAudiences] = useState([]);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [temporaryDisplayName, setTemporaryDisplayName] = useState([]);
  const [editingDisplayName, setEditingDisplayName] = useState(false);

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
    const patchedFlag = {
      audiences: temporaryAudiences.map(a => a.key)
    }

    try {
      await apiClient.editFlag(flag.id, patchedFlag)
      let f = await fetchFlag();
      setTemporaryAudiences(f.audiences);
    } catch (e) {
      alert(generalErrorMessage)
    }
  }

  const submitDisplayNameEdit = async () => {
    const patchedFlag = {
      displayName: temporaryDisplayName,
    }

    try {
      await apiClient.editFlag(flag.id, patchedFlag);
      fetchFlag();
      setEditingDisplayName(false);
    } catch(e) {
      alert(generalErrorMessage)
    }
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
      try {
        const f = await fetchFlag();
        setTemporaryAudiences(f.audiences);
        setTemporaryDisplayName(f.displayName);
        fetchAudiences();
        setReady(true);
      } catch (e) {
        alert(initializationErrorMessage)
      }
    }
    initialize();
  }, [fetchFlag])

  useEffect(() => {
    // when temporaryAudiences changes, see if it matches the actual audiences
    if (ready) {
      const tempKeys = temporaryAudiences.map(a => a.key).sort();
      const appliedKeys = flag.audiences.map(a => a.key).sort()
      console.log(tempKeys);
      console.log(appliedKeys);
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
    <Box container="true" spacing={1}>
      <Stack container="true" spacing={2}>
        <Typography variant="h3">Flag Details</Typography>
        <Stack>
          <Typography variant="caption">Title</Typography>
          {editingDisplayName ? (
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-basic"
                label="Edit flag title"
                variant="outlined"
                value={temporaryDisplayName}
                onChange={(e) => setTemporaryDisplayName(e.target.value)}
              />
              <Button variant="outlined" disabled={temporaryDisplayName.trim().length === 0} onClick={submitDisplayNameEdit}>Save</Button>
              <Button variant="outlined" color="error" onClick={() => setEditingDisplayName(false)}>Cancel</Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle1">{flag.displayName}</Typography>
              <Button variant="outlined" onClick={() => setEditingDisplayName(true)}>Edit</Button>
            </Stack>
            )}
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