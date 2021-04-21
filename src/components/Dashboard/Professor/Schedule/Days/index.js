import React from 'react';
import PropTypes from 'prop-types';

import Day from '../Day';

import useHorizontalScroll from '../../../../../hooks/useHorizontalScroll';
import useHorizontalVerticalScroll from '../../../../../hooks/useHorizontalVerticalScroll';
import useWindowSize from '../../../../../hooks/useWindowSize';

import BREAKPOINTS from '../../../../../static/breakpoints';

// TODO : [ ] Add drag to go through days.
// TODO : [ ] Refactor and create context / hooks.
// TODO : [ ] Set bodyHeight to 0 when modals shows.

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
