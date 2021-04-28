import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';
import Loader from '../../Loader';

import { fetchEvents, isLoading } from '../../../features/database/eventsSlice';

const StudentDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchEvents()), []);

  const loading = useSelector(isLoading);

  return (
    <div className='flex flex-col w-screen h-screen p-12 box-border'>
      <Loader loading={loading} />
      <Modal />

      <Topbar />
      <Schedule />
    </div>
  );
};

export default StudentDashboard;
