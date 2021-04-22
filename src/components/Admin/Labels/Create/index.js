import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Check } from 'react-feather';

import { createLabel, selectCreated, resetCreated } from '../../../../features/database/labelsSlice';

const CreateLabel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCreated());
  }, []);

  const created = useSelector(selectCreated);

  useEffect(() => {
    console.log('Created :', created);
  }, [created]);

  const [labelName, setLabelName] = useState('');

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (labelName === '') return;

    dispatch(createLabel({ label_name: labelName }));
  };

  const handleChange = (event) => {
    setLabelName(event.target.value);
  };

  return (
    <form className='creation-form' onSubmit={handleSubmit}>
      <label htmlFor='labelName'>
        <input type='text' id='labelName' className='form-control' placeholder='Label Name' value={labelName} onChange={handleChange} />
      </label>
      <button type='submit' className='submit-button'>
        Create Label
        {created && <Check />}
      </button>
    </form>
  );
};

export default CreateLabel;
