import PropTypes from 'prop-types';
import React from 'react';

import Day from '../Day';

import BREAKPOINTS from '../../../../../static/breakpoints';

import useHorizontalVerticalScroll from '../../../../../hooks/useHorizontalVerticalScroll';
import useHorizontalScroll from '../../../../../hooks/useHorizontalScroll';
import useWindowSize from '../../../../../hooks/useWindowSize';

// TODO : [ ] Add drag to go through days.
// TODO : [x] Refactor and create context / hooks.
// TODO : [x] Set bodyHeight to 0 when modals shows.

const Days = (props) => {
  const { container: phoneContainer, slider: phoneSlider } = useHorizontalVerticalScroll();
  const { container, slider } = useHorizontalScroll();

  const { width } = useWindowSize();

  const condition = width <= BREAKPOINTS.PHONE;

  return (
    <div className='days' ref={condition ? phoneContainer : container}>
      <div className='slider' ref={condition ? phoneSlider : slider}>
        {props.days.map((day) => (
          <Day infos={day} key={day.id} />
        ))}
      </div>
    </div>
  );
};

Days.propTypes = {
  days: PropTypes.array,
};

export default Days;
