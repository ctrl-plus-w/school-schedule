import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

const Navbar = () => {
  const { url } = useRouteMatch();

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link to={`${url}`} className='link'>
            Home
          </Link>
        </li>
        <li>
          <Link to={`${url}/users`} className='link'>
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
