import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from '../../app/database';

import { LABELS } from '../../graphql/labels';

export const fetchLabels = createAsyncThunk('events/fetchLabels', async () => {
  try {
    const labels = await client.request(LABELS);
    return labels.labels;
  } catch (err) {
    throw new Error(err?.response?.errors[0]?.message);
  }
});

const slice = createSlice({
  name: 'labels',

  initialState: {
    error: '',
    loading: false,
    labels: [],
  },

  reducers: {
    setLabels: (state, action) => ({
      ...state,
      labels: action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLabels.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchLabels.fulfilled, (state, action) => ({
        ...state,
        labels: action.payload,
        loading: false,
      }))
      .addCase(fetchLabels.rejected, (state, action) => ({
        ...state,
        error: action.error,
        loading: false,
      }));
  },
});

export const selectLabels = (state) => state.database.labels.labels;

export const isLoading = (state) => state.database.labels.loading;

export default slice.reducer;
