import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { v4 } from 'uuid';

const Input = ({ value, onChange, placeholder, icon, onClick, className, type, label }) => {
  const [id] = useState(v4());

  const handleChange = (e) => onChange(e.target.value);

  return (
    <label className={`flex flex-col w-auto ${className ? className : ''}`} htmlFor={id}>
      {label && <span className='text-base text-black font-bold mb-2'>{label}</span>}
      <div className='form-control'>
        {icon && (
          <button type='button' className='input-icon' onClick={onClick} tabIndex='-1'>
            {icon}
          </button>
        )}

        <input type={type} className='input' id={id} placeholder={placeholder} value={value} onChange={handleChange} />
      </div>
    </label>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  onClick: PropTypes.func,
  className: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.string,
};

export default Input;
