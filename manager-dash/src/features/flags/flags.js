import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchFlags = createAsyncThunk("flags/fetchFlags", async () => {
  const data = await apiClient.getFlags();
  return data;
});

export const createFlag = createAsyncThunk("flags/createFlag", async () => {

});

// const flagSlice = createSlice({
//   name: "flags",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchFlags.fulfilled, (state, action) => {
//     })
//   }
// })

// export default flagSlice.reducer;