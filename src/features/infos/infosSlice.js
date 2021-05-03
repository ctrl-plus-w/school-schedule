import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWeekInterval } from '../../utils/Calendar';

import { removeKey } from '../../utils/Utils';
import { selectRole } from '../database/authSlice';
import { fetchEvents, fetchLabelEvents, fetchLabelRelatedEvents, fetchOwnedEvents } from '../database/eventsSlice';
import { selectLabels } from '../database/labelsSlice';

import ROLES from '../../static/roles';

export const DASHBOARD_STATES = { SHOW: 'Affichage', EDIT: 'Édition', PLAN: 'Planification' };

export const setEmptyLabelAndFetch = createAsyncThunk('infos/setEmptyLabelAndFetch', async (_arg, { dispatch }) => {
  await dispatch(fetchOwnedEvents());
  return '';
});

export const setLabelAndFetch = createAsyncThunk('infos/setLabelAndFetch', async (arg, { dispatch, getState }) => {
  const labels = selectLabels(getState());
  const label = labels.find((l) => l.label_name === arg);

  await dispatch(fetchLabelEvents({ id: label.id }));
  await dispatch(fetchLabelRelatedEvents({ id: label.id }));

  return arg;
});

export const setWeekIntervalAndFetch = createAsyncThunk('infos/setWeekIntervalAndFetch', async (args, { dispatch, getState }) => {
  const labels = selectLabels(getState());
  const labelName = selectLabel(getState());
  const role = selectRole(getState());

  const label = labels.find((l) => l.label_name === labelName);

  await dispatch(setWeekInterval(args));

  if (label) {
    await dispatch(fetchLabelEvents({ id: label.id }));
  } else {
    if (role === ROLES.STUDENT) await dispatch(fetchEvents());
    else await dispatch(fetchOwnedEvents());
  }
});

const initialState = {
  selectedLabel: '',

  selectedEvents: {},

  dashboardState: DASHBOARD_STATES.SHOW,

  weekInterval: getWeekInterval(),
};

const slice = createSlice({
  name: 'infos',

  initialState,

  reducers: {
    setLabel: (state, action) => ({
      ...state,
      selectedLabel: action.payload,
    }),

    addEvent: (state, action) => {
      const day = state.selectedEvents[action.payload.date];
      if (day) state.selectedEvents[action.payload.date].push({ start: action.payload.start, obligatory: true });
      else state.selectedEvents[action.payload.date] = [{ start: action.payload.start, obligatory: true }];
    },

    removeEvent: (state, action) => {
      // eslint-disable-next-line no-unused-vars
      const removeKey = (key, { [key]: _, ...rest }) => rest;
      const timeFilter = ({ start }) => start !== action.payload.start;

      const day = state.selectedEvents[action.payload.date];
      if (day.length <= 1) state.selectedEvents = removeKey(action.payload.date, state.selectedEvents);
      else state.selectedEvents[action.payload.date] = state.selectedEvents[action.payload.date].filter(timeFilter);
    },

    resetEvents: (state) => {
      state.selectedEvents = {};
    },

    removeDay: (state, action) => {
      state.selectedEvents = removeKey(action.payload, state.selectedEvents);
    },

    editEvent: (state, action) => {
      const day = state.selectedEvents[action.payload.date];
      if (day) day.find(({ start }) => start === action.payload.start).obligatory = action.payload.obligatory;
      else state.selectedEvents[action.payload.date] = [{ start: action.payload.start, obligatory: action.payload.obligatory }];
    },

    switchDashboardState: (state, action) => {
      if (Object.values(DASHBOARD_STATES).includes(action.payload)) return { ...state, dashboardState: action.payload };
      return state;
    },

    setWeekInterval: (state, action) => {
      state.weekInterval = action.payload;
    },
  },

  extraReducers: (builder) => {
    const fulfilled = (state, action) => ({ ...state, selectedLabel: action.payload });

    // Set label and fetch reducer.
    builder.addCase(setLabelAndFetch.fulfilled, fulfilled);

    // Set empty label and fetch reducer.
    builder.addCase(setEmptyLabelAndFetch.fulfilled, fulfilled);
  },
});

export const { setLabel, addEvent, removeEvent, editEvent, removeDay, resetEvents, switchDashboardState, setWeekInterval } = slice.actions;

export const selectDashboardState = (state) => state.infos.dashboardState;
export const selectEvents = (state) => state.infos.selectedEvents;
export const selectLabel = (state) => state.infos.selectedLabel;
export const selectWeekInterval = (state) => state.infos.weekInterval;

export default slice.reducer;
