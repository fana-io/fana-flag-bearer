import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchFlags = createAsyncThunk("flags/fetchFlags", async () => {
  const data = await apiClient.getFlags();
  console.log(data);
  return data;
})

export const createFlag = createAsyncThunk("flags/createFlag", async () => {
  return null;
})

export const editFlag = createAsyncThunk("flags/editFlag", async (updatedObj) => {
  // make a patch request for the current flag and updated fields
  let { key, updatedFields } = updatedObj;
  const data = await apiClient.editFlag(key, updatedFields);
  return data;
})

export const deleteFlag = createAsyncThunk("flags/deleteFlag", async () => {
  return null;
})

const flagSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFlags.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(createFlag.fulfilled, (state, action) => {
      return state.concat(action.payload);
    });

    builder.addCase(editFlag.fulfilled, (state, action) => {
      console.log('flag is being edited!')
      return state.map(flag => {
        if (flag.key === action.payload.key) {
          // we're expecting the api to return us the entire patched object, so for now 
          // we need to do this workaround
          // return action.payload;
          console.log(action.payload);
          const object = { ...flag }
          for (let prop in action.payload) {
            object[prop] = action.payload[prop];
          }
          return object;
        }

        return flag;
      })
    });

    builder.addCase(deleteFlag.fulfilled, (state, action) => {
      return state.filter(flag => {
        return (flag.key === action.payload.key)
      })
    })
  }
})

export default flagSlice.reducer;