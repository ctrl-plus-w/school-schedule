import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({ choices, choice, setChoice }) => {
  if (choices.length !== 3) throw new Error('Switch must have 3 choices.');

  const handleClick = (choice_) => {
    if (choice === choice_) return;
    setChoice(choice_);
  };

  const left = choice === choices[0] ? '0' : choice === choices[1] ? '1/3' : '2/3';

  return (
    <div className='relative flex flex-row w-96 bg-gray-600 text-white rounded'>
      {choices.map((choice_) => (
        <div className='flex items-center justify-center w-1/3 py-2 cursor-pointer z-20' key={choice_} onClick={() => handleClick(choice_)}>
          <p className='text-sm font-normal'>{choice_}</p>
        </div>
      ))}

      <div className={`absolute top-0 left-${left} w-1/3 h-full bg-black rounded z-10 transition-all`}></div>
    </div>
  );
};

Switch.propTypes = {
  choices: PropTypes.array,
  choice: PropTypes.any,
  setChoice: PropTypes.func,
};

export default Switch;
