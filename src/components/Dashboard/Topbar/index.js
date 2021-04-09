import React, { Component, useContext } from 'react';

import AuthContext from '../../../context/auth-context';

import './index.scss';

const Topbar = () => {
  const authContext = useContext(AuthContext);

  // TODO : Add groups under name.
  // TODO : Add a selector for the groups.

  return (
    <div className='topbar-container'>
      <div className='text'>
        <h2 className='name'>{authContext.fullName}</h2>
        <h3 className='role'>{authContext.role}</h3>
      </div>
    </div>
  );
};

export default Topbar;
