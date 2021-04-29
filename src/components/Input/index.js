import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { v4 } from 'uuid';

const Input = ({ value, onChange, placeholder, icon, onClick, className, type }) => {
  const [id] = useState(v4());

  return (
    <label className={`form-control w-auto ${className ? className : ''}`} htmlFor={id}>
      {icon && (
        <button type='button' className='input-icon' onClick={onClick} tabIndex='-1'>
          {icon}
        </button>
      )}

      <input type={type} className='input' id={id} placeholder={placeholder} value={value} onChange={onChange} />
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
};

export default Input;
