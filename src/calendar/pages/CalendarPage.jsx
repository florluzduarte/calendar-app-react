import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  CalendarEventBox,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const defaultViewInitialState = localStorage.getItem("lastView") || "week";
  const [defaultView, setDefaultView] = useState(defaultViewInitialState);

  const handleEventClick = (event) => {
    setActiveEvent(event);
  };

  const handleEventDoubleClick = () => {
    openDateModal();
  };

  const handleViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setDefaultView(event);
  };

  const eventStyleGetter = (event) => {
    //console.log({ event, start, end, isSelected });

    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#AF69EE" : "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={defaultView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onSelectEvent={handleEventClick}
        onView={handleViewChange}
        onDoubleClickEvent={handleEventDoubleClick}
      />
      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  );
};
