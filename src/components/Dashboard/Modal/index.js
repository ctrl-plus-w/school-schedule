import React, { useContext } from 'react';
import { X } from 'react-feather';

import './index.scss';

import ModalContext from '../../../context/modal-context';

const Modal = (props) => {
  const modalContext = useContext(ModalContext);

  return (
    <div className={`modal ${modalContext.visible ? 'visible' : 'hidden'}`}>
      <div className='modal-content'>
        <header>
          <h1 className='title'> {modalContext.title}</h1>
          <X className='icon' onClick={modalContext.hide} size={28} />
        </header>

        <div className='content'>{modalContext.content}</div>
      </div>
    </div>
  );
};

export default Modal;
