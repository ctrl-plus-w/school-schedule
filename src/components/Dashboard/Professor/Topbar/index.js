import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectName, selectRole, logout } from '../../../../features/database/authSlice';

const Topbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const fullName = useSelector(selectName);
  const role = useSelector(selectRole);

  // TODO : [ ] Create a labels slice and handle everything.

  // const [selected, setSelected] = useState('');
  // const [labelId, setLabelId] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth');
  };

  // const handleChange = (labelName) => {
  //   setSelected(labelName);

  // const label = labels.find((l) => l.label_name === labelName);
  // if (!label) return;

  // setLabelId(label.id);

  // Fetch events of the id in the database. (redux)
  // };

  return (
    <div className='topbar'>
      <div className='text'>
        <h2 className='name'>{fullName}</h2>
        <h3 className='role'>{role}</h3>
      </div>

      <div className='label-selector'>
        {/* <Selector
          items={labels.map((l) => ({ id: l.id, name: l.label_name }))}
          selected={selected}
          setSelected={handleChange}
          placeholder='Choisir un groupe.'
        /> */}
      </div>

      <div className='logout'>
        <p onClick={handleLogout}>Se déconnecter</p>
      </div>
    </div>
  );
};

export default Topbar;
