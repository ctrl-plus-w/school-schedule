import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ content, className }) => {
  return (
    <div className={`py-0.5 px-1.5 rounded-md bg-white ${className ? className : ''}`}>
      <p className='text-sm text-black font-normal'>{content}</p>
    </div>
  );
};

Badge.propTypes = {
  content: PropTypes.string,
  className: PropTypes.any,
};

export default React.memo(Badge);
