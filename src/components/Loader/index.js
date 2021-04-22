import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Loader = ({ loading }) => {
  return (
    <div className={`loading ${loading ? 'visible' : 'hidden'}`}>
      <div className='lds-ripple'>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default Loader;
