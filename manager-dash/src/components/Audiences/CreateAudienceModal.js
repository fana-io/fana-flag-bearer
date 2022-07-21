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
import apiClient from '../../lib/ApiClient';
import { modalStyle } from '../../utils/modalStyle';
import validateAndSetKey from '../../utils/validateAndSetKey';
import { ConditionComponent } from './ConditionComponent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';

const operators = {
  EQ: '=',
  IN: 'is in',
  STR_CONTAINS: 'contains',
  STR_STARTS_WITH: 'starts with',
  STR_ENDS_WITH: 'ends with',
  GT: '>',
  LT: '<',
  LT_EQ: '<=',
  GT_EQ: '>='
}

export const CreateAudienceModal = ({ isOpen, setFormOpen }) => {
  const [attributes, setAttributes] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const [audienceKey, setAudienceKey] = useState('');
  const [combination, setCombination] = useState('ANY');
  const [conditionFieldActive, setConditionFieldActive] = useState(false);
  const [conditions, setConditions] = useState([]);
  const [keyError, setKeyError] = useState(false);

  useEffect(() => {
    const fetchAttributes = async () => {
      const a = await apiClient.getAttributes();
      console.log('fetch attributes')
      setAttributes(a);
    }
    fetchAttributes();
  }, [])

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
    e.preventDefault();
    // TODO: submit to manager backend
  };

  return (
    <Modal
      style={{ overflow: 'scroll' }}
      open={isOpen}
      onClose={() => setFormOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={modalStyle}>
          <Stack container spacing={2}>
            <Stack>
              <Typography variant="h5">Create a new audience</Typography>
            </Stack>
            <Stack>
              <TextField required 
                label="Audience Name" 
                variant="outlined" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)} 
              />
            </Stack>
            <Stack>
              <TextField required 
                error={keyError}
                label="Audience Key" 
                variant="outlined"
                value={audienceKey}
                onChange={onKeyInput}
              />
            <FormHelperText>Alphanumeric and underscores only. This cannot be changed after creation</FormHelperText>
            </Stack>
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
            <List>
              {conditions.map((c, idx) => {
                return (
                <ListItem divider
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeCondition(idx)} >
                      <DeleteIcon/>
                    </IconButton>
                  }
                >
                  {`${c.attribute} ${c.negate ? "NOT" : ""} ${operators[c.operator]} ${c.targetValue}`}
                </ListItem>)
              })}
            </List>
            {conditionFieldActive ? 
              <ConditionComponent attributeOptions={attributes} handleSaveCondition={handleSaveCondition} closeConditionForm={closeConditionForm} /> :
              <Button variant="outlined" onClick={() => setConditionFieldActive(true)}>Add Condition</Button>
            }
            <Button disabled={conditionFieldActive} variant="outlined" onClick={handleSubmit}>Create Audience</Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  )
}