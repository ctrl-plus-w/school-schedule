import React from 'react';
import { X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

import ExternalLink from '../../ExternalLink';

import { isRole, selectId } from '../../../features/database/authSlice';
import { deleteEvent, fetchAllLabelEvents, fetchOwnedEvents } from '../../../features/database/eventsSlice';

import { selectInfos, hide } from '../../../features/modals/eventSlice';
import { selectLabel } from '../../../features/infos/infosSlice';

const Modal = () => {
  const dispatch = useDispatch();

  const infos = useSelector(selectInfos);
  const role = useSelector(isRole);
  const label = useSelector(selectLabel);

  const userId = useSelector(selectId);

  const handleContentClick = (event) => event.stopPropagation();
  const handleClose = () => dispatch(hide());

  const handleDelete = async () => {
    // ! Keep the awaits otherwise it will fetch the events before it delete it.
    await dispatch(deleteEvent({ id: infos.id }));

    if (label.id) await fetchAllLabelEvents(dispatch, label.id);
    else await dispatch(fetchOwnedEvents());

    await dispatch(hide());
  };

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
          <p className='global-description'>{infos.description}</p>

          <ul className='infos'>
            <p className='subject-owner'>{infos.owner.name}</p>
            <p className='start-time'>{infos.start}</p>
          </ul>

          <div className='buttons'>
            <ExternalLink to={infos.link} className='join-class'>
              Rejoindre la classe.
            </ExternalLink>

            {role.isProfessor && infos.owner.id === userId && (
              <button type='button' className='delete-event red' onClick={handleDelete}>
                Supprimer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
