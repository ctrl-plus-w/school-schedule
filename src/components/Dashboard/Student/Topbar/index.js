import React from 'react';
import { useHistory } from 'react-router-dom';

import { LogOut } from 'react-feather';

import { useSelector, useDispatch } from 'react-redux';

import { selectName, logout, selectLabels } from '../../../../features/database/authSlice';

import DatePicker from '../../../DatePicker';

const Topbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const fullName = useSelector(selectName);
  const labels = useSelector(selectLabels);

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/auth');
  };

  return (
    <div className='flex flex-row w-full justify-between '>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center'>
          <h2 className='text-3xl text-black font-bold'>{fullName}</h2>
          <LogOut className='relative top-px ml-3 cursor-pointer transition-all hover:text-blue-500' onClick={handleLogout} />
        </div>
        <h3 className='text-lg text-black font-normal'>
          {labels.length ? labels.map((label) => label.label_name) : "Vous n'êtes assigné à aucun groupe."}
        </h3>
      </div>

      <div className='self-end'>
        <DatePicker />
      </div>
    </div>
  );
};

export default Topbar;
