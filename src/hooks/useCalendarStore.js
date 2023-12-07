import { useSelector, useDispatch } from "react-redux";
import {
  handleAddNewEvent,
  handleEventDelete,
  handleEventUpdate,
  handleSetActiveEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((store) => store.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(handleSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO: conectar con el backend
    //TODO: si todo sale bien evaluar

    if (calendarEvent._id) {
      //actualizando evento
      dispatch(handleEventUpdate({ ...calendarEvent }));
    } else {
      //creando evento
      dispatch(
        handleAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })
        //TODO: crear los id con el backend
      );
    }
  };

  const startDeletingEvent = async () => {
    dispatch(handleEventDelete());
  };

  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
