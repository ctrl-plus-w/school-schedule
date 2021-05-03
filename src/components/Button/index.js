import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Button = ({ type, onClick, children, loading = false, className, secondary = false }) => {
  return (
    <button
      className={`button transition-all focus:outline-none ${
        secondary ? 'secondary hover:bg-black hover:text-white' : 'primary hover:ring hover:ring-gray-400'
      } ${className ? className : ''}`}
      type={type}
      onClick={onClick}
    >
      <div className='relative w-full h-full'>
        <p className={loading ? 'opacity-0' : 'opacity-100'}>{children}</p>
        <div className={loading ? 'loader' : 'hidden'}>
          <span className='pin'></span>
          <span className='pin'></span>
          <span className='pin'></span>
        </div>
      </div>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.any,
  children: PropTypes.any,
  secondary: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
