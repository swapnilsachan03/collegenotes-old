import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: null,
  error: null,
  message: null,
};

export const authReducer = createReducer(initialState, {
  logoutRequest: (state, action) => {
    state.loading = true;
  },

  logoutSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.message = action.payload;
  },

  logoutFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.error = action.payload;
  },
  
  loadUserRequest: (state, action) => {
    state.loading = true;
  },

  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },

  loadUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },

  clearMessage: (state) => {
    state.message = null;
  },
});