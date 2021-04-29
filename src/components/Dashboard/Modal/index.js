import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { X } from 'react-feather';

import Input from '../../Input';
import Textarea from '../../Textarea';
import SwitchButton from '../../SwitchButton';
import Button from '../../Button';

import { hide, selectInfos } from '../../../features/modals/editSlice';

const Modal = () => {
  const dispatch = useDispatch();

  const infos = useSelector(selectInfos);

  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [obligatory, setObligatory] = useState(false);

  const handleClose = () => {
    dispatch(hide());
  };

  return (
    <div
      className={`absolute justify-center items-center w-screen h-screen top-0 left-0 bg-black bg-opacity-50 z-50 ${
        infos.visible ? 'flex' : 'hidden'
      }`}
    >
      <div className='flex flex-col min-w-medium p-8 bg-white border border-solid border-black'>
        <header className='flex flex-col'>
          <div className='flex justify-between'>
            <h1 className='text-2xl text-black font-bold'>Title</h1>
            <X onClick={handleClose} className='cursor-pointer' />
          </div>
          <p className='text-base text-black font-normal'>Description...</p>
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

          <Button type='button' className='w-auto'>
            Modifier
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
