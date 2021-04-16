import React from 'react';
import { X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

import ExternalLink from '../../ExternalLink';

import { selectInfos, hide } from '../../../features/modals/eventSlice';

const Modal = () => {
  const dispatch = useDispatch();
  const infos = useSelector(selectInfos);

  const handleContentClick = (event) => event.stopPropagation();
  const handleClose = () => dispatch(hide());

  return (
    <div className={`modal ${infos.visible ? 'visible' : 'hidden'}`} onClick={handleClose}>
      <div className='modal-content' onClick={handleContentClick}>
        <header>
          <h1 className='title'>
            {infos.title}
            {infos.pin && <span className={`pin ${infos.pinColor}`}>{infos.pin}</span>}
          </h1>
          <X className='icon' onClick={handleClose} size={28} />
        </header>

        <div className='content'>
          <p className='description'>{infos.description}</p>

          <ul className='infos'>
            <p className='subject-owner'>{infos.subjectOwner}</p>
            <p className='start-time'>{infos.start}</p>
          </ul>

          <ExternalLink to={infos.link} className='join-class'>
            Rejoindre la classe.
          </ExternalLink>
        </div>
      </div>
    </div>
  );
};

export default Modal;
