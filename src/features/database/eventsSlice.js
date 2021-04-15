import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from '../../app/database';

import { EVENTS } from '../../graphql/events';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const events = await client.request(EVENTS);
  return events.userEvents;
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
      }));
  },
});

export const selectEvents = (state) => state.events.events;

export const isLoading = (state) => state.events.loading;

export default slice.reducer;
