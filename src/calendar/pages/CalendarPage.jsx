import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEvent , CalendarModal } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUiStore } from '../../hooks/useUiStore';

const events = [
  {
    title: 'Boss birthday',
    notes: 'Go buy a cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Jaaciel',
    },
  },
];
export const CalendarPage = () => {
  const {openDateModal} = useUiStore()
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadios: '0px',
      opacity: '0.8',
      color: 'white',
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal()
  };

  const onSelect = (event) => {
    console.log({ click: event });
  };
  const onViewChanged = (event) => {
    console.log({ viewChanged: event });
    localStorage.setItem('lastView', event);
  };
  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        // messages = {getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
    </>
  );
};
