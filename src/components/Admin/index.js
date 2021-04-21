import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Navbar from './Navbar';
import Users from './Users';
import Subjects from './Subjects';
import Labels from './Labels';
import Roles from './Roles';

import './index.scss';

// TODO : [ ] Make a smooth scroll for the tables.
// TODO : [ ] Make a create user page.

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <div className='admin'>
      <Navbar />

      <Switch>
        <Route exact path={path}>
          <h1>Admin Dashboards</h1>
        </Route>

        <Route path={`${path}/users`} component={Users}></Route>
        <Route path={`${path}/subjects`} component={Subjects}></Route>
        <Route path={`${path}/labels`} component={Labels}></Route>
        <Route path={`${path}/roles`} component={Roles}></Route>
      </Switch>
    </div>
  );
};

export default Admin;
