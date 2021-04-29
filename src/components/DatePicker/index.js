import React from 'react';
import PropTypes from 'prop-types';

import { ChevronLeft, ChevronRight } from 'react-feather';

const DatePicker = ({ handleDateChange, className }) => {
  return (
    <div className={`flex flex-row justify-center text-white ${className ? className : ''}`}>
      <div className='flex items-center bg-black px-2 rounded-sm' onClick={handleDateChange}>
        <ChevronLeft size={26} />
      </div>

      <div className='flex bg-black mx-3 px-4 py-1.5 rounded-sm'>
        <p className='text-normal font-bold my-auto'>15 Fev. - 22 Fev.</p>
      </div>

      <div className='flex items-center bg-black px-2 rounded-sm' onClick={handleDateChange}>
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
