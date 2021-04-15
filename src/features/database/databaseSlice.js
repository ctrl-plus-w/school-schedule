import { createSlice } from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';

const slice = createSlice({
  name: 'database',

  initialState: {
    endpoint: 'http://localhost:5000/graphql',
    client: null,
  },

  reducers: {
    setClient: (state) => ({
      ...state,
      client: new GraphQLClient(state.endpoint),
    }),
  },
});

export default slice.reducer;
