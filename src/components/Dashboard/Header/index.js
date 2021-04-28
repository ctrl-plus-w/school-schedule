import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

  return days.map((day, i) => (
    <div className={`col-start-${i + 2} row-start-1 bg-white py-4`} key={uuidv4()}>
      <p className='text-lg text-black font-bold text-center w-full'>{day.slice(0, 3)}.</p>
    </div>
  ));
};

export default Header;
