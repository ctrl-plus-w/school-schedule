import React, { useContext, useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useLazyQuery } from '@apollo/client';

import DatabaseContext from '../../../../../context/database-context';

import { LABEL_EVENTS, OWNED_EVENTS } from '../../../../../graphql/events';

import './index.scss';

const Selector = () => {
  const { setEvents, labels, label, setLabel } = useContext(DatabaseContext);

  const [visible, setVisible] = useState(false);
  const [labelId, setLabelId] = useState('');

  const [getEvents, { data: labelsEvents }] = useLazyQuery(LABEL_EVENTS, { variables: { label_id: labelId } });
  const [getOwnedEvents, { data: ownedEvents }] = useLazyQuery(OWNED_EVENTS);

  useEffect(() => labelsEvents && setEvents(labelsEvents.labelEvents), [labelsEvents]);
  useEffect(() => ownedEvents && setEvents(ownedEvents.ownedEvents), [ownedEvents]);

  const switchVisibility = () => {
    setVisible((prev) => !prev);
  };

  const setScheduleToPersonal = () => {
    setVisible(false);

    setLabel();

    getOwnedEvents();
  };

  const handleLabelClick = (_event, { id, label_name }) => {
    setVisible(false);
    setLabelId(id);

    setLabel(label_name);

    getEvents();
  };

  return (
    <div className='label-picker'>
      <div className={`label-header ${visible ? 'active' : ''}`} onClick={switchVisibility}>
        <p>{label ? label : 'Choisir un groupe.'}</p>
        <ChevronDown />
      </div>

      <ul className={`label-selector ${visible ? 'visible' : 'hidden'}`}>
        <li className='item' onClick={setScheduleToPersonal}>
          Emplois du temps.
        </li>
        {labels.map(({ id, label_name }) => (
          <li className='item' key={id} onClick={(e) => handleLabelClick(e, { id, label_name })}>
            {label_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
