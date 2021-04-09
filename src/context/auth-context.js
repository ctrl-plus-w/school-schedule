import { createContext } from 'react';

const AuthContext = createContext({
  token: '',
  userId: '',
  role: '',

  login: () => {},
  logout: () => {},
});

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
