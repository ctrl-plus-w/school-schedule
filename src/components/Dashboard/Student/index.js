import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Topbar from './Topbar';
import Grid from './Grid';
import EditModal from '../EditModal';
import Loader from '../../Loader';
import Tooltip from '../../Tooltip';

import { fetchEvents, isLoading } from '../../../features/database/eventsSlice';

const StudentDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchEvents()), []);

  const loading = useSelector(isLoading);

  return (
    <div className='flex flex-col w-screen h-screen p-12 box-border'>
      <Loader loading={loading} />
      <EditModal />
      <Tooltip />

      <Topbar />
      <Grid />
    </div>
  );
};

export default StudentDashboard;
