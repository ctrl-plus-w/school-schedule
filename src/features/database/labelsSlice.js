import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from '../../app/database';

import { addError } from '../modals/errorSlice';

import { LABELS, CREATE_LABEL } from '../../graphql/labels';

export const fetchLabels = createAsyncThunk('labels/fetchLabels', async () => {
  try {
    const labels = await client.request(LABELS);
    return labels.labels;
  } catch (err) {
    throw new Error(err?.response?.errors[0]?.message);
  }
});

export const createLabel = createAsyncThunk('labels/createLabel', async (args, { dispatch }) => {
  try {
    const events = await client.request(CREATE_LABEL, args);
    return events.labelEvents;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (createLabel)', message }));
    throw new Error(message);
  }
});

const slice = createSlice({
  name: 'labels',

  initialState: {
    error: '',
    loading: false,
    labels: [],
    created: false,
  },

  reducers: {
    setLabels: (state, action) => ({ ...state, labels: action.payload }),
    resetCreated: (state) => ({ ...state, created: false }),
  },

  extraReducers: (builder) => {
    const pending = (state) => ({ ...state, loading: true });
    const fulfilled = (state, action) => ({ ...state, labels: action.payload, loading: false });
    const rejected = (state, action) => ({ ...state, error: action.error, loading: false });

    const createPending = (state) => ({ ...pending(state), created: false });
    const createFulfilled = (state, action) => ({ ...fulfilled(state, action), created: true });
    const createRejected = (state, action) => ({ ...rejected(state, action), created: false });

    // Fetch labels.
    builder.addCase(fetchLabels.pending, pending).addCase(fetchLabels.fulfilled, fulfilled).addCase(fetchLabels.rejected, rejected);

    // Create label.
    builder.addCase(createLabel.pending, createPending).addCase(createLabel.fulfilled, createFulfilled).addCase(createLabel.rejected, createRejected);
  },
});

export const { resetCreated } = slice.actions;

export const selectLabels = (state) => state.database.labels.labels;
export const selectCreated = (state) => state.database.labels.created;
export const isLoading = (state) => state.database.labels.loading;

export default slice.reducer;
