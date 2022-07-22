import { useState } from "react"
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { smallModalStyle } from "../../utils/modalStyle";
import validateAndSetKey from '../../utils/validateAndSetKey';
import apiClient from "../../lib/apiClient";
import { duplicateErrorMessage, generalErrorMessage } from "../../lib/messages";

export const CreateAttributeModal = ({ isOpen, setFormOpen, refreshAtts }) => {
  const [selectedType, setSelectedType] = useState('');
  const [attributeKey, setAttributeKey] = useState('');
  const [keyError, setKeyError] = useState(false);

  // TODO: import dynamic list of attribute types from manager
  const attrTypeOptions = [
    {value: "BOOL", text:"Boolean"}, 
    {value: "STR", text: "String"}, 
    {value: "NUM", text: "Number"}, 
  ]

  const handleSubmit = async (e) => {
    const newAttribute = {
      key: attributeKey, attrType: selectedType
    }
    try {
      await apiClient.createAttribute(newAttribute);
      refreshAtts();
      setFormOpen(false);
    } catch (e) {
      console.log(e);
      if (e.response.status === 409) {
        alert(duplicateErrorMessage);
      } else {
        alert(generalErrorMessage);
      }
    }
  }

  const onKeyInput = (e) => {
    validateAndSetKey(e.target.value, setAttributeKey, setKeyError);
  }

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
      <Box sx={smallModalStyle}>
        <Stack container spacing={2}>
          <Stack>
            <Typography variant="h5">Create a new attribute</Typography>
          </Stack>
          <Stack>
            <TextField required 
              error={keyError}
              id="outlined-basic" 
              label="Attribute Key" 
              variant="outlined"
              value={attributeKey}
              onChange={onKeyInput}
              onBlur={() => setKeyError(false)}
            />
          <FormHelperText>Alphanumeric and underscores only. This cannot be changed after creation</FormHelperText>
          </Stack>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="type-dropdown-label">Select Data Type</InputLabel>
          <Select
            required
            labelId="type-dropdown-label"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            input={<OutlinedInput label="Select Data Type" />}
          >
            {attrTypeOptions.map(a => {
              return (<MenuItem key={a.value} value={a.value}>{a.text}</MenuItem>)
            })}
          </Select>
        </FormControl>
          <Button disabled={attributeKey.length === 0 || selectedType.length === 0} variant="outlined" onClick={handleSubmit}>Create</Button>
          <FormHelperText>Attributes cannot be edited after creation</FormHelperText>
        </Stack>
      </Box>
    </Fade>
  </Modal>
  )
}