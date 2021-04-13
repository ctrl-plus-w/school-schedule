import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';

import Homepage from './Homepage';
import Users from './Users';

import './index.scss';

const Admin = () => {
  const { path, url } = useRouteMatch();

  return (
    <div className='admin'>
      <div className='navbar'>
        <ul className='items'>
          <li className='link'>
            <Link to={`${url}/homepage`}>Homepage</Link>
          </li>
          <li className='link'>
            <Link to={`${url}/users`}>Users</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route exact path={`${path}/homepage`}>
          <Homepage />
        </Route>
        <Route exact path={`${path}/users`}>
          <Users />
        </Route>
      </Switch>
    </div>
  );
};

export default Admin;
