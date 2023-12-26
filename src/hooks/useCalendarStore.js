import { useSelector, useDispatch } from "react-redux";
import {
  handleAddNewEvent,
  handleEventDelete,
  handleEventUpdate,
  handleLoadEvents,
  handleSetActiveEvent,
} from "../store";
import { calendarApi } from "../api";
import { convertEventsDateType } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((store) => store.calendar);
  const { user } = useSelector((store) => store.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(handleSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //actualizando evento
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(handleEventUpdate({ ...calendarEvent, user }));
        return;
      }
      //creando evento
      const response = await calendarApi.post("/events", calendarEvent);

      dispatch(
        handleAddNewEvent({
          ...calendarEvent,
          id: response.data.event.id,
          user,
        })
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error al salvar el evento", error.response.data?.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(handleEventDelete());
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al eliminar el evento",
        error.response.data?.msg,
        "error"
      );
    }
  };

  const startLoadingEvents = async () => {
    try {
      const response = await calendarApi.get("/events");
      const events = convertEventsDateType(response.data.events);
      dispatch(handleLoadEvents(events));
    } catch (error) {
      console.log("Error al cargar eventos");
      console.log(error);
    }
  };

  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
