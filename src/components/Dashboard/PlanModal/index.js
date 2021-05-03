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
import { createEvent, fetchAllLabelEvents } from '../../../features/database/eventsSlice';
import { selectLabels } from '../../../features/database/labelsSlice';
import { selectLabel } from '../../../features/infos/infosSlice';

import { getMonth, getWeekDay } from '../../../utils/Calendar';
import Time from '../../../utils/Time';

const PlanModal = () => {
  const dispatch = useDispatch();

  const infos = useSelector(selectInfos);

  const labels = useSelector(selectLabels);
  const label = useSelector(selectLabel);

  const subjects = useSelector(selectSubjects);
  const subjectsName = subjects.map(({ subject_name }) => subject_name);

  const [loading, setLoading] = useState(false);

  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [obligatory, setObligatory] = useState(false);

  const [subject, setSubject] = useState(subjectsName[0]);

  const formatDate = (date) => {
    return [getWeekDay(new Date(date)), new Date(date).getDate(), getMonth(new Date(date))].join(' ');
  };

  const formatAllTime = (time, duration) => {
    const formatTime = (hours, mins) => [Time.oneDigitToTwo(hours), Time.oneDigitToTwo(mins)].join(':');
    return [formatTime(time[0], time[1]), formatTime(time[0] + duration, time[1])].join(' - ');
  };

  const handleClose = () => {
    dispatch(hide());
  };

  const handlePlanEvent = async (event) => {
    event.preventDefault();

    const labelId = labels.find((l) => l.label_name === label)?.id;
    const subjectId = subjects.find((s) => s.subject_name === subject)?.id;

    if (!labelId || !subjectId) return;

    setLoading(true);

    for (let i = 0; i < infos.duration; i++) {
      const date = new Date(infos.startDate);
      date.setHours(infos.startTime[0] + i, infos.startTime[1], 0, 0);

      const payload = {
        start: date,
        link: link,
        description: description,
        obligatory: obligatory,
        label_id: labelId,
        subject_id: subjectId,
      };

      // ! Don't remove the await.
      await dispatch(createEvent(payload));
    }

    setLoading(false);
    await dispatch(hide());
    await fetchAllLabelEvents(dispatch, labelId);
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
            <p className='text-base text-black font-normal'>{formatDate(infos.startDate)}</p>
            <p className='text-base text-black font-normal'>{formatAllTime(infos.startTime, infos.duration)}</p>
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

          <Button type='submit' className='w-auto' loading={loading}>
            Créer
          </Button>
        </footer>
      </div>
    </form>
  );
};

export default PlanModal;
