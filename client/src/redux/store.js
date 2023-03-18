import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";
import { subjectReducer } from "./reducers/subjectReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    subjects: subjectReducer,
  }
})

export default store;
export const server = "https://collegenotes-server.vercel.app/api/v1";