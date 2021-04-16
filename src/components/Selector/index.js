/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Check } from 'react-feather';

import './index.scss';

// TODO : [ ] Don't show the dropdown if the list is empty.
// TODO : [ ] Reset fields when changing the visibility.

const Selector = ({ items, selected, setSelected, placeholder, className, noValidation }) => {
  const [value, setValue] = useState('');
  const [completion, setCompletion] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    setValue(inputValue);
    setInvalid(items.some((i) => i.name.startsWith(inputValue)) ? false : true);

    const item = items.find((i) => i.name.startsWith(inputValue));
    if (!item || inputValue === '') return setCompletion('');

    if (noValidation && inputValue === item.name) setSelected(item);

    setCompletion(item.name.slice(inputValue.length));
  };

  const handleKeyPress = (event) => {
    if (event.key !== 'Tab') return;

    event.preventDefault();

    setValue(value + completion);
    setCompletion();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelected(value);
  };

  return (
    <form className={`selector ${className ? className : ''} ${invalid ? 'invalid' : 'valid'}`} onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
      <div className='selector-field-container'>
        <input type='text' className='selector-field' onChange={handleInputChange} value={value} />
        {!noValidation && (
          <button type='submit' className='submit-button'>
            <Check className='icon' />
          </button>
        )}
      </div>
      <div className='placeholder'>
        <p>{!value && (selected ? selected : placeholder)}</p>
      </div>
      <div className={`completion-container`}>
        <p className='user-input'>{value}</p>
        <p className='completion'>{completion}</p>
      </div>
    </form>
  );
};

Selector.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.any,
  setSelected: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.any,
  noValidation: PropTypes.bool,
};

export default Selector;
