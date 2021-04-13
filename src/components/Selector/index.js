import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ChevronDown } from 'react-feather';

import './index.scss';

const Selector = ({ items, selected, setSelected, placeholder, many, className }) => {
  const [visible, setVisible] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const removeKey = (key, { [key]: _, ...rest }) => rest;

  const switchVisibility = () => setVisible((prev) => !prev);

  const select = (id, name) => {
    if (id in selected) setSelected((prev) => removeKey(id, prev));
    else setSelected((prev) => ({ [id]: name, ...prev }));
  };

  const selectOne = (name) => {
    setSelected(name);
    setVisible(false);
  };

  return (
    <div className={`selector ${className}`}>
      <div className={`header ${visible ? 'active' : ''}`} onClick={switchVisibility}>
        <p>{many ? placeholder : selected}</p>
        <ChevronDown size={16} />
      </div>

      {many ? (
        <ul className={`selector-list ${visible ? 'visible' : 'hidden'}`}>
          {items.map(({ id, name }) => (
            <li className={`item ${id in selected && 'selected'}`} key={id} onClick={() => select(id, name)}>
              {name}
            </li>
          ))}
        </ul>
      ) : (
        <ul className={`selector-list ${visible ? 'visible' : 'hidden'}`}>
          {items.map(({ id, name }) => (
            <li className='item' key={id} onClick={() => selectOne(name)}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Selector.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.any,
  setSelected: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.any,
  many: PropTypes.bool,
};

export default Selector;
