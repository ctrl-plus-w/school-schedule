import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'database',

  initialState: {
    endpoint: 'http://localhost:5000/graphql',
    client: null,
  },

  reducers: {},
});

export default slice.reducer;
