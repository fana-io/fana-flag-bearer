import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack"
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button"
import { Typography } from "@mui/material";

const operatorOptions = {
  STR: [
    { value: 'EQ', text: 'is equal to' },
    { value: 'IN', text: 'is in' },
    { value: 'STR_CONTAINS', text: 'contains' },
    { value: 'STR_STARTS_WITH', text: 'starts with' },
    { value: 'STR_ENDS_WITH', text: 'ends with' },
  ],
  BOOL: [
    { value: 'EQ', text: 'is equal to' },
  ],
  NUM: [
    { value: 'EQ', text: 'is equal to' },
    { value: 'GT', text: '>' },
    { value: 'LT', text: '<' },
    { value: 'GT_EQ', text: '>=' },
    { value: 'LT_EQ', text: '<=' },
  ]
}

export const ConditionComponent = ({ attributeOptions, handleSaveCondition, closeConditionForm }) => {
  console.log('attribute options', attributeOptions)
  const [attribute, setAttribute] = useState('');
  const [attrType, setAttrType] = useState('');
  const [negate, setNegate] = useState(false);
  const [operator, setOperator] = useState('');
  const [possibleOperators, setPossibleOperators] = useState([]);
  const [targetValue, setTargetValue] = useState('');

  useEffect(() => {
    if (!attribute) {
      setPossibleOperators([]);
    } else {
      const currentType = attributeOptions.find(a => a.key === attribute).type;
      // when attribute changes, change possible operators based on type
      setAttrType(currentType);
      setPossibleOperators(operatorOptions[currentType]);
    }
  }, [attribute, attributeOptions])

  const handleSubmit = () => {
    // if any of the fields are empty, deny
    // if type is boolean and value isn't true or false, deny
    let valToSubmit = targetValue;

    if (attribute.length === 0 || operator === '' || valToSubmit.trim().length === 0) {
      alert('Please fill out all condition fields')
      return;
    }

    if (operator === 'IN') {
      valToSubmit = targetValue.split(',').map(v => v.trim())
    }

    closeConditionForm();
    handleSaveCondition({ attribute, negate, operator, targetValue: valToSubmit })
  }

  return (
    <Stack container spacing={2}>
      <Typography variant="h6">New Condition</Typography>
      <Stack>
        <FormControl>
          <InputLabel id="attribute-dropdown-label">Select Attribute</InputLabel>
            <Select
              required
              labelId="attribute-dropdown-label"
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
              input={<OutlinedInput label="Select Attribute"/>}
            >
              {attributeOptions.map((option) => {
                return <MenuItem key={option.key} value={option.key}>{option.key}</MenuItem>;
              })}
            </Select>
          </FormControl>
      </Stack>
      {attribute && (
        <>
          <Stack>
            <FormControl>
              <InputLabel id="operator-dropdown-label">Select Operator</InputLabel>
                <Select
                  required
                  labelId="operator-dropdown-label"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  input={<OutlinedInput label="Select Operator"/>}
                >
                  {possibleOperators.map((option) => {
                    return <MenuItem value={option.value}>{option.text}</MenuItem>;
                  })}
                </Select>
              </FormControl>
          </Stack>
          {attrType !== 'BOOL' ? (
            <Stack>
              <TextField
                required
                variant="outlined"
                label="Condition Value"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
              />
              {operator === "IN" ? <FormHelperText>Enter your values separated by commas</FormHelperText> : null}
            </Stack>
          ) : (
            <Stack>
              <FormControl>
              <InputLabel id="boolean-dropdown-label">Select Boolean Value</InputLabel>
                <Select
                  required
                  labelId="boolean-dropdown-label"
                  defaultValue={"false"}
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  input={<OutlinedInput label="Select Boolean Value"/>}
                >
                <MenuItem value="true">true</MenuItem>
                <MenuItem value="false">false</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
        </>
      )}
      <Stack>
        <FormControlLabel control={
          <Checkbox checked={negate} onChange={() => setNegate(!negate)} />
        } label="Negate Condition" />
      </Stack>
      <Button variant="outlined" onClick={ handleSubmit }>Save Condition</Button>
    </Stack>
  )
}