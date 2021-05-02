import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { ChevronLeft, ChevronRight } from 'react-feather';

import { getLastMonday, getMonth, getNextMonday, getWeekInterval } from '../../utils/Calendar';

import { selectWeekInterval, setWeekIntervalAndFetch, switchDashboardState, DASHBOARD_STATES } from '../../features/infos/infosSlice';

import useAnimation from '../../hooks/useAnimation';

const DatePicker = ({ className }) => {
  const dispatch = useDispatch();
  const animation = useAnimation();

  const weekInterval = useSelector(selectWeekInterval);

  const start = new Date(weekInterval.start);
  const end = new Date(weekInterval.end);

  const nextWeek = () => changeWeekInterval(getNextMonday);
  const previousWeek = () => changeWeekInterval(getLastMonday);

  const changeWeekInterval = async (getMonday) => {
    const day = new Date(weekInterval.start);
    const referenceDay = getMonday(day);

    const newWeekInterval = getWeekInterval(referenceDay);

    animation.animateOut();

    await dispatch(setWeekIntervalAndFetch(newWeekInterval));
    await dispatch(switchDashboardState(DASHBOARD_STATES.SHOW));
  };

  const formatDate = (date) => {
    return `${date.getDate()} ${getMonth(date).slice(0, 3)}`;
  };

  return (
    <div className={`flex flex-row justify-center text-white ${className ? className : ''}`}>
      <div className='flex items-center bg-black px-2 rounded-sm cursor-pointer transition-all hover:ring hover:ring-gray-300' onClick={previousWeek}>
        <ChevronLeft size={26} />
      </div>

      <div className='flex bg-black mx-3 px-4 py-2 rounded-sm'>
        <p className='text-normal font-bold my-auto w-28 text-center'>
          {formatDate(start)} - {formatDate(new Date(end.setDate(end.getDate() - 1)))}
        </p>
      </div>

      <div className='flex items-center bg-black px-2 rounded-sm cursor-pointer transition-all hover:ring hover:ring-gray-300' onClick={nextWeek}>
        <ChevronRight size={26} />
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  handleDateChange: PropTypes.func,
  className: PropTypes.any,
};

export default DatePicker;
