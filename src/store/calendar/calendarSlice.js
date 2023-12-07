import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumpleaños del jefe",
  notes: "Hay que comprar el regalo",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Florencia",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
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
  },
});

// Action creators are generated for each case reducer function
export const { handleSetActiveEvent, handleAddNewEvent } =
  calendarSlice.actions;