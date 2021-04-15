import { createSlice } from '@reduxjs/toolkit';

import client from '../../app/database';

import { LOGIN } from '../../graphql/auth';

const ROLES = {
  ADMIN: 'Admin',
  PROFESSOR: 'Enseignant',
  STUDENT: 'Élève',
};

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

  reducers: {
    loginLoading: (state) => ({
      ...state,
      loading: true,
    }),

    loginSuccess: (state, action) => {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    },

    loginFailed: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  },
});

export const { loginLoading, loginSuccess, loginFailed } = slice.actions;

export const selectRole = (state) => ({
  isAdmin: state.auth.role === ROLES.ADMIN,
  isProfessor: state.auth.role === ROLES.PROFESSOR,
  isStudent: state.auth.role === ROLES.STUDENT,
});

export default slice.reducer;

export const login = async (dispatch, params) => {
  dispatch(loginLoading());

  try {
    const { data } = await client.rawRequest(LOGIN, params);
    dispatch(loginSuccess({ id: data.login.id, fullName: data.login.full_name, role: data.login.role, token: data.login.token }));
  } catch (data) {
    if (data.response) console.error(loginFailed(data?.response?.errors[0]?.message));
  }
};
