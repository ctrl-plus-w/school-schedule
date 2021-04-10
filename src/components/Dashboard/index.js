import React, { useEffect, useContext, useState } from 'react';

import Topbar from './Topbar';
import Schedule from './Schedule';
import Modal from './Modal';

import EventsContext from '../../context/events-context';
import ModalContext from '../../context/modal-context';
import LabelsContext from '../../context/labels-context';

import { useQuery } from '@apollo/client';

import { EVENTS } from '../../graphql/events';
import { LABELS } from '../../graphql/labels';

// TODO : [ ] Optimise into custom hooks and one context.

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [labels, setLabels] = useState([]);

  const [eventsLoading, setEventsLoading] = useState(true);
  const [labelsLoading, setLabelsLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('Modal Title');
  const [modalContent, setModalContent] = useState(<></>);

  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);

  const setTitle = (title) => setModalTitle(title);
  const setContent = (content) => setModalContent(content);

  const { data: eventsData, error: eventsError } = useQuery(EVENTS);
  const { data: labelsData, error: labelsError } = useQuery(LABELS);

  useEffect(() => {
    eventsError && console.log(eventsError);
    labelsError && console.log(labelsError);
  }, [eventsError, labelsError]);

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData.userEvents);
      setEventsLoading(false);
    }

    if (labelsData) {
      setLabels(labelsData.labels);
      setLabelsLoading(false);
    }
  }, [eventsData, labelsData]);

  return eventsLoading || labelsLoading ? (
    <div className='container center-content'>
      <h1>Loading...</h1>
    </div>
  ) : (
    <ModalContext.Provider value={{ show, hide, setTitle, setContent, visible: modalVisible, title: modalTitle, content: modalContent }}>
      <EventsContext.Provider value={{ events, setEvents }}>
        <LabelsContext.Provider value={labels}>
          <div className='container'>
            <Modal />
            <Topbar />
            <Schedule />
          </div>
        </LabelsContext.Provider>
      </EventsContext.Provider>
    </ModalContext.Provider>
  );
};

export default Dashboard;
