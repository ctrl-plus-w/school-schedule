import React from 'react';
import { useSelector } from 'react-redux';

import Error from './Error';

import { selectErrors } from '../../features/modals/errorSlice';

const ErrorModal = () => {
  const errors = useSelector(selectErrors);

  return (
    <div className='flex justify-end items-end absolute top-0 left-0 w-screen h-screen pointer-events-none'>
      <div className='flex flex-col p-16'>
        {errors.map((error, index) => {
          return <Error key={index} title={error.title} message={error.message} id={index} />;
        })}
      </div>
    </div>
  );
};

export default ErrorModal;
