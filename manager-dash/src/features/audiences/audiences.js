import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchAudiences = createAsyncThunk("audiences/fetchAudiences", async (callback) => {
  const data = await apiClient.getAudiences();
  if (callback) {
    callback();
  }
  return data;
})

export const createAudience = createAsyncThunk("audiences/createAudience", async () => {
  return null;
})

export const editAudience = createAsyncThunk("audiences/editAudience", async () => {
  return null;
})

export const deleteAudience = createAsyncThunk("audiences/deleteAudience", async () => {
  return null;
})

const audienceSlice = createSlice({
  name: "audiences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAudiences.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(createAudience.fulfilled, (state, action) => {
      return state.concat(action.payload);
    });

    builder.addCase(editAudience.fulfilled, (state, action) => {
      return state.map(audience => {
        if (audience.key === action.payload.key) {
          return action.payload;
        }

        return audience;
      })
    });

    builder.addCase(deleteAudience.fulfilled, (state, action) => {
      return state.filter(audience => {
        return (audience.key === action.payload.key)
      })
    })
  }
})

export default audienceSlice.reducer;