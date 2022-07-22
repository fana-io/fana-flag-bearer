import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import apiClient from "../../lib/apiClient";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ConditionBuilder } from "./ConditionBuilder";
import { SingleCondition } from "./SingleCondition";
import { generalErrorMessage, initializationErrorMessage } from "../../lib/messages";

export const Audience = () => {
  const audienceId = useParams().id;
  const [ready, setReady] = useState(false);
  const [audience, setAudience] = useState();
  const [pendingChanges, setPendingChanges] = useState(false);
  const [temporaryConditions, setTemporaryConditions] = useState([]);
  const [temporaryDisplayName, setTemporaryDisplayName] = useState('');
  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [temporaryCombination, setTemporaryCombination] = useState('');

  const removeCondition = (removedConditionIdx) => {
    const updatedConditions = temporaryConditions.filter((c, idx) => {
      if (idx === removedConditionIdx) {
        return false;
      }
      return true;
    })

    setTemporaryConditions(updatedConditions);
  }

  const addCondition = (newCondition) => {
    setTemporaryConditions(temporaryConditions.concat(newCondition));
  }

  const submitConditionEdit = async () => {
    const patchedAudience = {
      combine: temporaryCombination,
      conditions: temporaryConditions
    }

    try {
      await apiClient.editAudience(audience.id, patchedAudience);
      fetchAudience();
    } catch(e) {
      alert(generalErrorMessage);
    }
  }

  const submitDisplayNameEdit = async () => {
    const patchedAudience = {
      displayName: temporaryDisplayName,
    }

    try {
      await apiClient.editAudience(audience.id, patchedAudience);
      fetchAudience();
      setEditingDisplayName(false);
    } catch(e) {
      alert(generalErrorMessage)
    }
  }

  const fetchAudience = useCallback(async () => {
    const a = await apiClient.getAudience(audienceId);
    setAudience(a);
    return a;
  }, [audienceId])

  useEffect(() => {
    const initialize = async () => {
      try {
        const a = await fetchAudience()
        setTemporaryConditions(a.conditions);
        setTemporaryDisplayName(a.displayName);
        setTemporaryCombination(a.combine);
        setReady(true);
      } catch (e) {
        alert(initializationErrorMessage)
      }
    }

    initialize();
  }, [fetchAudience])

  useEffect(() => {
    // when temporaryAudiences changes, see if it matches the actual audiences
    if (ready) {
      if (!_.isEqual(audience.conditions, temporaryConditions) || temporaryCombination !== audience.combine) {
        setPendingChanges(true);
      } else {
        setPendingChanges(false);
      }
    }
  }, [temporaryConditions, ready, audience?.conditions, temporaryCombination, audience?.combine])


  if (!ready) {
    return <>Loading...</>
  }
  return (
    <Box container="true" spacing={1}>
      <Stack container="true" spacing={2}>
        <Typography variant="h3">Audience Details</Typography>
        <Stack>
          <Typography variant="caption">Title</Typography>
          {editingDisplayName ? (
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-basic"
                label="Edit audience title"
                variant="outlined"
                value={temporaryDisplayName}
                onChange={(e) => setTemporaryDisplayName(e.target.value)}
              />
              <Button variant="outlined" disabled={temporaryDisplayName.trim().length === 0} onClick={submitDisplayNameEdit}>Save</Button>
              <Button variant="outlined" color="error" onClick={() => setEditingDisplayName(false)}>Cancel</Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle1">{audience.displayName}</Typography>
              <Button variant="outlined" onClick={() => setEditingDisplayName(true)}>Edit</Button>
            </Stack>
            )}
        </Stack>
        <Stack>
          <Typography variant="caption">Key</Typography>
          <Typography variant="subtitle1">{audience.key}</Typography>
        </Stack>
        <Typography variant="h4">Conditions</Typography>
        <Typography variant="body1">
              User must meet
              <Select
              variant="standard"
              value={temporaryCombination}
              style={{ marginLeft: 6, marginRight: 6}}
              onChange={(e) => setTemporaryCombination(e.target.value)}
              >
                <MenuItem value="ANY">ANY</MenuItem>
                <MenuItem value="ALL">ALL</MenuItem>
              </Select>
              of the conditions to qualify for this audience
            </Typography>
        <Stack
          container="true"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={10}
          direction="row"
        >
          <Stack>
            <List style={{ width: 350 }}>
              {temporaryConditions.map((condition, idx) => {
                return (<SingleCondition key={idx} idx={idx} condition={condition} handleRemove={removeCondition} />)
              })}
            </List>
            <Button disabled={!pendingChanges} variant="outlined" onClick={submitConditionEdit}>Save Conditions</Button>
          </Stack>
          <Stack>
          <ConditionBuilder closable={false} handleSaveCondition={addCondition} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}