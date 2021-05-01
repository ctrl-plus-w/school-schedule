import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { ChevronLeft, ChevronRight } from 'react-feather';

import { selectWeekInterval, setWeekIntervalAndFetch } from '../../features/infos/infosSlice';
import { getLastMonday, getMonth, getNextMonday, getWeekInterval } from '../../utils/Calendar';

const DatePicker = ({ className }) => {
  const dispatch = useDispatch();

  const weekInterval = useSelector(selectWeekInterval);

  const start = new Date(weekInterval.start);
  const end = new Date(weekInterval.end);

  const nextWeek = async () => {
    const day = new Date(weekInterval.start);
    const referenceDay = getNextMonday(day);

    const newWeekInterval = getWeekInterval(referenceDay);

    await dispatch(setWeekIntervalAndFetch(newWeekInterval));
  };

  const previousWeek = async () => {
    const day = new Date(weekInterval.start);
    const referenceDay = getLastMonday(day);

    const newWeekInterval = getWeekInterval(referenceDay);

    await dispatch(setWeekIntervalAndFetch(newWeekInterval));
  };

  const formatDate = (date) => {
    return `${date.getDate()} ${getMonth(date).slice(0, 3)}`;
  };

  return (
    <div className={`flex flex-row justify-center text-white ${className ? className : ''}`}>
      <div className='flex items-center bg-black px-2 rounded-sm cursor-pointer' onClick={previousWeek}>
        <ChevronLeft size={26} />
      </div>

      <div className='flex bg-black mx-3 px-4 py-2 rounded-sm'>
        <p className='text-normal font-bold my-auto w-28 text-center'>
          {formatDate(start)} - {formatDate(new Date(end.setDate(end.getDate() - 1)))}
        </p>
      </div>

      <div className='flex items-center bg-black px-2 rounded-sm cursor-pointer' onClick={nextWeek}>
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
