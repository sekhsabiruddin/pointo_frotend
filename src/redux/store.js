import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./dataSlice";
const store = configureStore({
  reducer: {
    notes: notesSlice,
  },
});

export default store;
