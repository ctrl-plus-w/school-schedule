/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

import { hide, selectInfos } from '../../../features/modals/createSlice';
import { fetchSubjects, selectSubjects } from '../../../features/database/subjectsSlice';

import Selector from '../../Selector';
import { selectEvents, editEvent, selectLabel } from '../../../features/infos/infosSlice';

import { getWeekDay, getMonth } from '../../../utils/Calendar';
import Time from '../../../utils/Time';
import { createEvent } from '../../../features/database/eventsSlice';

// TODO : [ ] Focus on the field when visible.
// TODO : [ ] Handle form submit.
// TODO : [ ] Reset selected on when visible.

const CreationModal = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchSubjects()), []);

  const [selected, setSelected] = useState('');
  const [selectedDay, setSelectedDay] = useState(0);

  const infos = useSelector(selectInfos);
  const subjects = useSelector(selectSubjects);
  const selectedEvents = useSelector(selectEvents);
  const label = useSelector(selectLabel);

  const handleContentClick = (event) => event.stopPropagation();
  const handleClose = () => dispatch(hide());

  const handleSetSelected = (item) => {
    setSelected(item.name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selected) return;
    if (!label) return;

    const day = Object.keys(selectedEvents)[selectedDay];
    for (const event of selectedEvents[day]) {
      const descriptionEl = document.querySelector(`#start${event.start.replace(':', '_')}`);
      const description = descriptionEl.value;

      const [hour, min] = event.start.split(':').map(parseFloat);
      const date = new Date(new Date(day).setHours(hour, min));

      const obligatory = event.obligatory;

      dispatch(
        createEvent({
          start: date,
          description: description,
          obligatory: obligatory,
          label_name: label,
          subject_name: selected,
        })
      );
    }

    // TODO : [ ] Stop if their is no others days after and show "Validation" instead of "Suivant". Check if the day isn't empty.
    // TODO : [ ] Refetch all the events after creating some.

    // setSelectedDay((prev) => prev + 1);
    // handleSubmit(event);
  };

  const mapHours = (hours, day) => {
    return hours.map(({ start, obligatory }) => {
      const getHour = (h) => h.split(':').map(parseFloat)[0];
      const currHour = getHour(start);

      const find = (hs, base, index, curr = base) => {
        const next = hs.find(({ start }) => parseFloat(start.split(':')[0]) === curr + index);
        if (!next) return base === curr ? false : curr;
        return find(hs, base, index, curr + index);
      };

      const prevHour = find(hours, currHour, -1);
      const nextHour = find(hours, currHour, +1);

      const handleClick = () => {
        dispatch(editEvent({ date: day, start, obligatory: !obligatory }));
      };

      const getHourElement = (h1, h2) => {
        return (
          <div className='hour' key={start}>
            <p className='start'>
              {h1} - {h2}
              <span className={`pin ${obligatory ? 'red' : 'green'}`} onClick={handleClick}>
                {obligatory ? 'Obligatoire' : 'Facultatif'}
              </span>
            </p>
            <label className='description' htmlFor={`start${start.replace(':', '_')}`}>
              Description
              <input type='text' id={`start${start.replace(':', '_')}`} placeholder='Veuillez entrer une description.' />
            </label>
          </div>
        );
      };

      if (!prevHour && nextHour) return getHourElement(start, new Time(nextHour, 0).toString);
      if (!prevHour && !nextHour) return getHourElement(start, new Time(currHour + 1, 0).toString);
    });
  };

  const getFirstDay = () => {
    const day = Object.keys(selectedEvents)[0];

    if (selectedEvents[day] && selectedEvents[day].length > 0)
      return (
        <div className='day-container'>
          <h3 className='day-name'>
            {getWeekDay(new Date(day))} {new Date(day).getDate()} {getMonth(new Date(day))}
          </h3>
          <div className='hours-list'>{mapHours(selectedEvents[day], day)}</div>
        </div>
      );
  };

  return (
    <form className={`modal ${infos.visible ? 'visible' : 'hidden'}`} onClick={handleClose} onSubmit={handleSubmit}>
      <div className='modal-content' onClick={handleContentClick}>
        <header>
          <h1 className='title'>{infos.title}</h1>
          <X className='icon' onClick={handleClose} size={28} />
        </header>

        <div className='content'>
          <p className='description'>{infos.description}</p>

          {getFirstDay()}

          <div className='fields'>
            <div className='form-group'>
              <Selector
                items={subjects.map((s) => ({ id: s.id, name: s.subject_name }))}
                selected={selected}
                setSelected={handleSetSelected}
                placeholder='Choisir un sujet'
                className='field'
                onSubmit={handleSubmit}
                noValidation
              />
              <button type='submit' className={`submit-button ${!selected && 'disabled'}`}>
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreationModal;
