import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ErrorPage = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
      <h1 className='text-4xl text-black font-bold mb-4'>{message}</h1>
      <Link to='/auth' className='text-lg text-blue-600 font-base link-animation'>
        Se connecter
      </Link>
    </div>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string,
};

export default ErrorPage;
