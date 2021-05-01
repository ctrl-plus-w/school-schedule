import React from 'react';
import { useHistory } from 'react-router-dom';

import { LogOut } from 'react-feather';

import { useSelector, useDispatch } from 'react-redux';

import { selectName, logout } from '../../../../features/database/authSlice';

import DatePicker from '../../../DatePicker';

// TODO : [ ] Fetch the user labels.

const Topbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const fullName = useSelector(selectName);

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/auth');
  };

  return (
    <div className='flex flex-row w-full justify-between '>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center'>
          <h2 className='text-3xl text-black font-bold'>{fullName}</h2>
          <LogOut className='relative top-px ml-3 cursor-pointer' onClick={handleLogout} />
        </div>
        <h3 className='text-lg text-black font-normal'>1ère2, Spé NSI, Spé Maths, Spé LLCE</h3>
      </div>

      <div className='self-end'>
        <DatePicker />
      </div>
    </div>
  );
};

export default Topbar;
