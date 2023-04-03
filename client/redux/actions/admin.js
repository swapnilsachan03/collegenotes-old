import { server } from "../store";
import axios from "axios";

export const addSubject = (formdata) => async (dispatch) => {
  try {
    dispatch({type: "addSubjectRequest"});

    const { data } = await axios.post(`${server}/addSubject`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({type: "addSubjectSuccess", payload: data.message});
  }
  
  catch (error) {
    dispatch({ type: "addSubjectFail", payload: error.response.data.message })
  }
}

export const editSubject = (formdata, subjectID) => async (dispatch) => {
  try {
    dispatch({type: "editSubjectRequest"});

    const { data } = await axios.put(`${server}/subject/${subjectID}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({type: "editSubjectSuccess", payload: data.message});
  }
  
  catch (error) {
    dispatch({ type: "editSubjectFail", payload: error.response.data.message })
  }
}

export const deleteSubject = (subjectID) => async (dispatch) => {
  try {
    dispatch({type: "deleteSubjectRequest"});

    const { data } = await axios.delete(`${server}/subject/${subjectID}`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({type: "deleteSubjectSuccess", payload: data.message});
  }
  
  catch (error) {
    dispatch({ type: "deleteSubjectFail", payload: error.response.data.message })
  }
}

export const addNotes = (formdata, subjectID) => async (dispatch) => {
  try {
    dispatch({type: "addNotesRequest"});

    const { data } = await axios.post(`${server}/subject/${subjectID}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true,
    });

    dispatch({type: "addNotesSuccess", payload: data.message});
  }

  catch (error) {
    dispatch({ type: "addNotesFail", payload: error.response.data.message })
  }
}

export const deleteNotes = (notesID, subjectID) => async (dispatch) => {
  try {
    dispatch({type: "deleteNotesRequest"});

    const { data } = await axios.delete(`${server}/notes?notesID=${notesID}&subjectID=${subjectID}`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({type: "deleteNotesSuccess", payload: data.message});
  }

  catch (error) {
    dispatch({ type: "deleteNotesFail", payload: error.response.data.message })
  }
}

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({type: "getAllUsersRequest"});

    const { data } = await axios.get(`${server}/admin/getAllUsers`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({type: "getAllUsersSuccess", payload: data.users});
  }

  catch (error) {
    dispatch({ type: "getAllUsersFail", payload: error.response.data.message })
  }
}

export const deleteUser = (userID) => async (dispatch) => {
  try {
    dispatch({type: "deleteUserRequest"});

    const { data } = await axios.delete(`${server}/admin/user/${userID}`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({type: "deleteUserSuccess", payload: data.message});
  }

  catch (error) {
    dispatch({ type: "deleteUserFail", payload: error.response.data.message })
  }
}

export const changeRole = (userID) => async (dispatch) => {
  try {
    dispatch({type: "changeRoleRequest"});

    const { data } = await axios.put(`${server}/admin/user/${userID}`, {}, {
      headers: {},
      withCredentials: true,
    });

    dispatch({type: "changeRoleSuccess", payload: data.message});
  }

  catch (error) {
    dispatch({ type: "changeRoleFail", payload: error.response.data.message })
  }
}

export const getDashboardStats = () => async (dispatch) => {
  try {
    dispatch({type: "getAdminStatsRequest"});

    const { data } = await axios.get(`${server}/admin/stats`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({type: "getAdminStatsSuccess", payload: data});
  }

  catch (error) {
    dispatch({ type: "getAdminStatsFail", payload: error.response.data.message })
  }
}