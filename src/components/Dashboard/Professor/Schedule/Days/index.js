import React from 'react';
import PropTypes from 'prop-types';

import Day from '../Day';

import useHorizontalScroll from '../../../../../hooks/useHorizontalScroll';

// TODO : [ ] Add drag to go through days.
// TODO : [ ] Refactor and create context / hooks.
// TODO : [ ] Set bodyHeight to 0 when modals shows.

const Days = (props) => {
  const { container, slider } = useHorizontalScroll();

  return (
    <div className='days' ref={container}>
      <div className='slider' ref={slider}>
        {props.days.map((day, index) => {
          return <Day infos={day} index={`day${index}`} key={day.id} />;
        })}
      </div>
    </div>
  );
};

Days.propTypes = {
  days: PropTypes.array,
};

export default Days;
