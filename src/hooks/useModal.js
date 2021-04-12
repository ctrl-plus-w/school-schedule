import { useState } from 'react';

const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const [modalLink, setModalLink] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalstart, setModalStart] = useState('');

  const [modalPin, setModalPin] = useState('');
  const [modalPinColor, setModalPinColor] = useState('');

  const [modalSubjectOwner, setModalSubjectOwner] = useState('');

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const config = (args) => {
    setModalTitle(args.title);
    setModalLink(args.link);
    setModalDescription(args.description);
    setModalStart(args.start);
    setModalPin(args.pin);
    setModalPinColor(args.pinColor);
    setModalSubjectOwner(args.subjectOwner);

    showModal();
  };

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

    config: config,
  };
};

export default useModal;
