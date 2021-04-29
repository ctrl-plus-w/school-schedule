import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from '../../app/database';

import { LOGIN, VERIFY_TOKEN } from '../../graphql/auth';

import { reset as resetEvents } from './eventsSlice';
import { reset as resetLabels } from './labelsSlice';
import { reset as resetSubjects } from './subjectsSlice';
import { reset as resetUsers } from './usersSlice';
import { reset as resetRoles } from './rolesSlice';

import { reset as resetErrorModal } from '../modals/errorSlice';

const ROLES = {
  ADMIN: 'Admin',
  PROFESSOR: 'Enseignant',
  STUDENT: 'Élève',
};

export const logout = createAsyncThunk('auth/logout', async (_args, { dispatch }) => {
  await localStorage.removeItem('token');

  await dispatch(resetLabels());
  await dispatch(resetSubjects());
  await dispatch(resetUsers());
  await dispatch(resetRoles());
  await dispatch(resetEvents());

  await dispatch(resetErrorModal());

  return;
});

export const login = createAsyncThunk('auth/login', async (args) => {
  try {
    const request = await client.rawRequest(LOGIN, args);

    const token = await request.data.login.token;

    await client.setHeader('Authorization', `Bearer ${token}`);
    await localStorage.setItem('token', token);

    return {
      id: request.data.login.id,
      fullName: request.data.login.full_name,
      role: request.data.login.role,
      token: request.data.login.token,
      subjects: request.data.login.subjects,
      labels: request.data.login.labels,
    };
  } catch (err) {
    throw new Error(err?.response?.errors[0]?.message);
  }
});

export const verifyToken = createAsyncThunk('auth/verifyToken', async () => {
  try {
    const token = localStorage.getItem('token');
    client.setHeader('Authorization', `Bearer ${token}`);

    const request = await client.rawRequest(VERIFY_TOKEN);

    return {
      id: request.data.verifyToken.id,
      fullName: request.data.verifyToken.full_name,
      role: request.data.verifyToken.role,
      token: request.data.verifyToken.token,
      subjects: request.data.verifyToken.subjects,
      labels: request.data.verifyToken.labels,
    };
  } catch (err) {
    throw new Error();
  }
});

const initialState = {
  loading: false,
  error: '',
  failed: false,

  id: '',
  fullName: '',
  role: '',
  token: '',
  subjects: [],
  labels: [],
};

const slice = createSlice({
  name: 'auth',

  initialState: initialState,

  reducers: {
    setError: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },

  extraReducers: (builder) => {
    const pending = (state) => ({ ...state, loading: true });
    const fulfilled = (state, action) => ({ ...state, ...action.payload, loading: false });
    const rejected = (state, action) => ({ ...state, error: action.error.message, loading: false });

    const rejectedNoMessage = (state) => ({ ...state, failed: true, loading: false });

    builder.addCase(login.pending, pending).addCase(login.fulfilled, fulfilled).addCase(login.rejected, rejected);

    builder.addCase(verifyToken.pending, pending).addCase(verifyToken.fulfilled, fulfilled).addCase(verifyToken.rejected, rejectedNoMessage);

    builder.addCase(logout.fulfilled, () => initialState);
  },
});

export const { setError, setAuth } = slice.actions;

export const isLoading = (state) => state.database.auth.loading;
export const selectFailed = (state) => state.database.auth.failed;
export const isLoggedIn = (state) => state.database.auth.token !== '';
export const selectToken = (state) => state.database.auth.token;
export const selectName = (state) => state.database.auth.fullName;
export const selectRole = (state) => state.database.auth.role;
export const selectId = (state) => state.database.auth.id;
export const selectError = (state) => state.database.auth.error;
export const selectSubjects = (state) => state.database.auth.subjects;
export const selectLabels = (state) => state.database.auth.labels;

export const isRole = (state) => ({
  isAdmin: state.database.auth.role === ROLES.ADMIN,
  isProfessor: state.database.auth.role === ROLES.PROFESSOR,
  isStudent: state.database.auth.role === ROLES.STUDENT,
});

export default slice.reducer;
