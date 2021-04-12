import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = (props) => {
  const handleClick = () => {
    if (props.to) window.location.href = props.to;
  };

  return (
    <p onClick={handleClick} className={`${props.className} ${!props.to ? 'disabled' : ''}`}>
      {props.children}
    </p>
  );
};

ExternalLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default ExternalLink;
