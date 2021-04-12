import React, { useContext, useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useLazyQuery } from '@apollo/client';

import DatabaseContext from '../../../../context/database-context';

import { LABEL_EVENTS } from '../../../../graphql/events';

import './index.scss';

const Selector = () => {
  const [visible, setVisible] = useState(false);

  const [label, setLabel] = useState('Choisir un groupe.');
  const [labelId, setLabelId] = useState('');

  const { setEvents, labels } = useContext(DatabaseContext);

  const [getEvents, { data }] = useLazyQuery(LABEL_EVENTS, { variables: { label_id: labelId } });

  useEffect(() => data && setEvents(data.labelEvents), [data]);

  const switchVisibility = () => setVisible((prev) => !prev);

  const handleLabelClick = (_event, { id, label_name }) => {
    setVisible(false);
    setLabelId(id);

    setLabel(label_name);

    getEvents();
  };

  return (
    <div className='label-picker'>
      <div className={`label-header ${visible ? 'active' : ''}`} onClick={switchVisibility}>
        <p>{label}</p>
        <ChevronDown />
      </div>

      <ul className={`label-selector ${visible ? 'visible' : 'hidden'}`}>
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
