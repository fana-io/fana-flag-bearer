import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { bigModalStyle } from '../../utils/modalStyle';
import validateAndSetKey from '../../utils/validateAndSetKey';
import { ConditionBuilder } from './ConditionBuilder';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SingleCondition } from './SingleCondition';

export const CreateAudienceModal = ({ isOpen, setFormOpen }) => {
  const [displayName, setDisplayName] = useState('');
  const [audienceKey, setAudienceKey] = useState('');
  const [combination, setCombination] = useState('ANY');
  const [conditionFieldActive, setConditionFieldActive] = useState(false);
  const [conditions, setConditions] = useState([]);
  const [keyError, setKeyError] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  useEffect(() => {
    if (displayName.trim().length === 0 ||
        audienceKey.trim().length === 0 ||
        conditionFieldActive) {
        setReadyToSubmit(false);
    } else {
      setReadyToSubmit(true);
    }
  }, [displayName, audienceKey, conditionFieldActive, setReadyToSubmit])
  
  const onKeyInput = (e) => {
    validateAndSetKey(e.target.value, setAudienceKey, setKeyError);
  }

  const closeConditionForm = () => {
    setConditionFieldActive(false);
  }

  const removeCondition = (idx) => {
    const copy = conditions.slice();
    copy.splice(idx, 1);
    setConditions(copy);
  }

  const handleSaveCondition = (condition) => {
    setConditions(conditions.concat(condition));
  }

  const handleSubmit = (e) => {
    const submission = {
      displayName,
      key: audienceKey,
      combination,
      conditions
    }
    console.log(submission);
    e.preventDefault();
    // TODO: submit to manager backend
  };

  return (
    <Modal
      style={{ overflowY: 'scroll', height: '100%', display: 'block' }}
      open={isOpen}
      onClose={() => setFormOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={bigModalStyle}>
          <Typography variant="h5">Create a new audience</Typography>
          <Stack container spacing={2} direction="row">
            <Stack style={{ width: "50%"}}>
              <TextField required 
                label="Audience Name" 
                variant="outlined" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)} 
              />
            </Stack>
            <Stack style={{ width: "50%" }}>
              <TextField required 
                error={keyError}
                label="Audience Key" 
                variant="outlined"
                value={audienceKey}
                onChange={onKeyInput}
                onBlur={() => setKeyError(false)}
              />
            <FormHelperText>Alphanumeric and underscores only. This cannot be changed after creation</FormHelperText>
            </Stack>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h6">Conditions</Typography>
            <Typography variant="body1">
              User must meet
              <Select
              variant="standard"
              value={combination}
              style={{ marginLeft: 6, marginRight: 6}}
              onChange={(e) => setCombination(e.target.value)}
              >
                <MenuItem value="ANY">ANY</MenuItem>
                <MenuItem value="ALL">ALL</MenuItem>
              </Select>
              of the conditions to qualify for this audience
            </Typography>
            <Grid container spacing={2}>
              {conditions.map((c, idx) => {
                return (
                  <SingleCondition idx={idx} condition={c} handleRemove={removeCondition} />
                )
              })}
            </Grid>
            {conditionFieldActive ? 
              <ConditionBuilder handleSaveCondition={handleSaveCondition} closable={true} closeConditionForm={closeConditionForm} /> :
              <Button variant="outlined" onClick={() => setConditionFieldActive(true)}>Add Condition</Button>
            }
            <Button disabled={!readyToSubmit} variant="outlined" onClick={handleSubmit}>Create Audience</Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  )
}