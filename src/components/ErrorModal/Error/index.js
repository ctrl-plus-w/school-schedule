import React, { createRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { X } from 'react-feather';

import { removeError } from '../../../features/modals/errorSlice';

const ErrorEl = ({ title, message, id }) => {
  const dispatch = useDispatch();

  const elRef = createRef();

  useEffect(() => {
    if (!elRef.current) return;
    const words = elRef.current.innerText.split(' ');
    while (elRef.current.scrollHeight > elRef.current.offsetHeight) {
      words.pop();
      elRef.current.innerText = words.join(' ') + '...';
    }
  }, [elRef]);

  const handleClick = () => dispatch(removeError(id));

  return (
    <div className='error flex flex-col mt-4'>
      <div className='flex items-center justify-between'>
        <h2 className='error-title'>{title}</h2>
        <X size={20} onClick={handleClick} />
      </div>

      <div className='flex mt-2'>
        <p className='font-normal' ref={elRef}>
          {message}
        </p>
      </div>
    </div>
  );
};

ErrorEl.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  id: PropTypes.number,
};

export default ErrorEl;
