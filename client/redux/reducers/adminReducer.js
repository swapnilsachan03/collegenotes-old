import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({}, {
  getAdminStatsRequest: (state, action) => {
    state.loading = true;
  },

  getAdminStatsSuccess: (state, action) => {
    state.loading = false;
    state.stats = action.payload.stats;
    state.usersCount = action.payload.usersCount;
    state.viewsCount = action.payload.viewsCount;
    state.usersChange = action.payload.usersChange;
    state.viewsChange = action.payload.viewsChange;
    state.usersProfit = action.payload.usersProfit;
    state.viewsProfit = action.payload.viewsProfit;
  },

  getAdminStatsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getAllUsersRequest: (state, action) => {
    state.loading = true;
  },

  getAllUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },

  getAllUsersFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  deleteUserRequest: (state, action) => {
    state.loading = true;
  },

  deleteUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  deleteUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  changeRoleRequest: (state, action) => {
    state.loading = true;
  },

  changeRoleSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  changeRoleFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  addSubjectRequest: (state, action) => {
    state.loading = true;
  },

  addSubjectSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  addSubjectFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  editSubjectRequest: (state, action) => {
    state.loading = true;
  },

  editSubjectSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  editSubjectFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteSubjectRequest: (state, action) => {
    state.loading = true;
  },

  deleteSubjectSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  deleteSubjectFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  addNotesRequest: (state, action) => {
    state.loading = true;
  },

  addNotesSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  addNotesFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteNotesRequest: (state, action) => {
    state.loading = true;
  },

  deleteNotesSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  deleteNotesFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearMessage: (state, action) => {
    state.message = null;
  },

  clearError: (state, action) => {
    state.error = null;
  }
})