import { useSelector, useDispatch } from "react-redux";
import { handleAddNewEvent, handleSetActiveEvent } from "../store";

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
    } else {
      //creando evento
      dispatch(
        handleAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })
        //TODO: crear los id con el backend
      );
    }
  };

  return {
    //Propiedades
    events,
    activeEvent,

    //Métodos
    setActiveEvent,
    startSavingEvent,
  };
};
