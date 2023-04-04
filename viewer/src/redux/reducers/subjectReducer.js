import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
  subject: null,
  loading: false,
  error: null,
  message: null,
};

export const subjectReducer = createReducer(initialState, {
  getNotesRequest: (state, action) => {
    state.loading = true;
  },

  getNotesSuccess: (state, action) => {
    state.loading = false;
    state.notes = action.payload;
  },

  getNotesFail: (state, action) => {
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