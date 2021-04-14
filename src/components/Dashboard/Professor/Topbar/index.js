import React, { useContext, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../../../context/auth-context';
import DatabaseContext from '../../../../context/database-context';

import Selector from '../../../Selector';

import { LABEL_EVENTS } from '../../../../graphql/events';

const Topbar = () => {
  const history = useHistory();

  const { setEvents, labels } = useContext(DatabaseContext);
  const authContext = useContext(AuthContext);

  const [selected, setSelected] = useState('');
  const [labelId, setLabelId] = useState('');

  const [getEvents] = useLazyQuery(LABEL_EVENTS, {
    variables: { label_id: labelId },
    onCompleted: (data) => setEvents(data.labelEvents),
  });

  const logout = () => {
    history.push('/auth');
    authContext.logout();
  };

  const handleChange = (labelName) => {
    setSelected(labelName);

    const label = labels.find((l) => l.label_name === labelName);
    if (!label) return;

    setLabelId(label.id);
    getEvents();
  };

  return (
    <div className='topbar'>
      <div className='text'>
        <h2 className='name'>{authContext.fullName}</h2>
        <h3 className='role'>{authContext.role}</h3>
      </div>

      <div className='label-selector'>
        <Selector
          items={labels.map((l) => ({ id: l.id, name: l.label_name }))}
          selected={selected}
          setSelected={handleChange}
          placeholder='Choisir un groupe.'
        />
      </div>

      <div className='logout'>
        <p onClick={logout}>Se déconnecter</p>
      </div>
    </div>
  );
};

export default Topbar;
