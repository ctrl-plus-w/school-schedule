import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Day from '../Day';

// TODO : [ ] Add drag to go through days.
// TODO : [ ] Refactor and create context / hooks.
// TODO : [ ] Set bodyHeight to 0 when modals shows.

const Days = (props) => {
  useEffect(() => {
    const days = document.querySelector('.days');
    const slider = document.querySelector('.slider');

    const sliderWidth = slider.getBoundingClientRect().width;
    const daysWidth = days.getBoundingClientRect().width;

    const bodyHeight = sliderWidth - (daysWidth - window.innerHeight);
    document.body.style.height = `${bodyHeight}px`;

    let current = 0;
    let target = 0;
    let ease = 0.3;

    const lerp = (start, end, t) => {
      return start * (1 - t) + end * t;
    };

    const animate = () => {
      current = parseFloat(lerp(current, target, ease)).toFixed(0);
      target = window.scrollY;

      days.style.transform = `translateX(-${current}px)`;
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animation);
      document.body.style.height = '';
    };
  }, []);

  return (
    <div className='days'>
      <div className='slider'>
        {props.days.map((day) => {
          return <Day infos={day} key={day.id} />;
        })}
      </div>
    </div>
  );
};

Days.propTypes = {
  days: PropTypes.array,
};

export default Days;
