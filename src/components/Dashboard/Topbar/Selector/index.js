import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import ModalContext from '../../../../context/modal-context';
import DatabaseContext from '../../../../context/database-context';

import { LABEL_EVENTS } from '../../../../graphql/events';

import './index.scss';

const Selector = () => {
  const [label, setLabel] = useState('Choisir un groupe.');
  const [labelId, setLabelId] = useState('');

  const { hideModal, showModal, setModalTitle, setModalContent } = useContext(ModalContext);
  const { setEvents, labels } = useContext(DatabaseContext);

  const [getEvents, { error, data }] = useLazyQuery(LABEL_EVENTS, { variables: { label_id: labelId } });

  useEffect(() => {
    if (data) {
      hideModal();
      setEvents(data.labelEvents);

      console.log(data);

      // Handle data.
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
    setModalTitle('Choisir un groupe.');

    setModalContent(
      <div className='container'>
        <div className='table'>
          {labels.map((label) => (
            <div key={label.id}>
              <p onClick={() => handleChangeScheduleLabel(label)}>{label.label_name}</p>
            </div>
          ))}
        </div>
      </div>
    );

    showModal();
  };

  return (
    <div onClick={handleClick} className='label-picker'>
      <p>{label}</p>
    </div>
  );
};

export default Selector;
