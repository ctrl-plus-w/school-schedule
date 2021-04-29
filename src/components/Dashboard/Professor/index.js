import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Topbar from './Topbar';
import Grid from './Grid';
import Modal from '../Modal';
import PlanModal from '../PlanModal';
import Loader from '../../Loader';
import Tooltip from '../../Tooltip';

import { isLoading, fetchOwnedEvents } from '../../../features/database/eventsSlice';

const ProfessorDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchOwnedEvents()), []);

  const loading = useSelector(isLoading);

  return (
    <div className='flex flex-col w-screen h-screen p-12 box-border'>
      <Loader loading={loading && false} />
      <PlanModal />
      <Modal />
      <Tooltip />

      <Topbar />
      <Grid />
    </div>
  );
};

export default ProfessorDashboard;
