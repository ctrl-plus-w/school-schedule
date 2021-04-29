import React from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import RadioInput from '../RadioInput';

const RadioGroup = ({ name, fields, selected, setSelected }) => {
  return (
    <div className='flex flex-col mb-4'>
      <p className='text-base text-black font-bold mb-2'>Matières</p>

      <div className='flex flex-wrap'>
        {fields.map((field) => (
          <RadioInput name={name} key={uuidv4()} label={field} className='w-1/2' selected={selected} onClick={setSelected} />
        ))}
      </div>
    </div>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string,
  fields: PropTypes.array,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
};

export default RadioGroup;
