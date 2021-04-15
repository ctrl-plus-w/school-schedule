/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';

import { fetchEvents, isLoading } from '../../../features/database/eventsSlice';

const StudentDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const loading = useSelector(isLoading);

  // temp
  const visible = false;

  return loading ? (
    <div className='container center-content'>
      <h1>Loading...</h1>
    </div>
  ) : (
    <>
      <Modal />
      <div className={`container ${visible ? 'blurred' : ''}`}>
        <Topbar />
        <Schedule />
      </div>
    </>
  );
};

export default StudentDashboard;
