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

import { ErrorsProvider } from '../context/errors-context';

import useError from '../hooks/useError';

// TODO : [x] Create the login page.
// TODO : [x] Create the auth system (logic).
// TODO : [x] Bug! Days scroll doesn't show a part of the last day.

const App = () => {
  const error = useError();

  return (
    <BrowserRouter>
      <ErrorsProvider value={error}>
        <ErrorModal />

        <Switch>
          <Redirect from='/' to='/auth' exact />

          <Route path='/auth' component={Auth} />
          <Route path='/missed-password' component={MissedPassword} />

          <Route path='/dashboard' component={ProfessorDashboard} />

          <Route path='/schedule' component={StudentDashboard} />

          <Route path='/admin' component={Admin} />
        </Switch>
      </ErrorsProvider>
    </BrowserRouter>
  );
};

export default App;
