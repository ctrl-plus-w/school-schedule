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

    userId: '',
    fullName: '',
    role: '',
    token: '',
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(login.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        loading: false,
      }))
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      });
  },
});

export const { loginLoading, loginSuccess, loginFailed } = slice.actions;

export const isLoading = (state) => state.auth.loading;

export const selectToken = (state) => state.auth.token;

export const selectRole = ({ auth: { role } }) => ({
  isAdmin: role === ROLES.ADMIN,
  isProfessor: role === ROLES.PROFESSOR,
  isStudent: role === ROLES.STUDENT,
});

export default slice.reducer;
