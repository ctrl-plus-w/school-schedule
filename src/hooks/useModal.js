import React,   { useState } from 'react';

const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('Modal Title');
  const [modalContent, setModalContent] = useState(<></>);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return {
    visible: modalVisible,
    showModal: showModal,
    hideModal: hideModal,
    setModalTitle: setModalTitle,
    setModalContent: setModalContent,
    title: modalTitle,
    content: modalContent,
  };
};

export default useModal;
