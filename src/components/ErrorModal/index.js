import React, { useContext } from 'react';

import ErrorsContext from '../../context/errors-context';

import './index.scss';

import Error from './Error';

// TODO : [ ] Remove first errors if the errors amount is too hight (compare the modal content height and the window height);

const ErrorModal = () => {
  const { errors } = useContext(ErrorsContext);

  return (
    <div className='error-modal'>
      <div className='error-modal-content'>
        {Object.keys(errors).map((errorId) => {
          const error = errors[errorId];
          return <Error key={errorId} title={error.title} message={error.message} id={errorId} />;
        })}
      </div>
    </div>
  );
};

export default ErrorModal;
