import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom"
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
import { deletedEntityMessageCreator, generalErrorMessage, initializationErrorMessage } from "../../lib/messages";
import { SuccessAlert } from "../SuccessAlert";
import { WarningAlert } from "../WarningAlert";
import DeleteIcon from '@mui/icons-material/Delete';

export const Flag = () => {
  const flagId = useParams().id;
  const history = useHistory();
  const [ready, setReady] = useState(false);
  const [flag, setFlag] = useState();
  const [temporaryAudiences, setTemporaryAudiences] = useState([]);
  const [allAudiences, setAllAudiences] = useState([]);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [temporaryDisplayName, setTemporaryDisplayName] = useState([]);
  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [titleUpdated, setTitleUpdated] = useState(false);
  const [audiencesUpdated, setAudiencesUpdated] = useState(false);
  const [flagToggled, setFlagToggled] = useState(false);

  const closeAllAlerts = () => {
    setFlagToggled(false);
    setAudiencesUpdated(false);
    setTitleUpdated(false);
  }

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
      closeAllAlerts();
      setAudiencesUpdated(true);
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
      closeAllAlerts();
      setTitleUpdated(true);
    } catch(e) {
      alert(generalErrorMessage)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this flag?')) {
      try {
        await apiClient.deleteFlag(flag.id);
        history.push("/flags")
        alert(deletedEntityMessageCreator('flag', flag.key))
      } catch (e) {
        alert(generalErrorMessage);
      }
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

  if (flag.deletedAt) {
    return 
  }
  return (
    <Box container="true" spacing={1}>
      {titleUpdated && (<SuccessAlert text="Title has been updated." successStateSetter={setTitleUpdated} />)}
      {audiencesUpdated && (<SuccessAlert text="Targeted audiences have been updated." successStateSetter={setAudiencesUpdated} />)}
      {flagToggled && (<SuccessAlert text="Flag has been toggled." successStateSetter={setFlagToggled} />)}
      {pendingChanges && (<WarningAlert text="Changes are not saved until you click on 'Save Audiences'." />)}
      <Stack container="true" spacing={2}>
        <Typography variant="h3">Flag Details</Typography>
        <Stack>
          <Typography variant="caption">Title</Typography>
          <Stack direction="row" justifyContent="space-between">
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
            <Button
              variant="outlined"
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
              color="error"
              >
              Delete flag
            </Button>
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="caption">Key</Typography>
          <Typography variant="subtitle1">{flag.key}</Typography>
        </Stack>
        <Stack>
          <InputLabel id="flag-toggle-label">Enabled</InputLabel>
          <FlagStatusToggle successStateSetter={setFlagToggled} flag={flag} labelId="flag-toggle-label" refreshFlags={fetchFlag} />
        </Stack>
        <Typography variant="h4">Targeted Audiences</Typography>
        <Typography variant="body1">This flag will serve to ANY targeted audience</Typography>
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