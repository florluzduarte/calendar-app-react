import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    handleSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    handleAddNewEvent: (state, action) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    handleEventUpdate: (state, action) => {
      state.events = state.events.map((calendarEvent) => {
        if (calendarEvent.id === action.payload.id) {
          return action.payload;
        }
        return calendarEvent;
      });
    },
    handleEventDelete: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    handleLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    handleLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleAddNewEvent,
  handleEventDelete,
  handleEventUpdate,
  handleLoadEvents,
  handleLogoutCalendar,
  handleSetActiveEvent,
} = calendarSlice.actions;
