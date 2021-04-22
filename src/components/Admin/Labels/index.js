import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';

import { Plus } from 'react-feather';

import { fetchLabels } from '../../../features/database/labelsSlice';

import List from './List';
import Create from './Create';
import { Link } from 'react-router-dom';

const Users = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchLabels()), []);

  return (
    <div className='category-container'>
      <header className='header'>
        <div className='title'>
          <Link to={`${path}`} className='link'>
            <h1>Labels</h1>
          </Link>
          <Link to={`${path}/create`} className='link-icon'>
            <Plus />
          </Link>
        </div>
      </header>

      <Switch>
        <Route path={`${path}`} component={List} exact />
        <Route path={`${path}/create`} component={Create} />
      </Switch>
    </div>
  );
};

export default Users;
