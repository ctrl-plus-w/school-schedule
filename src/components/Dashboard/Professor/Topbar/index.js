/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Selector from '../../../Selector';

import { selectName, selectRole, logout } from '../../../../features/database/authSlice';
import { selectLabels, fetchLabels } from '../../../../features/database/labelsSlice';
import { fetchLabelEvents, fetchLabelRelatedEvents, fetchOwnedEvents } from '../../../../features/database/eventsSlice';
import { resetEvents, selectLabel, setLabel } from '../../../../features/infos/infosSlice';
import { config } from '../../../../features/modals/createSlice';

const Topbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const labels = useSelector(selectLabels);
  const fullName = useSelector(selectName);
  const role = useSelector(selectRole);

  const label = useSelector(selectLabel);

  const PERSONAL_FIELD = 'Personnel';

  useEffect(() => {
    dispatch(fetchLabels());
  }, []);

  const labelObject = (l) => ({ id: l.id, name: l.label_name });

  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth');
  };

  const handleChange = async ({ id, name }) => {
    await dispatch(resetEvents());

    if (name === PERSONAL_FIELD) {
      await dispatch(setLabel({}));
      await dispatch(fetchOwnedEvents());
    } else {
      // ! Keep the await and the order.
      await dispatch(setLabel({ id, name }));
      await dispatch(fetchLabelEvents({ id: id }));
      await dispatch(fetchLabelRelatedEvents({ id: id }));
    }
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
          items={[...labels.map(labelObject), { id: PERSONAL_FIELD, name: PERSONAL_FIELD }]}
          selected={label}
          setSelected={handleChange}
          placeholder='Choisir un groupe.'
        />
      </div>

      {Object.keys(label).length > 0 && (
        <div className='event-creator'>
          <button type='button' className='create-event-button' onClick={handleCreateEvent}>
            Réserver
          </button>
        </div>
      )}

      <div className='logout'>
        <p onClick={handleLogout}>Se déconnecter</p>
      </div>
    </div>
  );
};

export default Topbar;
