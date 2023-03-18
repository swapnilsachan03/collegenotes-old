import { createReducer } from "@reduxjs/toolkit";

export const subjectReducer = createReducer({}, {
  getSubjectsRequest: (state, action) => {
    state.loading = true;
  },

  getSubjectsSuccess: (state, action) => {
    state.loading = false;
    state.subjects = action.payload;
  },

  getSubjectsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state, action) => {
    state.error = null;
  },

  clearMessage: (state, action) => {
    state.message = null;
  },
})