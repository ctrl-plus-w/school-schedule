import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from '../../app/database';

import { EVENTS, OWNED_EVENTS } from '../../graphql/events';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const events = await client.request(EVENTS);
    return events.userEvents;
  } catch (err) {
    throw new Error(err?.response?.errors[0]?.message);
  }
});

export const fetchOwnedEvents = createAsyncThunk('events/fetchOwnedEvents', async () => {
  try {
    const events = await client.request(OWNED_EVENTS);
    return events.ownedEvents;
  } catch (err) {
    throw new Error(err?.response?.errors[0]?.message);
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
    builder
      .addCase(fetchEvents.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchEvents.fulfilled, (state, action) => ({
        ...state,
        events: action.payload,
        loading: false,
      }))
      .addCase(fetchEvents.rejected, (state, action) => ({
        ...state,
        error: action.error,
        loading: false,
      }))

      .addCase(fetchOwnedEvents.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchOwnedEvents.fulfilled, (state, action) => ({
        ...state,
        events: action.payload,
        loading: false,
      }))
      .addCase(fetchOwnedEvents.rejected, (state, action) => ({
        ...state,
        error: action.error,
        loading: false,
      }));
  },
});

export const selectEvents = (state) => state.events.events;

export const isLoading = (state) => state.events.loading;

export default slice.reducer;
