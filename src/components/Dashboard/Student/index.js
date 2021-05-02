import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Topbar from './Topbar';
import Grid from './Grid';
import EditModal from '../EditModal';
import Tooltip from '../../Tooltip';

import { fetchEvents } from '../../../features/database/eventsSlice';

const StudentDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchEvents()), []);

  return (
    <div className='flex flex-col w-screen h-screen p-12 box-border'>
      <EditModal />
      <Tooltip />

      <Topbar />
      <Grid />
    </div>
  );
};

export default StudentDashboard;
