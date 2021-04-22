import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Forbidden from '../Forbidden';
import Loader from '../Loader';

import { isLoggedIn, selectRole, verifyToken, selectFailed } from '../../features/database/authSlice';

import ROLES from '../../static/roles';

const PrivateRoute = ({ path, component }) => {
  const dispatch = useDispatch();

  const reject = () => <Route path={path} component={Forbidden} />;
  const resolve = () => <Route path={path} component={component} />;
  const pending = () => <Loader loading={true} />;

  const logged = useSelector(isLoggedIn);
  const role = useSelector(selectRole);
  const failed = useSelector(selectFailed);

  useEffect(() => !logged && dispatch(verifyToken()), []);

  if (logged) {
    const rolePath = ROLES[role];
    if (!rolePath || rolePath !== path) return reject();
    return resolve();
  }

  if (failed) {
    return reject();
  }

  return pending();
};

PrivateRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.any,
};

export default PrivateRoute;
