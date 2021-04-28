import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectInfos } from '../../features/modals/tooltipSlice';

// TODO : [ ] Add the badge.

const Tooltip = () => {
  const [x, setX] = useState(-1000);
  const [y, setY] = useState(-1000);

  const infos = useSelector(selectInfos);

  useEffect(() => {
    const listener = ({ clientX, clientY }) => {
      if (!clientX || !clientY) return;

      setX(clientX);
      setY(clientY);
    };

    if (infos.visible) window.addEventListener('mousemove', listener);
    return () => window.removeEventListener('mousemove', listener);
  }, [infos.visible]);

  const style = { left: `${x}px`, top: `${y}px`, opacity: infos.visible ? '100%' : '0%' };

  return (
    <div className='absolute flex flex-col p-4 bg-black text-white pointer-events-none transition-opacity' style={style}>
      <div className='flex flex-col'>
        <p className='text-lg font-bold'>{infos.title}</p>
        <p className='text-base font-normal'>{infos.description}</p>
      </div>

      <div className='flex justify-between mt-4'>
        <p className='text-base font-bold mr-8'>{infos.fieldName}</p>
        <p className='text-base font-normal'>{infos.fieldContent}</p>
      </div>
    </div>
  );
};

export default Tooltip;
