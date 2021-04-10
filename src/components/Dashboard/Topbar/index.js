import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../../context/auth-context';
import EventsContext from '../../../context/events-context';

import Selector from './Selector';

import './index.scss';

const Topbar = () => {
  const authContext = useContext(AuthContext);
  const eventsContext = useContext(EventsContext);

  // TODO : [x] Add groups under name.
  // TODO : [ ] Add a selector for the groups.
  // TODO : [ ] Show selector only for users with professor role.

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
        <Link to='/auth' onClick={() => authContext.logout()}>
          Se déconnecter
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
