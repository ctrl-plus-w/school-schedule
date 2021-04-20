/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';
import Loading from '../../Loading';

import { fetchEvents, isLoading } from '../../../features/database/eventsSlice';
import { isLoggedIn } from '../../../features/database/authSlice';
import { useHistory } from 'react-router';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logged = useSelector(isLoggedIn);
  if (!logged) {
    history.push('/auth');
    return <></>;
  }

  const modalVisible = useSelector((state) => state.modals.event.visible || state.modals.create.visible);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const loading = useSelector(isLoading);

  return (
    <div className='root-container'>
      <Loading loading={loading} />
      <Modal />

      <div className={`container ${modalVisible ? 'blurred' : ''}`}>
        <Topbar />
        <Schedule />
      </div>
    </div>
  );
};

export default StudentDashboard;
