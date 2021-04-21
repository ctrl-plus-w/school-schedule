import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Navbar = () => {
  const { url } = useRouteMatch();

  const links = [
    { path: '', name: 'Home ' },
    { path: '/users', name: 'Users' },
    { path: '/labels', name: 'Labels' },
    { path: '/subjects', name: 'Subjects' },
    { path: '/roles', name: 'Roles' },
  ];

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
      </ul>
    </nav>
  );
};

export default Navbar;
