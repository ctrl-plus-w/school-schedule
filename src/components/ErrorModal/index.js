import React from 'react';
import { useSelector } from 'react-redux';

import Error from './Error';

import { selectErrors } from '../../features/modals/errorSlice';

// TODO : [ ] Remove first errors if the errors amount is too hight (compare the modal content height and the window height);

const ErrorModal = () => {
  const errors = useSelector(selectErrors);

  return (
    <div className='error-modal'>
      <div className='error-modal-content'>
        {errors.map((error, index) => {
          return <Error key={index} title={error.title} message={error.message} id={index} />;
        })}
      </div>
    </div>
  );
};

export default ErrorModal;
