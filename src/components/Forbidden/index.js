import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className='root-container forbidden'>
      <h1 className='title'>Désolé, vous n&apos;avez pas accès à cette page !</h1>
      <Link to='/auth' className='redirect-link'>
        Se connecter
      </Link>
    </div>
  );
};

export default Forbidden;
