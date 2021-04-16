import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'infos',

  initialState: {
    selectedLabel: '',

    selectedEvents: {},
  },

  reducers: {
    setLabel: (state, action) => ({
      ...state,
      selectedLabel: action.payload,
    }),

    addEvent: (state, action) => {
      const day = state.selectedEvents[action.payload.date];
      if (!day) state.selectedEvents[action.payload.date] = [action.payload.start];
      else state.selectedEvents[action.payload.date].push(action.payload.start);
    },

    removeEvent: (state, action) => {
      const d = state.selectedEvents[action.payload.date];
      d.splice(d.indexOf(action.payload.start), 1);
    },
  },
});

export const { setLabel, addEvent, removeEvent } = slice.actions;

export const selectEvents = (state) => state.infos.selectedEvents;
export const selectLabel = (state) => state.infos.selectedLabel;

export default slice.reducer;
