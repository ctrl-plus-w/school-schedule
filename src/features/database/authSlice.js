import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from '../../app/database';

import { LOGIN } from '../../graphql/auth';

const ROLES = {
  ADMIN: 'Admin',
  PROFESSOR: 'Enseignant',
  STUDENT: 'Élève',
};

export const login = createAsyncThunk('auth/login', async (args) => {
  try {
    const request = await client.rawRequest(LOGIN, args);
    client.setHeader('Authorization', `Bearer ${request.data.login.token}`);

    return { id: request.data.login.id, fullName: request.data.login.full_name, role: request.data.login.role, token: request.data.login.token };
  } catch (err) {
    throw new Error(err?.response?.errors[0]?.message);
  }
});

const slice = createSlice({
  name: 'auth',

  initialState: {
    loading: false,
    error: '',

    id: '',
    fullName: '',
    role: '',
    token: '',
  },

  reducers: {
    logout: (state) => ({
      ...state,

      id: '',
      fullName: '',
      role: '',
      token: '',
    }),
  },

  extraReducers: (builder) => {
    const pending = (state) => ({ ...state, loading: true });
    const fulfilled = (state, action) => ({ ...state, ...action.payload, loading: false });
    const rejected = (state, action) => ({ ...state, error: action.error, loading: false });

    builder.addCase(login.pending, pending).addCase(login.fulfilled, fulfilled).addCase(login.rejected, rejected);
  },
});

export const { logout } = slice.actions;

export const isLoading = (state) => state.database.auth.loading;

export const isLoggedIn = (state) => state.database.auth.token !== '';
export const selectToken = (state) => state.database.auth.token;
export const selectName = (state) => state.database.auth.fullName;
export const selectRole = (state) => state.database.auth.role;
export const selectId = (state) => state.database.auth.id;

export const isRole = (state) => ({
  isAdmin: state.database.auth.role === ROLES.ADMIN,
  isProfessor: state.database.auth.role === ROLES.PROFESSOR,
  isStudent: state.database.auth.role === ROLES.STUDENT,
});

export default slice.reducer;
