import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import apiClient from "../../lib/ApiClient";
import { FlagAudience } from "./FlagAudience"
import { FlagStatusToggle } from "./FlagStatusToggle";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { AddAudienceToFlag } from "./AddAudienceToFlag";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import _ from 'lodash';

export const Flag = () => {
  const flagId = useParams().id;
  const [ready, setReady] = useState(false);
  const [flag, setFlag] = useState();
  const [temporaryAudiences, setTemporaryAudiences] = useState([]);
  const [allAudiences, setAllAudiences] = useState([]);
  const [pendingChanges, setPendingChanges] = useState(false);

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

  const submitEdit = () => {
    // api patch request with temporary fields
    // hardcoding status: false bc go will determine that it is a zero value, and won't update it
    // this patch is only for updating audiences, so that's okay
    const patchedFlag = { ...flag, status: false, audiences: temporaryAudiences.map(a => a.key) }
    console.log(`api patch request submitted with the following data`, patchedFlag)
  }

  useEffect(() => {
    const fetchFlag = async () => {
      const f = await apiClient.getFlag(flagId);
      console.log('f', f);
      setFlag(f);
      setTemporaryAudiences(f.audiences);
      setReady(true);
    }

    const fetchAudiences = async () => {
      const a = await apiClient.getAudiences();
      setAllAudiences(a);
    }

    fetchFlag();
    fetchAudiences();
  }, [flagId])

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
    <Box container spacing={1} sx={{
      marginLeft: 8,
      maxWidth: 1000
    }}>
      <Stack container spacing={2}>
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
          <FlagStatusToggle flag={flag} labelId="flag-toggle-label" />
        </Stack>
        <Typography variant="h4">Targeted Audiences</Typography>
        <Stack
          container
          divider={<Divider orientation="vertical" flexItem />} 
          spacing={10}
          direction="row"
        >
          <List style={{ width: 350 }}>
            {temporaryAudiences.map(audience => {
              return (<FlagAudience key={audience.key} audience={audience} removeAudience={removeAudience} />)
            })}
          </List>
          <AddAudienceToFlag allAudiences={allAudiences} addAudience={addAudience} currentAppliedAudiences={temporaryAudiences} />
        </Stack>
        <Button disabled={!pendingChanges} variant="outlined" onClick={submitEdit}>Save Audiences</Button>
      </Stack>
    </Box>
  )
}