import React from 'react';
import { useHistory } from 'react-router-dom';

import { LogOut } from 'react-feather';

import { useSelector, useDispatch } from 'react-redux';

import { selectName, selectRole, logout } from '../../../../features/database/authSlice';

const Topbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const fullName = useSelector(selectName);
  const role = useSelector(selectRole);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth');
  };

  return (
    <div className='topbar'>
      <div className='text'>
        <h2 className='name'>{fullName}</h2>
        <h3 className='role'>{role}</h3>
      </div>

      <div className='logout'>
        <p onClick={handleLogout} className='responsive-link'>
          Se déconnecter
        </p>
        <LogOut onClick={handleLogout} className='responsive-icon' />
      </div>
    </div>
  );
};

export default Topbar;
