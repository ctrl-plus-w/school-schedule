import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addError } from '../modals/errorSlice';

import client from '../../app/database';

import { EVENTS, OWNED_EVENTS, LABEL_EVENTS, LABEL_RELATED_EVENTS, CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from '../../graphql/events';

import { selectWeekInterval } from '../infos/infosSlice';

export const fetchAllLabelEvents = async (dispatch, id) => {
  await dispatch(fetchLabelEvents({ id }));
  await dispatch(fetchLabelRelatedEvents({ id }));
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_args, { dispatch, getState }) => {
  try {
    const weekInterval = selectWeekInterval(getState());
    const events = await client.request(EVENTS, weekInterval);
    return events.userEvents;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (fetchEvents)', message }));
    throw new Error(message);
  }
});

export const fetchOwnedEvents = createAsyncThunk('events/fetchOwnedEvents', async (_args, { dispatch, getState }) => {
  try {
    const weekInterval = selectWeekInterval(getState());
    const events = await client.request(OWNED_EVENTS, weekInterval);
    return events.ownedEvents;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (fetchOwnedEvents)', message }));
    throw new Error(message);
  }
});

export const fetchLabelEvents = createAsyncThunk('events/fetchLabelEvents', async (args, { dispatch, getState }) => {
  try {
    const weekInterval = selectWeekInterval(getState());
    const events = await client.request(LABEL_EVENTS, { ...args, ...weekInterval });
    return events.labelEvents;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (fetchLabelEvents)', message }));
    throw new Error(message);
  }
});

export const fetchLabelRelatedEvents = createAsyncThunk('events/fetchLabelRelatedEvents', async (args, { dispatch, getState }) => {
  try {
    const weekInterval = selectWeekInterval(getState());
    const events = await client.request(LABEL_RELATED_EVENTS, { ...args, ...weekInterval });
    return events.labelRelatedEvents;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (fetchRelatedLabelEvents)', message }));
    throw new Error(message);
  }
});

export const createEvent = createAsyncThunk('events/createEvent', async (args, { dispatch }) => {
  try {
    const events = await client.request(CREATE_EVENT, args);
    return events.createEventByName;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (createEvent)', message }));
    throw new Error(message);
  }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (args, { dispatch }) => {
  try {
    const events = await client.request(UPDATE_EVENT, args);
    return events;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (createEvent)', message }));
    throw new Error(message);
  }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (args, { dispatch }) => {
  try {
    const isDeleted = await client.request(DELETE_EVENT, args);
    return isDeleted;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (deleteEvent)', message }));
    throw new Error(message);
  }
});

const initialState = {
  error: '',
  loading: false,
  relatedLoading: false,
  events: [],
  relatedEvents: [],
};

const slice = createSlice({
  name: 'events',

  initialState: initialState,

  reducers: {
    setEvents: (state, action) => ({
      ...state,
      events: action.payload,
    }),

    reset: () => initialState,
  },

  extraReducers: (builder) => {
    const pending = (state) => ({ ...state, loading: true });
    const relatedPending = (state) => ({ ...state, relatedLoading: true });

    const rejected = (state, action) => ({ ...state, error: action.error, loading: false });
    const relatedRejected = (state, action) => ({ ...state, error: action.error, relatedLoading: false });

    const fulfilledEvents = (state, action) => ({ ...state, events: action.payload, relatedEvents: [], loading: false });
    const fulfilledRelatedEvents = (state, action) => ({ ...state, relatedEvents: action.payload, relatedLoading: false });
    const fulfilledNoAction = (state) => ({ ...state, loading: false });

    // Fetch events.
    builder.addCase(fetchEvents.pending, pending).addCase(fetchEvents.fulfilled, fulfilledEvents).addCase(fetchEvents.rejected, rejected);

    // Fetch owned events.
    builder
      .addCase(fetchOwnedEvents.pending, pending)
      .addCase(fetchOwnedEvents.fulfilled, fulfilledEvents)
      .addCase(fetchOwnedEvents.rejected, rejected);

    // Fetch label events.
    builder
      .addCase(fetchLabelEvents.pending, pending)
      .addCase(fetchLabelEvents.fulfilled, fulfilledEvents)
      .addCase(fetchLabelEvents.rejected, rejected);

    // Fetch label related events.
    builder
      .addCase(fetchLabelRelatedEvents.pending, relatedPending)
      .addCase(fetchLabelRelatedEvents.fulfilled, fulfilledRelatedEvents)
      .addCase(fetchLabelRelatedEvents.rejected, relatedRejected);

    // Create event.
    builder.addCase(createEvent.pending, pending).addCase(createEvent.fulfilled, fulfilledNoAction).addCase(createEvent.rejected, rejected);

    // Delete event.
    builder.addCase(deleteEvent.pending, pending).addCase(deleteEvent.fulfilled, fulfilledNoAction).addCase(deleteEvent.rejected, rejected);
  },
});

export const { reset } = slice.actions;

export const selectEvents = (state) => state.database.events.events;
export const selectRelatedEvents = (state) => state.database.events.relatedEvents;
export const selectLoading = (state) => state.database.events.loading || state.database.events.relatedLoading;

export const isLoading = (state) => state.database.events.loading;

export default slice.reducer;
