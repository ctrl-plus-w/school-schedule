/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { isLoggedIn, selectRole, verifyToken, isLoading } from '../../features/database/authSlice';

import ROLES from '../../static/roles';

import Forbidden from '../Forbidden';

import Loader from '../Loader';

const PrivateRoute = ({ path, component }) => {
  const dispatch = useDispatch();

  const reject = () => <Route path={path} component={Forbidden} />;
  const resolve = () => <Route path={path} component={component} />;
  const pending = () => <Loader loading={true} />;

  const logged = useSelector(isLoggedIn);
  const role = useSelector(selectRole);
  const loading = useSelector(isLoading);

  // If not using this, the loader goes [false -> true -> false]. Because there is a time between load and dispatch.
  const [requestLoading, setRequestLoading] = useState(true);

  useEffect(async () => {
    // ! Keep async await.
    await dispatch(verifyToken());
    setRequestLoading(false);
  }, []);

  if (loading || requestLoading) return pending();
  if (!logged || !role) return reject();

  const expectedPath = ROLES.find((ROLE) => ROLE.name === role).path;
  if (path !== expectedPath) return reject();

  return resolve();
};

PrivateRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.any,
};

export default PrivateRoute;
