/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isLoggedIn, selectRole } from '../../features/database/authSlice';

import ROLES from '../../static/ROLES';

import Forbidden from '../Forbidden';

const PrivateRoute = ({ path, component }) => {
  const reject = () => <Route path={path} component={Forbidden} />;
  const resolve = () => <Route path={path} component={component} />;

  const logged = useSelector(isLoggedIn);
  const role = useSelector(selectRole);

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
