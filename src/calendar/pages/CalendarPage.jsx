import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEvent, CalendarModal,FabAddNew } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks';

export const CalendarPage = () => {
  const { events , setActiveEvent} = useCalendarStore();
  const { openDateModal } = useUiStore();
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
    openDateModal();
  };

  const onSelect = (event) => {
    console.log({ click: event });
    setActiveEvent(event)
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
      <CalendarModal />
      <FabAddNew/>
    </>
  );
};
