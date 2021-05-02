import React, { createRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectInfos } from '../../features/modals/tooltipSlice';
import Badge from '../Badge';

const Tooltip = () => {
  const [x, setX] = useState(-1000);
  const [y, setY] = useState(-1000);

  const infos = useSelector(selectInfos);
  const element = createRef();

  useEffect(() => {
    const listener = ({ clientX, clientY }) => {
      if (!clientX || !clientY || !element.current) return;

      const { width, height } = element.current.getBoundingClientRect();
      const { innerHeight, innerWidth } = window;

      const maxWidth = innerWidth - width * 2;
      const maxHeight = innerHeight - height * 2;

      setX(clientX > maxWidth ? clientX - width : clientX);
      setY(clientY > maxHeight ? clientY - height : clientY);
    };

    if (infos.visible) window.addEventListener('mousemove', listener);
    return () => window.removeEventListener('mousemove', listener);
  }, [infos.visible, element]);

  const style = { left: `${x}px`, top: `${y}px`, opacity: infos.visible ? '100%' : '0%' };

  return (
    <div className='fixed top-0 left-0 w-screen h-screen pointer-events-none z-50'>
      <div ref={element} className='absolute flex flex-col p-4 bg-black text-white pointer-events-none transition-opacity' style={style}>
        <div className='flex flex-col'>
          <div className='flex items-center mb-0.5'>
            <p className='text-lg font-bold'>{infos.title}</p>
            <Badge content={infos.obligatory ? 'Obligatoire' : 'Facultatif'} className='ml-2' />
          </div>
          <p className='text-base font-normal'>{infos.description}</p>
        </div>

        <div className='flex justify-between mt-4'>
          <p className='text-base font-bold mr-8'>{infos.fieldName}</p>
          <p className='text-base font-normal'>{infos.fieldContent}</p>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
