import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({ choices, choice, setChoice, disabled = -1 }) => {
  if (Object.keys(choices).length !== 3) throw new Error('Switch must have 3 choices.');

  const handleClick = (choiceKey) => {
    if (choices[choiceKey] === choice) return;
    setChoice(choiceKey);
  };

  const choiceIndex = Object.values(choices).indexOf(choice);
  const left = choiceIndex === 0 ? '0' : choiceIndex === 1 ? '1/3' : '2/3';

  return (
    <div className='relative flex flex-row w-96 bg-gray-600 text-white rounded'>
      {Object.keys(choices).map((choiceKey, index) => (
        <div
          className={`flex items-center justify-center w-1/3 z-20 ${index !== disabled ? 'cursor-pointer ' : 'cursor-not-allowed'}`}
          key={choiceKey}
          onClick={() => index !== disabled && handleClick(choiceKey)}
        >
          <p className={`text-sm font-normal select-none ${index !== disabled ? 'text-white' : 'text-gray-400'}`}>{choices[choiceKey]}</p>
        </div>
      ))}

      <div className={`absolute top-0 left-${left} w-1/3 h-full bg-black rounded z-10 transition-all`}></div>
    </div>
  );
};

Switch.propTypes = {
  choices: PropTypes.object,
  choice: PropTypes.any,
  setChoice: PropTypes.func,
  disabled: PropTypes.number,
};

export default Switch;
