import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../../../context/auth-context';

import Selector from './Selector';

const Topbar = () => {
  const authContext = useContext(AuthContext);

  const history = useHistory();

  const logout = () => {
    history.push('/auth');
    authContext.logout();
  };

  return (
    <div className='topbar'>
      <div className='text'>
        <h2 className='name'>{authContext.fullName}</h2>
        <h3 className='role'>{authContext.role}</h3>
      </div>

      <div className='label-selector'>
        <Selector list={[]} />
      </div>

      <div className='logout'>
        <p onClick={logout}>Se déconnecter</p>
      </div>
    </div>
  );
};

export default Topbar;
