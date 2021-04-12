import React, { useContext } from 'react';
import { X } from 'react-feather';

import ExternalLink from '../../ExternalLink';

import './index.scss';

import ModalContext from '../../../context/modal-context';

const Modal = () => {
  const modalContext = useContext(ModalContext);

  const handleContentClick = (event) => event.stopPropagation();
  const handleBackgroundClick = () => modalContext.hideModal();

  return (
    <div className={`modal ${modalContext.visible ? 'visible' : 'hidden'}`} onClick={handleBackgroundClick}>
      <div className='modal-content' onClick={handleContentClick}>
        <header>
          <h1 className='title'>
            {modalContext.title}
            {modalContext.pin && <span className={`pin ${modalContext.pinColor}`}>{modalContext.pin}</span>}
          </h1>
          <X className='icon' onClick={modalContext.hideModal} size={28} />
        </header>

        <div className='content'>
          <p className='description'>{modalContext.description}</p>

          <ul className='infos'>
            <p className='subject-owner'>{modalContext.subjectOwner}</p>
            <p className='start-time'>{modalContext.start}</p>
          </ul>

          <ExternalLink to={modalContext.link} className='join-class'>
            Rejoindre la classe.
          </ExternalLink>
        </div>
      </div>
    </div>
  );
};

export default Modal;
