import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
  subject: null,
  loading: false,
  error: null,
  message: null,
};

export const subjectReducer = createReducer(initialState, {
  getAllSubjectsRequest: (state, action) => {
    state.loading = true;
  },

  getAllSubjectsSuccess: (state, action) => {
    state.loading = false;
    state.subjects = action.payload;
  },

  getAllSubjectsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  getSubjectRequest: (state, action) => {
    state.loading = true;
  },

  getSubjectSuccess: (state, action) => {
    state.loading = false;
    state.subject = action.payload;
  },

  getSubjectFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  favoriteSubjectRequest: (state, action) => {
    state.loading = true;
  },

  favoriteSubjectSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  favoriteSubjectFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  unfavoriteSubjectRequest: (state, action) => {
    state.loading = true;
  },

  unfavoriteSubjectSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  unfavoriteSubjectFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  bookmarkNotesRequest: (state, action) => {
    state.loading = true;
  },

  bookmarkNotesSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  bookmarkNotesFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  unBookmarkNotesRequest: (state, action) => {
    state.loading = true;
  },

  unBookmarkNotesSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  unBookmarkNotesFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

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