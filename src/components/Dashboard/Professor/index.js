import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';
import CreationModal from '../CreationModal';
import Loader from '../../Loader';

import { isLoading, fetchOwnedEvents } from '../../../features/database/eventsSlice';

const ProfessorDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchOwnedEvents()), []);

  const loading = useSelector(isLoading);

  return (
    <div className='root-container'>
      <Loader loading={loading && false} />
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
