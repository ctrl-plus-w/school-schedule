import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Loader, Search } from 'react-feather';

import { v4 } from 'uuid';

const Dropdown = ({ options, placeholder, onSubmit, className, label, loading }) => {
  const [id] = useState(v4());

  const [hover, setHover] = useState(false);
  const [value, setValue] = useState('');
  const [availableOptions, setAvailableOptions] = useState([]);
  const [visible, setVisible] = useState(false);

  const input = createRef();

  const dropdownActive = visible && availableOptions.length > 0 && value.length > 0;

  const handleChange = (value) => {
    setValue(value);
    setAvailableOptions(options.filter((option) => option.startsWith(value)));
  };

  const handleSubmit = (e, value) => {
    e.preventDefault();

    handleChange(value);
    onSubmit(value);

    setVisible(false);
    input.current.blur();
  };

  const getAditionalClasses = (i) => {
    let classes = [];

    if (availableOptions.length > 1) {
      if (i === 0) classes.push('pt-2');
      if (i === availableOptions.length - 1) classes.push('pb-2');
    }

    return classes.join(' ');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, value)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <label className={`relative flex flex-col w-auto ${className ? className : ''}`} htmlFor={id}>
        {label && <span className='text-base text-black font-bold mb-2'>{label}</span>}
        <div className={`form-control transition-all ${visible ? 'ring ring-gray-300' : ''}`}>
          <button type='submit' className='input-icon' tabIndex='-1'>
            {loading ? <Loader className='animate-spin' /> : <Search />}
          </button>

          <input
            type='text'
            className='input'
            ref={input}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setVisible(true)}
            onBlur={() => !hover && setVisible(false)}
          />
        </div>

        {dropdownActive && (
          <ul className='absolute flex flex-col top-full left-0 w-full h-auto mt-4 py-1 list-none border border-black border-solid bg-white z-50'>
            {availableOptions.map((option, i) => (
              <li className={`flex py-1 px-4 cursor-pointer ${getAditionalClasses(i)}`} key={option} onClick={(e) => handleSubmit(e, option)}>
                <p className='text-base text-gray-600 font-normal hover:text-purple-600 transition-all'>{option}</p>
              </li>
            ))}
          </ul>
        )}
      </label>
    </form>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.any,
  label: PropTypes.string,
  loading: PropTypes.bool,
};

export default Dropdown;
