import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Selector from '../../../Selector';

import { selectName, selectRole, logout } from '../../../../features/database/authSlice';
import { selectLabels, fetchLabels } from '../../../../features/database/labelsSlice';
import { fetchLabelEvents } from '../../../../features/database/eventsSlice';

import { selectLabel, setLabel } from '../../../../features/infos/infosSlice';

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

  const handleChange = (labelName) => {
    dispatch(setLabel(labelName));

    const label = labels.find((l) => l.label_name === labelName);
    if (!label) return;

    dispatch(fetchLabelEvents({ label_id: label.id }));
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

      <div className='logout'>
        <p onClick={handleLogout}>Se déconnecter</p>
      </div>
    </div>
  );
};

export default Topbar;
