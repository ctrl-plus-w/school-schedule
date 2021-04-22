import React, { useState } from 'react';
import { X, Edit2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

import ExternalLink from '../../ExternalLink';

import { isRole, selectId } from '../../../features/database/authSlice';
import { deleteEvent, fetchAllLabelEvents, fetchOwnedEvents, updateEvent } from '../../../features/database/eventsSlice';

import { selectInfos, hide } from '../../../features/modals/eventSlice';
import { selectLabel } from '../../../features/infos/infosSlice';

const Modal = () => {
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  const infos = useSelector(selectInfos);
  const role = useSelector(isRole);
  const label = useSelector(selectLabel);

  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [obligatory, setObligatory] = useState();

  const userId = useSelector(selectId);

  const canEdit = role.isProfessor && infos.owner.id === userId;

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleClose = () => {
    dispatch(hide());
  };

  const handleDelete = async () => {
    // ! Keep the awaits otherwise it will fetch the events before it delete it.
    await dispatch(deleteEvent({ id: infos.id }));

    if (label.id) await fetchAllLabelEvents(dispatch, label.id);
    else await dispatch(fetchOwnedEvents());

    await dispatch(hide());
  };

  const enableEdit = () => {
    setDescription(infos.description);
    setLink(infos.link);
    setObligatory(infos.obligatory);

    setEditing(true);
  };

  const disableEdit = () => {
    setEditing(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleObligatoryChange = () => {
    setObligatory((prev) => !prev);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    if (link === infos.link && description === infos.description && obligatory === infos.obligatory) return;

    const payload = { id: infos.id, link, description, obligatory };

    await dispatch(updateEvent(payload));
    await dispatch(hide());

    if (Object.keys(label).length > 0) await fetchAllLabelEvents(dispatch, label);
    else dispatch(fetchOwnedEvents());

    setEditing(false);
  };

  return (
    <div className={`modal ${infos.visible ? 'visible' : 'hidden'}`} onClick={handleClose}>
      <div className='modal-content' onClick={handleContentClick}>
        <header>
          <h1 className='title'>
            {infos.title}
            {editing ? (
              <span className={`pin pointer ${obligatory ? 'red' : 'green'}`} onClick={handleObligatoryChange}>
                {obligatory ? 'Obligatoire' : 'Facultatif'}
              </span>
            ) : (
              <span className={`pin ${infos.obligatory ? 'red' : 'green'}`}>{infos.obligatory ? 'Obligatoire' : 'Facultatif'}</span>
            )}
          </h1>
          <div className='icons'>
            {canEdit && !editing && <Edit2 className='icon edit' size={22} onClick={enableEdit} />}
            <X className='icon close' onClick={handleClose} size={28} />
          </div>
        </header>

        <div className='content'>
          <p className='global-description'>{infos.description || 'Aucune description...'}</p>

          <ul className='infos'>
            <p className='subject-owner'>{infos.owner.name}</p>
            <p className='start-time'>{infos.start}</p>
          </ul>

          {editing && (
            <div className='fields'>
              <label className='field' htmlFor='description'>
                Description
                <input
                  type='text'
                  id='description'
                  placeholder='Veuillez entrer une description.'
                  autoComplete='off'
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </label>

              <label className='field' htmlFor='link'>
                Lien
                <input type='text' id='' placeholder='Veuillez entrer un lien.' autoComplete='off' value={link} onChange={handleLinkChange} />
              </label>
            </div>
          )}

          <div className='buttons'>
            {editing ? (
              <>
                <button type='button' className='cancel-edit' onClick={disableEdit}>
                  Annuler
                </button>

                <button type='button' className='edit-event' onClick={handleEdit}>
                  Modifier
                </button>
              </>
            ) : (
              <>
                <ExternalLink to={infos.link} className='join-class'>
                  Rejoindre la classe.
                </ExternalLink>

                {canEdit && (
                  <button type='button' className='delete-event' onClick={handleDelete}>
                    Supprimer
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
