import { useState } from 'react';

const useModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalTitle, setModalTitle] = useState('');

  const [modalLink, setModalLink] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalstart, setModalStart] = useState('');

  const [modalPin, setModalPin] = useState('');
  const [modalPinColor, setModalPinColor] = useState('');

  const [modalSubjectOwner, setModalSubjectOwner] = useState('');

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return {
    visible: modalVisible,
    title: modalTitle,
    description: modalDescription,
    start: modalstart,
    subjectOwner: modalSubjectOwner,
    link: modalLink,
    pin: modalPin,
    pinColor: modalPinColor,

    showModal: showModal,
    hideModal: hideModal,

    setModalTitle: setModalTitle,

    setModalDescription: setModalDescription,
    setModalStart: setModalStart,

    setModalSubjectOwner: setModalSubjectOwner,

    setModalPin: setModalPin,
    setModalPinColor: setModalPinColor,

    setModalLink: setModalLink,
  };
};

export default useModal;
