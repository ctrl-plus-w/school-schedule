import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { removeKey } from '../../utils/Utils';
import { fetchLabelEvents } from '../database/eventsSlice';
import { selectLabels } from '../database/labelsSlice';

export const DASHBOARD_STATES = { SHOW: 'Affichage', EDIT: 'Édition', PLAN: 'Planification' };

export const setLabelAndFetch = createAsyncThunk('infos/setLabelAndFetch', async (arg, { dispatch, getState }) => {
  const labels = selectLabels(getState());
  const label = labels.find((l) => l.label_name === arg);

  await dispatch(fetchLabelEvents({ id: label.id }));
  return arg;
});

const initialState = {
  selectedLabel: '',

  selectedEvents: {},

  dashboardState: DASHBOARD_STATES.SHOW,
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
  },

  extraReducers: (builder) => {
    const fulfilled = (state, action) => ({ ...state, selectedLabel: action.payload });
    builder.addCase(setLabelAndFetch.fulfilled, fulfilled);
  },
});

export const { setLabel, addEvent, removeEvent, editEvent, removeDay, resetEvents, switchDashboardState } = slice.actions;

export const selectDashboardState = (state) => state.infos.dashboardState;
export const selectEvents = (state) => state.infos.selectedEvents;
export const selectLabel = (state) => state.infos.selectedLabel;

export default slice.reducer;
