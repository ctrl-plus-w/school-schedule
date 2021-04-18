/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Check } from 'react-feather';

import './index.scss';

// TODO : [ ] Don't show the dropdown if the list is empty.
// TODO : [x] Reset fields when changing the visibility.

const Selector = ({ items, selected, setSelected, placeholder, className, noValidation, onSubmit }) => {
  const [value, setValue] = useState('');
  const [completion, setCompletion] = useState('');
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (selected === null) {
      setValue('');
      setCompletion('');
    }
  }, [selected]);

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
    if (event.key === 'Tab') {
      event.preventDefault();

      setValue(value + completion);
      setCompletion();
    }

    if (event.key === 'Enter') {
      if (noValidation) onSubmit(event);
      else handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelected(value);
  };

  return (
    <div className={`selector ${className ? className : ''} ${invalid ? 'invalid' : 'valid'}`} onKeyDown={handleKeyPress}>
      <div className='selector-field-container'>
        <input type='text' className='selector-field' onChange={handleInputChange} value={value} />
        {!noValidation && (
          <button type='button' className='submit-button' onClick={handleSubmit}>
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
    </div>
  );
};

Selector.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.any,
  setSelected: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.any,
  noValidation: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default Selector;
