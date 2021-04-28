import React from 'react';
import { useHistory } from 'react-router-dom';

import { ChevronLeft, ChevronRight } from 'react-feather';

import { useSelector, useDispatch } from 'react-redux';

import { selectName, logout } from '../../../../features/database/authSlice';

// TODO : [ ] Fetch the user labels.

const Topbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const fullName = useSelector(selectName);

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/auth');
  };

  // Temp
  handleLogout;

  const handleDateChange = () => {};

  return (
    <div className='flex flex-row w-full justify-between '>
      <div className='flex flex-col'>
        <h2 className='text-3xl text-black font-bold'>{fullName}</h2>
        <h3 className='text-lg text-black font-normal'>1ère2, Spé NSI, Spé Maths, Spé LLCE</h3>
      </div>

      <div className='flex flex-row mt-auto  text-white'>
        <div className='flex items-center bg-black p-1.5 rounded-sm' onClick={handleDateChange}>
          <ChevronLeft size={26} />
        </div>

        <div className='flex bg-black h-auto flex-1 mx-3 px-4 py-1.5 rounded-sm'>
          <p className='text-normal font-bold'>15 Fev. - 22 Fev.</p>
        </div>

        <div className='flex items-center bg-black p-1.5 rounded-sm' onClick={handleDateChange}>
          <ChevronRight size={26} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
