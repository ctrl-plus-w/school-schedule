import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Topbar from './Topbar';
import Grid from './Grid';
import EditModal from '../EditModal';
import PlanModal from '../PlanModal';
import Tooltip from '../../Tooltip';

import { fetchOwnedEvents } from '../../../features/database/eventsSlice';

const ProfessorDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchOwnedEvents()), []);

  return (
    <div className='flex flex-col w-screen h-screen p-12 box-border'>
      <PlanModal />
      <EditModal />
      <Tooltip />

      <Topbar />
      <Grid />
    </div>
  );
};

export default ProfessorDashboard;
