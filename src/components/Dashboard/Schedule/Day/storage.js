const [events] = useState(
  new Array(9).fill(0).reduce((acc, c, i) => {
    const event = props.infos.events.filter((event) => event.start.hours === i + 8)[0];
    if (!event)
      return [
        ...acc,
        {
          id: uuidv4(),
          start: new Time(i + 8, 0),
          empty: true,
          selected: false,
        },
      ];
    return [...acc, { id: uuidv4(), ...event }];
  }, [])
);

const getWeekDay = (date) => {
  switch (date.getDay().toString()) {
    case '0':
      return 'Lundi';
    case '1':
      return 'Mardi';
    case '2':
      return 'Mercredi';
    case '3':
      return 'Jeudi';
    case '4':
      return 'Vendredi';
    case '5':
      return 'Samedi';
    case '6':
      return 'Dimanche';
    default:
      return 'Unknown';
  }
};

const getEventElement = (events, i) => {
  const prev = events[i - 1];
  const curr = events[i];
  const next = events[i + 1];

  const isOneSelected = events.filter((event) => event?.selected).length > 0;

  if (curr.empty) {
    return <div className={`event empty ${curr.selected ? 'selected' : ''}`} onClick={(e) => this.onEventClick(e, curr.id)} key={curr.id}></div>;
  }

  const defaultClasses = `event ${curr.color}${isOneSelected ? ' blur' : ''}`;

  if (!prev || prev.empty) {
    if (next?.subject === curr.subject) {
      return (
        <div className={`start ${defaultClasses}`} key={curr.id}>
          <h3 className='subject'>{curr.subject}</h3>
          <p className='description'>{curr.start.toString}</p>
        </div>
      );
    }

    return (
      <div className={`normal ${defaultClasses}`} key={curr.id}>
        <h3 className='subject'>{curr.subject}</h3>
        <p className='description'>{curr.start.toString}</p>
      </div>
    );
  }

  if (!next || next.empty) {
    if (prev.subject === curr.subject) {
      return <div className={`end ${defaultClasses}`} key={curr.id}></div>;
    }
  }

  // If next is an event and prev as well.
  if (!next.empty && !prev.empty) {
    if (next.subject === curr.subject && prev.subject === curr.subject && prev.subject === next.subject) {
      return <div className={`middle ${defaultClasses}`} key={curr.id}></div>;
    }

    if (prev.subject === curr.subject && curr.subject !== next.subject) {
      return <div className={`end ${defaultClasses}`} key={curr.id}></div>;
    }

    if (prev.subject !== curr.subject && curr.subject === next.subject) {
      return (
        <div className={`middle ${defaultClasses}`} key={curr.id}>
          <h3 className='subject'>{curr.subject}</h3>
          <p className='description'>{curr.start.toString}</p>
        </div>
      );
    }
  }

  return (
    <div className={`end ${defaultClasses}`} key={curr.id}>
      <h3 className='subject'>{curr.subject}</h3>
      <p className='description'>{curr.start.toString}</p>
    </div>
  );
};

const handleClickEvent = (e, id) => {
  const tempEvents = events;
  const eventIndex = tempEvents.findIndex((e) => e.id === id);

  const isSelected = tempEvents[eventIndex].selected;
  tempEvents[eventIndex] = { ...tempEvents[eventIndex], selected: !isSelected };
  this.setState({ events: tempEvents });
};
