import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Navbar from './Navbar';
import Users from './Users';

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
      </Switch>
    </div>
  );
};

export default Admin;
