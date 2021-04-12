import React from 'react';

import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './main.scss';

import Auth from './components/Auth';
import Admin from './components/Admin';
import MissedPassword from './components/MissedPassword';

import ProfessorDashboard from './components/ProfessorDashboard';
import StudentDashboard from './components/StudentDashboard';

import { AuthProvider } from './context/auth-context';

import useAuth from './hooks/useAuth';

// TODO : [x] Create the login page.
// TODO : [x] Create the auth system (logic).
// TODO : [x] Bug! Days scroll doesn't show a part of the last day.

const App = () => {
  const auth = useAuth();

  const setAuthContext = (_op, prevCtx) => ({ ...prevCtx, headers: { ...prevCtx.headers, Authorization: auth.token ? `Bearer ${auth.token}` : '' } });

  const httpLink = new createHttpLink({ uri: 'http://localhost:5000/graphql' });
  const client = new ApolloClient({ link: ApolloLink.from([setContext(setAuthContext), httpLink]), cache: new InMemoryCache() });

  return (
    <ApolloProvider client={client}>
      <AuthProvider value={auth}>
        <BrowserRouter>
          <Switch>
            <Redirect from='/' to='/auth' exact />
            <Route path='/admin' component={Admin} />
            <Route path='/auth' component={Auth} />
            <Route path='/missed-password' component={MissedPassword} />
            {auth.isProfessor && <Route path='/dashboard' component={ProfessorDashboard} />}
            {auth.isStudent && <Route path='/dashboard' component={StudentDashboard} />}

            <Redirect to='/auth' />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
