import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LogOut } from 'react-feather';

import Switch from '../../../Switch';
import DatePicker from '../../../DatePicker';
import Dropdown from '../../../Dropdown';

import { selectName, logout } from '../../../../features/database/authSlice';
import { fetchLabels, selectLabels } from '../../../../features/database/labelsSlice';
import { selectDashboardState, DASHBOARD_STATES, switchDashboardState, selectLabel, setLabelAndFetch } from '../../../../features/infos/infosSlice';

const Topbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const fullName = useSelector(selectName);
  const dashboardState = useSelector(selectDashboardState);

  const label = useSelector(selectLabel);
  const labels = useSelector(selectLabels);

  const [labelLoading, setLabelLoading] = useState(false);

  useEffect(() => dispatch(fetchLabels()), []);

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/auth');
  };

  const handleSetLabel = async (val) => {
    await setLabelLoading(true);
    await dispatch(setLabelAndFetch(val));
    setLabelLoading(false);
  };

  const handleSwitchState = (state) => {
    dispatch(switchDashboardState(DASHBOARD_STATES[state]));
  };

  return (
    <div className='flex flex-col w-full justify-between '>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center'>
          <h2 className='text-3xl text-black font-bold'>{fullName}</h2>
          <LogOut className='relative top-px ml-3 cursor-pointer transition-all hover:text-blue-500' onClick={handleLogout} />
        </div>

        <h3 className='text-lg text-black font-normal'>Histoire, Spé Histoire, Spé Géo</h3>
      </div>

      <div className='flex flex-row justify-between mt-4'>
        <Dropdown options={labels.map(({ label_name }) => label_name)} onSubmit={handleSetLabel} placeholder='Groupe' loading={labelLoading} />

        <Switch choices={DASHBOARD_STATES} choice={dashboardState} setChoice={handleSwitchState} disabled={label ? -1 : 2} />

        <DatePicker />
      </div>
    </div>
  );
};

export default Topbar;
