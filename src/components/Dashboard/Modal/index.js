/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Check, X, Loader } from 'react-feather';

import Input from '../../Input';
import Textarea from '../../Textarea';
import SwitchButton from '../../SwitchButton';
import Button from '../../Button';

import { hide, selectInfos } from '../../../features/modals/editSlice';
import { fetchLabelEvents, fetchOwnedEvents, updateEvent } from '../../../features/database/eventsSlice';
import { DASHBOARD_STATES, selectLabel, switchDashboardState } from '../../../features/infos/infosSlice';
import { selectLabels } from '../../../features/database/labelsSlice';

const Modal = () => {
  const dispatch = useDispatch();

  const infos = useSelector(selectInfos);
  const label = useSelector(selectLabel);
  const labels = useSelector(selectLabels);

  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [obligatory, setObligatory] = useState(false);

  useEffect(() => {
    if (!infos.link && !infos.description) return;

    setLink(infos.link);
    setDescription(infos.description);
    setObligatory(infos.obligatory);
  }, [infos]);

  const handleClose = () => {
    dispatch(hide());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const labelId = labels.find(({ label_name }) => label === label_name);

    const payload = {
      description: description,
      link: link,
      obligatory: obligatory,
    };

    // Enable the loading.
    setLoading(true);

    // Update the events.
    // !Keep the await.
    for (const id of infos.ids) await dispatch(updateEvent({ id, ...payload }));

    // Hide the modal and switch to the show tab.
    dispatch(switchDashboardState(DASHBOARD_STATES.SHOW));
    dispatch(hide());

    // Fetch the newly updated events.
    if (label) dispatch(fetchLabelEvents({ id: labelId }));
    else dispatch(fetchOwnedEvents());

    // Disable the loading.
    setLoading(false);
  };

  return (
    <form
      className={`absolute justify-center items-center w-screen h-screen top-0 left-0 bg-black bg-opacity-50 z-50 ${
        infos.visible ? 'flex' : 'hidden'
      }`}
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col min-w-medium p-8 bg-white border border-solid border-black'>
        <header className='flex flex-col'>
          <div className='flex justify-between'>
            <h1 className='text-2xl text-black font-bold'>{infos.title}</h1>
            <X onClick={handleClose} className='cursor-pointer' />
          </div>
          <p className='text-base text-black font-normal'>{infos.description || 'Aucune description...'}</p>
        </header>

        <main className='flex flex-col mt-4'>
          <SwitchButton checked={obligatory} onChange={setObligatory} label='Obligatoire' className='mb-4' />
          <Input value={link} onChange={setLink} placeholder='https://lycee.cned.fr' label='Lien' className='mb-4' />
          <Textarea value={description} onChange={setDescription} placeholder='Description...' label='Description' />
        </main>

        <footer className='flex flex-row justify-between mt-6'>
          <Button type='button' className='w-auto mr-12' secondary>
            Annuler
          </Button>

          <Button type='submit' className='w-auto'>
            Modifier
            {loading ? <Loader size={22} className='ml-2 animate-spin' /> : <Check size={22} className='ml-2' />}
          </Button>
        </footer>
      </div>
    </form>
  );
};

export default Modal;
