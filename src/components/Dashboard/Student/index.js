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
    <div className='root-container'>
      <Loader loading={loading} />
      <Modal />

      <div className='container'>
        <Topbar />
        <Schedule />
      </div>
    </div>
  );
};

export default StudentDashboard;
