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

// TODO : [x] Create the login page.
// TODO : [x] Create the auth system (logic).
// TODO : [x] Bug! Days scroll doesn't show a part of the last day.
// TODO : [ ] Handle errors on login and on everything error slice / error modal.
// TODO : [x] Remove every unusefull hooks and contexts.
// TODO : [ ] Make the events selection slice.
// TODO : [ ] Use the redux store in the schedule events display.
// TODO : [ ] Setup the modal with redux.
// TODO : [ ] Reset the selectedEvents when reloading the events.
// TODO : [ ] Create a "Personal" schedule for the professors.
// TODO : [ ] Show the label of the group on the "Personal" schedule for the professors.

const App = () => {
  return (
    <BrowserRouter>
      <ErrorModal />

      <Switch>
        <Redirect from='/' to='/auth' exact />

        <Route path='/auth' component={Auth} />
        <Route path='/missed-password' component={MissedPassword} />

        <Route path='/dashboard' component={ProfessorDashboard} />

        <Route path='/schedule' component={StudentDashboard} />

        <Route path='/admin' component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
