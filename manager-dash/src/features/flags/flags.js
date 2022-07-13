import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { flags } from "../../lib/data";

const initialState = [];

export const fetchFlags = createAsyncThunk("flags/fetchFlags", async () => {
  // make request to backend for flag data
  return flags;
})

export const createFlag = createAsyncThunk("flags/createFlag", async () => {
  return null;
})

export const editFlag = createAsyncThunk("flags/editFlag", async () => {
  return null;
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
      return state.map(flag => {
        if (flag.key === action.payload.key) {
          return action.payload;
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