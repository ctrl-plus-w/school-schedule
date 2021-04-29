import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { v4 } from 'uuid';

const Textarea = ({ value, onChange, placeholder, className, rows = 4, label }) => {
  const [id] = useState(v4());

  const handleChange = (e) => onChange(e.target.value);

  return (
    <label className={`flex flex-col w-auto ${className ? className : ''}`} htmlFor={id}>
      <span className='text-base text-black font-bold mb-2'>{label}</span>
      <div className='form-control'>
        <textarea className='input min-h-small' id={id} placeholder={placeholder} value={value} onChange={handleChange} rows={rows}></textarea>
      </div>
    </label>
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.any,
  type: PropTypes.string,
  rows: PropTypes.number,
  label: PropTypes.string,
};

export default Textarea;
