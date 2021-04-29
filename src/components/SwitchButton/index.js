import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { v4 } from 'uuid';

const SwitchButton = ({ checked, onChange, className, label }) => {
  const [id] = useState(v4());

  const handleChange = (e) => onChange(e.target.checked);

  return (
    <label className={`flex flex-row justify-between items-center w-auto ${className ? className : ''}`} htmlFor={id}>
      <input type='checkbox' checked={checked} onChange={handleChange} className='hidden' id={id} />
      <div className='text-base text-black font-bold select-none cursor-pointer'>{label}</div>

      <div className={`flex items-center w-6 p-0.5 rounded-full cursor-pointer box-content ${checked ? 'bg-purple-500' : 'bg-black'}`}>
        <div className={`h-3 w-3 rounded-full bg-white transition-all ${checked ? 'transform translate-x-full' : ''}`}></div>
      </div>
    </label>
  );
};

SwitchButton.propTypes = {
  checked: PropTypes.any,
  onChange: PropTypes.any,
  className: PropTypes.any,
  label: PropTypes.any,
};

export default SwitchButton;
