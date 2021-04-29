import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { X } from 'react-feather';

import Input from '../../Input';
import Textarea from '../../Textarea';
import SwitchButton from '../../SwitchButton';
import Button from '../../Button';
import RadioGroup from '../../RadioGroup';

import { hide, selectInfos } from '../../../features/modals/planSlice';
import { selectSubjects } from '../../../features/database/authSlice';

const PlanModal = () => {
  const dispatch = useDispatch();

  const infos = useSelector(selectInfos);

  const subjects = useSelector(selectSubjects);
  const subjectsName = subjects.map(({ subject_name }) => subject_name);

  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [obligatory, setObligatory] = useState(infos.obligatory);

  const [subject, setSubject] = useState(subjectsName[0]);

  const handleClose = () => {
    dispatch(hide());
  };

  const handlePlanEvent = () => {
    alert('Planing the event.');
  };

  return (
    <form
      className={`absolute justify-center items-center w-screen h-screen top-0 left-0 bg-black bg-opacity-50 z-50 ${
        infos.visible ? 'flex' : 'hidden'
      }`}
      onSubmit={handlePlanEvent}
    >
      <div className='flex flex-col min-w-medium p-8 bg-white border border-solid border-black'>
        <header className='flex flex-col'>
          <div className='flex justify-between'>
            <h1 className='text-2xl text-black font-bold'>{infos.title || 'Planification'}</h1>
            <X onClick={handleClose} className='cursor-pointer' />
          </div>
          <div className='flex flex-row justify-between'>
            <p className='text-base text-black font-normal'>{infos.date}</p>
            <p className='text-base text-black font-normal'>{infos.time}</p>
          </div>
        </header>

        <main className='flex flex-col mt-4'>
          <SwitchButton checked={obligatory} onChange={setObligatory} label='Obligatoire' className='mb-4' />
          <RadioGroup selected={subject} setSelected={setSubject} fields={subjectsName} />
          <Input value={link} onChange={setLink} placeholder='https://lycee.cned.fr' label='Lien' className='mb-4' />
          <Textarea value={description} onChange={setDescription} placeholder='Description...' label='Description' />
        </main>

        <footer className='flex flex-row justify-between mt-6'>
          <Button type='button' className='w-auto mr-12' secondary>
            Annuler
          </Button>

          <Button type='submit' className='w-auto'>
            Modifier
          </Button>
        </footer>
      </div>
    </form>
  );
};

export default PlanModal;
