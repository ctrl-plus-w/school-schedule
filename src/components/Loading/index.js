import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Loading = ({ loading }) => {
  return (
    <div className={`loading ${loading ? 'visible' : 'hidden'}`}>
      <h1>Loading...</h1>
    </div>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
