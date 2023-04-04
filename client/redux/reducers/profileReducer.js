import { createReducer } from "@reduxjs/toolkit";

export const profileReducer = createReducer({}, {
  updateProfileRequest: (state) => {
    state.loading = true;
  },

  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  updateProfileFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  deleteProfileRequest: (state) => {
    state.loading = true;
  },

  deleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.message = action.payload;
  },

  deleteProfileFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  changePasswordRequest: (state) => {
    state.loading = true;
  },

  changePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  changePasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  forgotPasswordRequest: (state) => {
    state.loading = true;
  },

  forgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  forgotPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  resetPasswordRequest: (state) => {
    state.loading = true;
  },

  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  resetPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },

  clearMessage: (state) => {
    state.message = null;
  },
})