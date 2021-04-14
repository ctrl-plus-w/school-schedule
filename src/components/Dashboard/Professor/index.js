import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from '../Modal';

import ModalContext from '../../../context/modal-context';
import DatabaseContext from '../../../context/database-context';

import useModal from '../../../hooks/useModal';

import { LABELS } from '../../../graphql/labels';
import { OWNED_EVENTS } from '../../../graphql/events';

// TODO : [x] Optimise into custom hooks and one context.
// TODO : [ ] Handle event creation.

const ProfessorDashboard = () => {
  const modal = useModal();

  const [label, setLabel] = useState();
  const [labels, setLabels] = useState([]);
  const [events, setEvents] = useState([]);

  const { data: labelsData, error: labelsError, loading: labelsLoading } = useQuery(LABELS);
  const { data: eventsData, error: eventsError, loading: eventsLoading } = useQuery(OWNED_EVENTS);

  useEffect(() => {
    labelsError && console.error('LabelsError :', labelsError);
    eventsError && console.error('EventsError :', eventsError);
  }, [labelsError, eventsError]);

  useEffect(() => {
    labelsData && setLabels(labelsData.labels);
    eventsData && setEvents(eventsData.ownedEvents);
  }, [labelsData, eventsData]);

  return labelsLoading || eventsLoading ? (
    <div className='container center-content'>
      <h1>Loading...</h1>
    </div>
  ) : (
    <ModalContext.Provider value={modal}>
      <DatabaseContext.Provider value={{ labels, events, setEvents, label, setLabel }}>
        <Modal />
        <div className={`container ${modal.visible ? 'blurred' : ''}`}>
          <Topbar />
          <Schedule />
        </div>
      </DatabaseContext.Provider>
    </ModalContext.Provider>
  );
};

export default ProfessorDashboard;
