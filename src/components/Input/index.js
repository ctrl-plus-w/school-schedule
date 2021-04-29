import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { v4 } from 'uuid';

const Input = ({ value, onChange, placeholder, icon, onClick }) => {
  const [id] = useState(v4());

  return (
    <label className='form-control w-auto' htmlFor={id}>
      {icon && (
        <button type='button' className='input-icon' onClick={onClick} tabIndex='-1'>
          {icon}
        </button>
      )}

      <input type='text' className='input' id={id} placeholder={placeholder} value={value} onChange={onChange} />
    </label>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  onClick: PropTypes.func,
};

export default Input;
