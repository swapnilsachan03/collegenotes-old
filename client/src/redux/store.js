import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./reducers/adminReducer";
import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";
import { subjectReducer } from "./reducers/subjectReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    subjects: subjectReducer,
    admin: adminReducer,
  }
})

export default store;
export const server = "https://server.collegenotes.co.in/api/v1";