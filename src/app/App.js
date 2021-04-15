import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import './main.scss';
import '../components/Dashboard/index.scss';

import Auth from '../components/Auth';
import MissedPassword from '../components/MissedPassword';

import Admin from '../components/Admin';

import ProfessorDashboard from '../components/Dashboard/Professor';
import StudentDashboard from '../components/Dashboard/Student';

import ErrorModal from '../components/ErrorModal';

import { selectRole } from '../features/database/authSlice';

import { ErrorsProvider } from '../context/errors-context';

import useError from '../hooks/useError';

// TODO : [x] Create the login page.
// TODO : [x] Create the auth system (logic).
// TODO : [x] Bug! Days scroll doesn't show a part of the last day.

const App = () => {
  const { isAdmin, isStudent, isProfessor } = useSelector(selectRole);
  const error = useError();

  console.log(isStudent, isProfessor);

  return (
    <BrowserRouter>
      <ErrorsProvider value={error}>
        <ErrorModal />

        <Switch>
          <Redirect from='/' to='/auth' exact />

          <Route path='/auth' component={Auth} />
          <Route path='/missed-password' component={MissedPassword} />

          {isProfessor && (
            <>
              <Route path='/dashboard' component={ProfessorDashboard} />
            </>
          )}

          {isStudent && (
            <>
              <Route path='/dashboard' component={StudentDashboard} />
            </>
          )}

          {isAdmin && (
            <>
              <Route path='/admin' component={Admin} />
            </>
          )}

          <Redirect to='/' />
        </Switch>
      </ErrorsProvider>
    </BrowserRouter>
  );
};

export default App;
