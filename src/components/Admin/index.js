/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, useRouteMatch, useParams, Link } from 'react-router-dom';

import Navbar from './Navbar';
import Users from './Users';

import './index.scss';

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
