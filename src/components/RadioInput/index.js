import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

const RadioInput = ({ selected, name, label, className, onClick }) => {
  const [id] = useState(uuidv4());

  const handleClick = () => onClick(label);

  return (
    <label htmlFor={id} className={`flex flex-row items-center cursor-pointer ${className ? className : ''}`} onClick={handleClick}>
      <input type='radio' name={name} id={id} className='hidden' />

      <div className='relative w-4 h-4 border-2 border-solid border-black rounded-full z-10'>
        {selected === label && (
          <div className='absolute top-1/2 left-1/2 w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded-full z-20'></div>
        )}
      </div>

      <span className='text-base text-black font-normal ml-2'>{label}</span>
    </label>
  );
};

RadioInput.propTypes = {
  selected: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.any,
  onClick: PropTypes.func,
};

export default RadioInput;
