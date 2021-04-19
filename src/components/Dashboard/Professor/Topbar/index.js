/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Selector from '../../../Selector';

import { selectName, selectRole, logout } from '../../../../features/database/authSlice';
import { selectLabels, fetchLabels } from '../../../../features/database/labelsSlice';
import { fetchLabelEvents } from '../../../../features/database/eventsSlice';
import { selectLabel, setLabel } from '../../../../features/infos/infosSlice';
import { config } from '../../../../features/modals/createSlice';

const Topbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const labels = useSelector(selectLabels);
  const fullName = useSelector(selectName);
  const role = useSelector(selectRole);

  const label = useSelector(selectLabel);

  useEffect(() => {
    dispatch(fetchLabels());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth');
  };

  const handleChange = ({ id, name }) => {
    dispatch(setLabel({ id, name }));
    dispatch(fetchLabelEvents({ id: id }));
  };

  const handleCreateEvent = () => {
    const payload = {
      title: 'Réserver des cours.',
      description: 'Les paramètres globaux seront appliqués à toutes les heures.',
    };

    dispatch(config(payload));
  };

  return (
    <div className='topbar'>
      <div className='text'>
        <h2 className='name'>{fullName}</h2>
        <h3 className='role'>{role}</h3>
      </div>

      <div className='label-selector'>
        <Selector
          items={labels.map((l) => ({ id: l.id, name: l.label_name }))}
          selected={label}
          setSelected={handleChange}
          placeholder='Choisir un groupe.'
        />
      </div>

      <div className='event-creator'>
        <button type='button' className='create-event-button' onClick={handleCreateEvent}>
          Réserver
        </button>
      </div>

      <div className='logout'>
        <p onClick={handleLogout}>Se déconnecter</p>
      </div>
    </div>
  );
};

export default Topbar;
