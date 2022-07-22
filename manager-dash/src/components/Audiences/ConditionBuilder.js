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
import Typography from "@mui/material/Typography";
import apiClient from "../../lib/apiClient";

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

export const ConditionBuilder = ({ handleSaveCondition, closable = false, closeConditionForm }) => {
  const [attributeOptions, setAttributeOptions] = useState([]);
  const [attribute, setAttribute] = useState('');
  const [attrType, setAttrType] = useState('');
  const [negate, setNegate] = useState(false);
  const [operator, setOperator] = useState('');
  const [possibleOperators, setPossibleOperators] = useState([]);
  const [vals, setVals] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const atts = await apiClient.getAttributes();
      setAttributeOptions(atts);
    }
    initialize();
  }, []);

  useEffect(() => {
    if (attribute.length === 0 ||
        operator.length === 0 ||
        vals.trim().length === 0) {
        setReadyToSubmit(false);
    } else {
      setReadyToSubmit(true);
    }
  }, [attribute, operator, vals])

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

  useEffect(() => {
    setOperator('');
    setVals('');
  }, [attrType])

  const handleSubmit = () => {
    // if any of the fields are empty, deny
    // if type is boolean and value isn't true or false, deny
    if (closable) {
      closeConditionForm();
    } else {
      setAttribute('');
      setAttrType('');
      setNegate(false);
      setOperator('');
      setVals('');
    }
    handleSaveCondition({ attribute, negate, operator, vals })
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
                    return <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>;
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
                value={vals}
                onChange={(e) => setVals(e.target.value)}
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
                  value={vals}
                  onChange={(e) => setVals(e.target.value)}
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
      <Button disabled={!readyToSubmit} variant="outlined" onClick={handleSubmit}>Save Condition</Button>
      {closable ? (<Button variant="outlined" color="error" onClick={closeConditionForm}>Scrap Condition</Button>) : null}
    </Stack>
  )
}