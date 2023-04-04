import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { subjectReducer } from "./reducers/subjectReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
})

export default store;
export const server = "https://www.collegenotes.co.in/api/v1";