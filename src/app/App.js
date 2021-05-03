import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';

import Auth from '../components/Auth';
import MissedPassword from '../components/MissedPassword';

import Admin from '../components/Admin';

import ProfessorDashboard from '../components/Dashboard/Professor';
import StudentDashboard from '../components/Dashboard/Student';

import ErrorModal from '../components/ErrorModal';
import ErrorPage from '../components/ErrorPage';

const App = () => {
  return (
    <BrowserRouter>
      <ErrorModal />

      <Switch>
        <Redirect from='/' to='/auth' exact />

        <Route path='/auth' component={Auth} />
        <Route path='/missed-password' component={MissedPassword} />

        <PrivateRoute path='/dashboard' component={ProfessorDashboard} />

        <PrivateRoute path='/schedule' component={StudentDashboard} />

        <PrivateRoute path='/admin' component={Admin} />

        <Route path='*'>
          <ErrorPage message="Cette page n'existe pas !" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
