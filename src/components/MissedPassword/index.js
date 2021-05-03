import React from 'react';
import { Link } from 'react-router-dom';

const MissedPassword = () => {
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
      <div className='flex flex-col justify-start items-start max-w-lg'>
        <h1 className='text-3xl text-black font-bold'>Mot de passe oublié ?</h1>

        <p className='text-base text-gray-900 font-normal mt-4'>
          Pour changer votre mot de passe, vous pouvez envoyer un message à <strong>Lukas Laudrain</strong> sur elyco. Un système de récupération par
          mail sera bientôt mis en place.
        </p>

        <Link to='/auth' className='text-base text-blue-600 font-base link-animation mt-4'>
          Se connecter
        </Link>
      </div>
    </div>
  );
};

export default MissedPassword;
