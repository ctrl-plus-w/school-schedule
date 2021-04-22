import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../../features/database/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  const links = [
    { path: '', name: 'Home ' },
    { path: '/users', name: 'Users' },
    { path: '/labels', name: 'Labels' },
    { path: '/subjects', name: 'Subjects' },
    { path: '/roles', name: 'Roles' },
  ];

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/auth');
  };

  return (
    <nav className='navbar'>
      <ul>
        {links.map((link) => (
          <li key={uuidv4()}>
            <Link to={`${url}${link.path}`} className='link'>
              {link.name}
            </Link>
          </li>
        ))}
        <li className='logout'>
          <p onClick={handleLogout} className='link'>
            Logout
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
