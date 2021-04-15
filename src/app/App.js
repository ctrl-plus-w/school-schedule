import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import './main.scss';
import '../components/Dashboard/index.scss';

import Auth from '../components/Auth';
import MissedPassword from '../components/MissedPassword';

import Admin from '../components/Admin';

import ProfessorDashboard from '../components/Dashboard/Professor';
import StudentDashboard from '../components/Dashboard/Student';

import ErrorModal from '../components/ErrorModal';

import { AuthProvider } from '../context/auth-context';
import { ErrorsProvider } from '../context/errors-context';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

// TODO : [x] Create the login page.
// TODO : [x] Create the auth system (logic).
// TODO : [x] Bug! Days scroll doesn't show a part of the last day.

const App = () => {
  const auth = useAuth();
  const error = useError();

  return (
    <BrowserRouter>
      <ErrorsProvider value={error}>
        <AuthProvider value={auth}>
          <ErrorModal />

          <Switch>
            <Redirect from='/' to='/auth' exact />

            <Route path='/auth' component={Auth} />
            <Route path='/missed-password' component={MissedPassword} />

            {auth.isProfessor && (
              <>
                <Route path='/dashboard' component={ProfessorDashboard} />
              </>
            )}

            {auth.isStudent && (
              <>
                <Route path='/dashboard' component={StudentDashboard} />
              </>
            )}

            {auth.isAdmin && (
              <>
                <Route path='/admin' component={Admin} />
              </>
            )}

            <Redirect to='/' />
          </Switch>
        </AuthProvider>
      </ErrorsProvider>
    </BrowserRouter>
  );
};

export default App;
