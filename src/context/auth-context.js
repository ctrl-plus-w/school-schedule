import { createContext } from 'react';

const AuthContext = createContext({
  token: '',
  setToken: () => {},

  userId: '',
  fullName: '',
  role: '',

  isProfessor: false,
  isStudent: false,
  isAdmin: false,

  login: () => {},
  logout: () => {},
});

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
