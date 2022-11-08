import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { convertEventsToDate } from '../helpers';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO: get to backend

    //All good
    if (calendarEvent._id) {
      //Updating
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //Creating
      const { data } = await calendarApi.post('/events', calendarEvent);

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async() => {
    try {
      

      const {data} = await calendarApi.get('/events')
      const events = convertEventsToDate(data.eventos)
      console.log({events})


    } catch (error) {
      console.log('Error cargando eventos')
      console.log(error)
    }
  }
  return {
    //*Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
