import React, { useState, useEffect } from 'react';

import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './main.scss';

import Auth from './components/Auth';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import MissedPassword from './components/MissedPassword';

import { AuthProvider } from './context/auth-context';

// TODO : [ ] Create the login page.
// TODO : [ ] Create the auth system (logic).

const App = () => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState({});

  const login = (token, tokenExpiration, userId, role, fullName) => {
    setToken(token);
    setUserId(userId);
    setFullName(fullName);
    setRole(role);
  };

  const logout = () => {
    setToken('');
    setUserId('');
    setRole({});
  };

  const httpLink = new createHttpLink({
    uri: 'http://localhost:5000/graphql',
  });

  const testLink = setContext((operation, previousContext) => ({
    ...previousContext,

    headers: {
      ...previousContext.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));

  const client = new ApolloClient({
    link: ApolloLink.from([testLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider value={{ token, userId, fullName, role, login, logout }}>
        <BrowserRouter>
          <Switch>
            {token ? (
              <>
                <Redirect from='/' to='/dashboard' exact />
                <Route path='/admin' component={Admin} />
                <Route path='/dashboard' component={Dashboard} />
              </>
            ) : (
              <>
                <Redirect from='/' to='/auth' exact />
                <Route path='/auth' component={Auth} />
                <Route path='/missed-password' component={MissedPassword} />
              </>
            )}
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
