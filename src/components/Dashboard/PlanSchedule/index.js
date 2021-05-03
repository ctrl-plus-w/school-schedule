import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Plus } from 'react-feather';

import { v4 as uuidv4 } from 'uuid';

import { animateIn } from '../../../hooks/useAnimation';

import Time from '../../../utils/Time';
import { arrayInclude, destructure } from '../../../utils/Utils';
import { isAfterToday, sameDay } from '../../../utils/Calendar';
import { getLength, getLines, isEmptyHead, isEmptyHeadAlone, isHead, isHeadAlone, getTail, isBody } from '../../../utils/Cell';

import { config } from '../../../features/modals/planSlice';

const PlanSchedule = (props) => {
  const dispatch = useDispatch();

  const [selectedEvents, setSelectedEvents] = useState([]);

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    let mounted = true;

    animateIn().then(() => {
      if (mounted) setFirstRender(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handlePlanEvent = (e, event, duration) => {
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      title: 'Création',
      startDate: event.startDay.toISOString(),
      startTime: [event.start.hours, event.start.mins],
      duration: duration || 1,
    };

    dispatch(config(payload));
  };

  const handleSelect = ({ column, row }) => {
    setSelectedEvents((prev) => {
      if (prev.some(([column_, row_]) => column_ === column && row_ === row)) {
        return prev.filter(([col_, row_]) => column !== col_ || row_ < row || row_ > getTail(prev, [column, row]));
      } else {
        return [...prev, [column, row]];
      }
    });
  };

  const getDayEvents = (dayEvents, day) => {
    return new Array(9).fill(0).reduce((acc, curr, i) => {
      const condition = (event) => parseInt(event.start.hours) === i + 8;

      const event = dayEvents.find(condition);

      if (event) return [...acc, event];
      else return [...acc, { id: uuidv4(), start: new Time(i + 8, 0), startDay: day, empty: true }];
    }, []);
  };

  const getEventElement = (eventsArray, i) => {
    const [prev, curr, next] = destructure(eventsArray, i);

    const dayIndex = props.days.findIndex((day) => sameDay(day, curr.startDay));

    const column = 2 * dayIndex + 1;
    const row = curr.start.hours - 8 + 1;

    const classes = `col-start-${column} row-start-${row}`;

    const isSelectable = isAfterToday(curr.startDay);

    const emptyCell = (selected, rowEnd) => (
      <div
        className={`flex ${classes} ${rowEnd ? `row-end-${rowEnd}` : `row-end-${row + 1}`} ${isSelectable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        key={uuidv4()}
        onClick={() => isSelectable && handleSelect({ column, row })}
      >
        <div
          className={`selected-event flex justify-end items-end w-full h-auto m-0.5 p-2 rounded ${
            selected ? 'border-2 border-dashed border-purple-500' : ''
          }`}
        >
          {selected && (
            <Plus
              className='relative text-purple-500 p-2 hover:bg-purple-200 rounded-full transition-all box-content z-30'
              onClick={(e) => handlePlanEvent(e, curr, rowEnd - row)}
            />
          )}
        </div>
      </div>
    );

    const cell = (length) => (
      <div className={`flex ${classes} ${`row-end-${length ? row + length + 1 : row + 1}`} cursor-not-allowed`} key={uuidv4()}>
        <div className={`event ${selectedEvents.length || !firstRender ? 'scale-100 opacity-100' : ''} border-solid bg-gray-400 rounded`}></div>
      </div>
    );

    if (isHeadAlone(prev, curr, next)) return cell();
    if (isHead(prev, curr)) return cell(getLength(eventsArray, curr));

    // Note : Empty events can be selected.
    if (isEmptyHeadAlone(selectedEvents, column, row)) return emptyCell(true);
    if (isEmptyHead(selectedEvents, column, row)) return emptyCell(true, getTail(selectedEvents, [column, row]) + 1);

    if (!arrayInclude(selectedEvents, [column, row]) && !isBody(prev, curr, next)) return emptyCell(false);
  };

  const dayMapper = (day) => {
    const condition = ({ startDay }) => sameDay(startDay, day);
    const dayEvents = getDayEvents(props.events.filter(condition), day);
    return dayEvents.map((id, i) => getEventElement(dayEvents, i));
  };

  return (
    <div className='schedule'>
      {props.days.map(dayMapper)}
      {getLines()}
    </div>
  );
};

PlanSchedule.propTypes = {
  days: PropTypes.array,
  events: PropTypes.array,
};

export default React.memo(PlanSchedule);
