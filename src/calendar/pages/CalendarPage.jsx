import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";

import { CalendarEventBox, CalendarModal, Navbar } from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useState } from "react";

const events = [
  {
    title: "Cumpleaños del jefe",
    notes: "Hay que comprar el regalo",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Florencia",
    },
  },
];

export const CalendarPage = () => {
  const defaultViewInitialState = localStorage.getItem("lastView") || "week";
  const [defaultView, setDefaultView] = useState(defaultViewInitialState);

  const handleEventClick = (event) => {
    console.log({ click: event });
  };

  const handleEventDoubleClick = (event) => {
    console.log({ doubleClick: event });
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
    </>
  );
};
