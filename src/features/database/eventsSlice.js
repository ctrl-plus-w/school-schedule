import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addError } from '../modals/errorSlice';

import client from '../../app/database';

import { EVENTS, OWNED_EVENTS, LABEL_EVENTS } from '../../graphql/events';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_args, { dispatch }) => {
  try {
    const events = await client.request(EVENTS);
    return events.userEvents;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (fetchEvents)', message }));
    throw new Error(message);
  }
});

export const fetchOwnedEvents = createAsyncThunk('events/fetchOwnedEvents', async (_args, { dispatch }) => {
  try {
    const events = await client.request(OWNED_EVENTS);
    return events.ownedEvents;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (fetchOwnedEvents)', message }));
    throw new Error(message);
  }
});

export const fetchLabelEvents = createAsyncThunk('events/fetchLabelEvents', async (args, { dispatch }) => {
  try {
    const events = await client.request(LABEL_EVENTS, args);
    return events.labelEvents;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (fetchLabelEvents)', message }));
    throw new Error(message);
  }
});

const slice = createSlice({
  name: 'events',

  initialState: {
    error: '',
    loading: false,
    events: [],
  },

  reducers: {
    setEvents: (state, action) => ({
      ...state,
      events: action.payload,
    }),
  },

  extraReducers: (builder) => {
    const pending = (state) => ({ ...state, loading: true });
    const fulfilled = (state, action) => ({ ...state, events: action.payload, loading: false });
    const rejected = (state, action) => ({ ...state, error: action.error, loading: false });

    // Fetch events.
    builder.addCase(fetchEvents.pending, pending).addCase(fetchEvents.fulfilled, fulfilled).addCase(fetchEvents.rejected, rejected);

    // Fetch owned events.
    builder.addCase(fetchOwnedEvents.pending, pending).addCase(fetchOwnedEvents.fulfilled, fulfilled).addCase(fetchOwnedEvents.rejected, rejected);

    // Fetch label events.
    builder.addCase(fetchLabelEvents.pending, pending).addCase(fetchLabelEvents.fulfilled, fulfilled).addCase(fetchLabelEvents.rejected, rejected);
  },
});

export const selectEvents = (state) => state.database.events.events;

export const isLoading = (state) => state.database.events.loading;

export default slice.reducer;
