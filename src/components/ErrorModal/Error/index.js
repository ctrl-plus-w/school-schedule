import React, { createRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { X } from 'react-feather';

import ErrorContext from '../../../context/errors-context';

const ErrorEl = ({ title, message, id }) => {
  const { removeError } = useContext(ErrorContext);

  const elRef = createRef();

  useEffect(() => {
    if (!elRef.current) return;
    const words = elRef.current.innerText.split(' ');
    while (elRef.current.scrollHeight > elRef.current.offsetHeight) {
      words.pop();
      elRef.current.innerText = words.join(' ') + '...';
    }
  }, [elRef]);

  const handleClick = () => removeError(id);

  return (
    <div className='error'>
      <div className='error-header'>
        <h2 className='error-title'>{title}</h2>
        <X size={20} className='close-icon' onClick={handleClick} />
      </div>

      <div className='error-content'>
        <p className='error-message' ref={elRef}>
          {message}
        </p>
      </div>
    </div>
  );
};

ErrorEl.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  id: PropTypes.string,
};

export default ErrorEl;
