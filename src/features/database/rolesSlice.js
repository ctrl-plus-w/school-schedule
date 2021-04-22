import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from '../../app/database';

import { ROLES } from '../../graphql/roles';

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  try {
    const roles = await client.request(ROLES);
    return roles.roles;
  } catch (err) {
    throw new Error(err?.response?.errors[0]?.message);
  }
});

const slice = createSlice({
  name: 'roles',

  initialState: {
    error: '',
    loading: false,
    roles: [],
  },

  extraReducers: (builder) => {
    const pending = (state) => ({ ...state, loading: true });
    const fulfilled = (state, action) => ({ ...state, roles: action.payload, loading: false });
    const rejected = (state, action) => ({ ...state, error: action.error, loading: false });

    builder.addCase(fetchRoles.pending, pending).addCase(fetchRoles.fulfilled, fulfilled).addCase(fetchRoles.rejected, rejected);
  },
});

export const selectRoles = (state) => state.database.roles.roles;

export const isLoading = (state) => state.database.roles.loading;

export default slice.reducer;
