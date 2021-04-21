import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from '../../app/database';

import { addError } from '../modals/errorSlice';

import { USERS } from '../../graphql/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_args, { dispatch }) => {
  try {
    const users = await client.request(USERS);
    return users.users;
  } catch (err) {
    const message = err?.response?.errors[0]?.message;
    dispatch(addError({ title: 'Erreur (fetchUsers)', message }));
    throw new Error(message);
  }
});

const slice = createSlice({
  name: 'users',

  initialState: {
    loading: false,
    users: [],
    error: '',
  },

  extraReducers: (builder) => {
    const pending = (state) => ({ ...state, loading: true });
    const fulfilled = (state, action) => ({ ...state, users: action.payload, loading: false });
    const rejected = (state, action) => ({ ...state, error: action.payload, loading: false });

    builder.addCase(fetchUsers.pending, pending).addCase(fetchUsers.fulfilled, fulfilled).addCase(fetchUsers.rejected, rejected);
  },
});

export const selectUsers = (state) => state.database.users.users;
export const isLoading = (state) => state.database.users.loading;

export default slice.reducer;
