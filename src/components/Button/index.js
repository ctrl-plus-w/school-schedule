import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, onClick, children, className, secondary = false }) => {
  return (
    <button
      className={`button transition-all hover:ring hover:ring-gray-400 outline-none ${secondary ? 'secondary' : 'primary'} ${
        className ? className : ''
      }`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.any,
  children: PropTypes.any,
  secondary: PropTypes.bool,
};

export default Button;
