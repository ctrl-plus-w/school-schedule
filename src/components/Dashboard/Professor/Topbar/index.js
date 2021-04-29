import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LogOut, Search } from 'react-feather';

import Switch from '../../../Switch';
import DatePicker from '../../../DatePicker';
import Input from '../../../Input';

import { selectName, logout } from '../../../../features/database/authSlice';
import { fetchLabels } from '../../../../features/database/labelsSlice';

// TODO : [x] Put the switcher into a component.
// TODO : [ ] Link switcher to a router / switch.
// TODO : [x] Make a selector element (date).

const Topbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const fullName = useSelector(selectName);

  const [choice, setChoice] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => dispatch(fetchLabels()), []);

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/auth');
  };

  const handleDateChange = () => {};

  const handleSetLabel = () => {};

  const handleInputChange = (event) => {
    setLabel(event.target.value);
  };

  const choices = ['Affichage', 'Édition', 'Planification'];

  return (
    <div className='flex flex-col w-full justify-between '>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center'>
          <h2 className='text-3xl text-black font-bold'>{fullName}</h2>
          <LogOut className='relative top-px ml-3 cursor-pointer' onClick={handleLogout} />
        </div>

        <h3 className='text-lg text-black font-normal'>Histoire, Spé Histoire, Spé Géo</h3>
      </div>

      <div className='flex flex-row justify-between mt-4'>
        <Input value={label} onChange={handleInputChange} icon={<Search size={16} />} onClick={handleSetLabel} placeholder='Groupe' />

        <Switch choices={choices} choice={choice} setChoice={setChoice} />

        <DatePicker handleDateChange={handleDateChange} className='' />
      </div>
    </div>
  );
};

export default Topbar;
