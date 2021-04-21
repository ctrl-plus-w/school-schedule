import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';
import CreationModal from '../CreationModal';
import Loading from '../../Loading';

import { isLoading, fetchOwnedEvents } from '../../../features/database/eventsSlice';

const ProfessorDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchOwnedEvents()), []);

  const loading = useSelector(isLoading);

  return (
    <div className='root-container'>
      <Loading loading={loading} />
      <CreationModal />
      <Modal />

      <div className='container'>
        <Topbar />
        <Schedule />
      </div>
    </div>
  );
};

export default ProfessorDashboard;
