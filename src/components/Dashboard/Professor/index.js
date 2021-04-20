import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';
import CreationModal from '../CreationModal';
import Loading from '../../Loading';

import { isLoggedIn } from '../../../features/database/authSlice';
import { isLoading, fetchOwnedEvents } from '../../../features/database/eventsSlice';

// TODO : [ ] Handle event creation.

const ProfessorDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logged = useSelector(isLoggedIn);
  if (!logged) {
    history.push('/auth');
    return <></>;
  }

  const modalVisible = useSelector((state) => state.modals.event.visible || state.modals.create.visible);

  useEffect(() => {
    dispatch(fetchOwnedEvents());
  }, []);

  const loading = useSelector(isLoading);

  return (
    <>
      <Loading loading={loading} />
      <CreationModal />
      <Modal />

      <div className={`container ${modalVisible ? 'blurred' : ''}`}>
        <Topbar />
        <Schedule />
      </div>
    </>
  );
};

export default ProfessorDashboard;
