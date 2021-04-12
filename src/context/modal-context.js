import { createContext } from 'react';

const ModalContext = createContext({
  showModal: () => {},
  hideModal: () => {},

  setModalTitle: () => {},
  setModalContent: () => {},
  setModalSubjectOwner: () => {},
  setModalPin: () => {},
  setModalStart: () => {},
  setModalPinColor: () => {},
  setModalLink: () => {},

  visible: false,
  title: '',
  description: '',
  subjectOwner: '',
  start: '',
  link: '',
  pin: '',
  pinColor: '',
});

export const ModalProvider = ModalContext.Provider;
export const ModalConsumer = ModalContext.Consumer;
export default ModalContext;
