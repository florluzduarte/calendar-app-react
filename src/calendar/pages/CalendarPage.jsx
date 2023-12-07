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
import { useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
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

  const eventStyleGetter = () => {
    //console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: "#AF69EE",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

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
