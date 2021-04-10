import { createContext } from 'react';

const ModalContext = createContext({
  show: () => {},
  hide: () => {},

  setTitle: () => {},
  setContent: () => {},

  visible: false,
  title: '',
  content: <></>,
});

export const ModalProvider = ModalContext.Provider;
export const ModalConsumer = ModalContext.Consumer;
export default ModalContext;
