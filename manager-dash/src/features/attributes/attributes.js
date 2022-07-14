import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchAttributes = createAsyncThunk("audiences/fetchAttributes", async () => {
  const data = await apiClient.getAttributes();
  return data;
})

export const createAttribute = createAsyncThunk("audiences/createAttribute", async () => {
  return null;
})

export const editAttribute = createAsyncThunk("audiences/editAttribute", async () => {
  return null;
})

export const deleteAttribute = createAsyncThunk("audiences/deleteAttribute", async () => {
  return null;
})

const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAttributes.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(createAttribute.fulfilled, (state, action) => {
      return state.concat(action.payload);
    });

    builder.addCase(editAttribute.fulfilled, (state, action) => {
      return state.map(attribute => {
        if (attribute.key === action.payload.key) {
          return action.payload;
        }

        return attribute;
      })
    });

    builder.addCase(deleteAttribute.fulfilled, (state, action) => {
      return state.filter(attribute => {
        return (attribute.key === action.payload.key)
      })
    })
  }
})

export default attributeSlice.reducer;