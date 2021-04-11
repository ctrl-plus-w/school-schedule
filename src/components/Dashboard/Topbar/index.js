import React, { useContext } from 'react';

import AuthContext from '../../../context/auth-context';
import EventsContext from '../../../context/events-context';

import Selector from './Selector';

import './index.scss';
import { useHistory } from 'react-router';

const Topbar = () => {
  const authContext = useContext(AuthContext);
  const eventsContext = useContext(EventsContext);

  const history = useHistory();

  // TODO : [x] Add groups under name.
  // TODO : [x] Add a selector for the groups / labels.
  // TODO : [ ] Show selector only for users with professor role.

  const logout = () => {
    history.push('/auth');
    authContext.logout();
  };

  return (
    <div className='topbar-container'>
      <div className='text'>
        <h2 className='name'>{authContext.fullName}</h2>
        <h3 className='role'>{authContext.role}</h3>
      </div>

      <div className='label-selector'>
        <Selector list={[]} setEvents={eventsContext.setEvents} />
      </div>

      <div className='logout'>
        <p onClick={logout}>Se déconnecter</p>
      </div>
    </div>
  );
};

export default Topbar;
