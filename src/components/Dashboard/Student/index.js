/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';

import ModalContext from '../../../context/modal-context';
import DatabaseContext from '../../../context/database-context';

import useModal from '../../../hooks/useModal';

const StudentDashboard = () => {
  const modal = useModal();

  const [events] = useState([]);

  let loading = false;

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
