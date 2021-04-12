import React from 'react';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from './Modal';

import ModalContext from '../../context/modal-context';
import DatabaseContext from '../../context/database-context';

import useDatabase from '../../hooks/useDatabase';
import useModal from '../../hooks/useModal';

// TODO : [x] Optimise into custom hooks and one context.

const Dashboard = () => {
  const database = useDatabase();
  const modal = useModal();

  return database.loading ? (
    <div className='container center-content'>
      <h1>Loading...</h1>
    </div>
  ) : (
    <ModalContext.Provider value={modal}>
      <DatabaseContext.Provider value={database}>
        <Modal />
        <div className={`container ${modal.visible ? 'blurred' : ''}`}>
          <Topbar />
          <Schedule />
        </div>
      </DatabaseContext.Provider>
    </ModalContext.Provider>
  );
};

export default Dashboard;
