import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';

import Auth from '../components/Auth';
import MissedPassword from '../components/MissedPassword';

import Admin from '../components/Admin';

import ProfessorDashboard from '../components/Dashboard/Professor';
import StudentDashboard from '../components/Dashboard/Student';

import ErrorModal from '../components/ErrorModal';

// TODO : [x] Create the login page.
// TODO : [x] Create the auth system (logic).
// TODO : [x] Bug! Days scroll doesn't show a part of the last day.
// TODO : [-] Handle errors on login and on everything error slice / error modal.
// TODO : [x] Remove every unusefull hooks and contexts.
// TODO : [x] Make the events selection slice.
// TODO : [x] Use the redux store in the schedule events display.
// TODO : [x] Setup the modal with redux.
// TODO : [x] Reset the selectedEvents when reloading the events.
// TODO : [x] Create a "Personal" schedule for the professors.
// TODO : [x] Show the label of the group on the "Personal" schedule for the professors.
// TODO : [x] Add a "link" field on the create event modal.
// TODO : [x] Clear the input when sending the creation modal.
// TODO : [x] Disable the delete button if the owner of the event isn't the logged in user.
// TODO : [x] When creating an event, fetch all the events of the users of the label and gray the cells where user have events.
// TODO : [x] Make the name / role clickable to set the schedule to "Personal".
// TODO : [x] Topbar selector, cancel the action when value is empty.
// TODO : [x] Make a function to fetch the labels events and the label events.
// TODO : [x] Add colors for each subject and labels.
// TODO : [x] Make the events editable.
// TODO : [x] Save token.
// TODO : [x] Clear auth errors when logout.
// TODO : [x] Clear selected events whend logout.

// TODO : [x] Make the label selection.
// TODO : [x] Check if the events empty when reloading.
// TODO : [x]  Make the edition modal work.
// TODO : [x] Work on the animations.
// TODO : [x] Problem when creating the events.
// TODO : [x] Planification tab enabled while on the personal schedule.

// // TODO : [ ] Make a subsriber to refect events when created (only for the selected label).

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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
