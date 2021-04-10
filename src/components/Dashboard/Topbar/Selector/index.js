import React, { useContext, useEffect, useState } from 'react';

import ModalContext from '../../../../context/modal-context';
import LabelsContext from '../../../../context/labels-context';
import EventsContext from '../../../../context/events-context';

import { useLazyQuery } from '@apollo/client';

import { LABEL_EVENTS } from '../../../../graphql/events';

import './index.scss';

const Selector = () => {
  const [label, setLabel] = useState('Choisir un groupe.');
  const [labelId, setLabelId] = useState('');

  const modalContext = useContext(ModalContext);
  const labelsContext = useContext(LabelsContext);
  const eventsContext = useContext(EventsContext);

  const [getEvents, { error, data }] = useLazyQuery(LABEL_EVENTS, { variables: { label_id: labelId } });

  useEffect(() => {
    if (data) {
      modalContext.hide();
      eventsContext.setEvents(data.labelEvents);
      console.log(data.labelEvents);
    }
  }, [data]);

  useEffect(() => {
    error && console.log(error);
  }, [error]);

  const handleChangeScheduleLabel = ({ label_name, id }) => {
    setLabelId(id);
    setLabel(label_name);
    getEvents();
  };

  const handleClick = () => {
    modalContext.setTitle('Choisir un groupe.');

    modalContext.setContent(
      <div className='container'>
        <div className='table'>
          {labelsContext.map((label) => (
            <div key={label.id}>
              <p onClick={() => handleChangeScheduleLabel(label)}>{label.label_name}</p>
            </div>
          ))}
        </div>
      </div>
    );

    modalContext.show();
  };

  return (
    <div onClick={handleClick} className='label-picker'>
      <p>{label}</p>
    </div>
  );
};

export default Selector;
