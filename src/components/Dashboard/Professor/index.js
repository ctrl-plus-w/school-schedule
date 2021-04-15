import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';

import { isLoggedIn } from '../../../features/database/authSlice';
import { isLoading, fetchOwnedEvents } from '../../../features/database/eventsSlice';

// TODO : [ ] Handle event creation.

const ProfessorDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logged = useSelector(isLoggedIn);
  if (!logged) history.push('/auth');

  useEffect(() => {
    dispatch(fetchOwnedEvents());
  }, []);

  const loading = useSelector(isLoading);

  // temp
  let visible = false;

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

export default ProfessorDashboard;
