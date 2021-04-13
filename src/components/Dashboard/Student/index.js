import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';

import ModalContext from '../../MissedPassword/context/modal-context';
import DatabaseContext from '../../MissedPassword/context/database-context';

import useModal from '../../../hooks/useModal';

import { EVENTS } from '../../../graphql/events';

const StudentDashboard = () => {
  const modal = useModal();

  const [events, setEvents] = useState([]);

  const { data, error, loading } = useQuery(EVENTS);

  useEffect(() => error && console.error('EventsError :', error), [error]);
  useEffect(() => data && setEvents(data.userEvents), [data]);

  return loading ? (
    <div className='container center-content'>
      <h1>Loading...</h1>
    </div>
  ) : (
    <ModalContext.Provider value={modal}>
      <DatabaseContext.Provider value={{ events }}>
        <Modal />
        <div className={`container ${modal.visible ? 'blurred' : ''}`}>
          <Topbar />
          <Schedule />
        </div>
      </DatabaseContext.Provider>
    </ModalContext.Provider>
  );
};

export default StudentDashboard;
