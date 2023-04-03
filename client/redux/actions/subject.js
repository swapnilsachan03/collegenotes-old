import { server } from "../store";
import axios from "axios";

export const getAllSubjects = (keywords, degree, year) => async (dispatch) => {
  try {
    dispatch({ type: "getAllSubjectsRequest" });
    
    const { data } = await axios.get(`${server}/getAllSubjects?search=${keywords}&degree=${degree}&year=${year}`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({ type: "getAllSubjectsSuccess", payload: data.subjects });
  }
  
  catch (error) {
    dispatch({ type: "getAllSubjectsFail", payload: error.response.data.message });
  }
}

export const getSubject = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSubjectRequest" });

    const { data } = await axios.get(`${server}/subject/${id}`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({ type: "getSubjectSuccess", payload: data.subject });
  }

  catch (error) {
    dispatch({ type: "getSubjectFail", payload: error.response.data.message });
  }
}

export const favoriteSubject = (id) => async (dispatch) => {
  try {
    dispatch({ type: "favoriteSubjectRequest" });

    const { data } = await axios.post(`${server}/favorites`, { id }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "favoriteSubjectSuccess", payload: data.message });
  }

  catch (error) {
    dispatch({ type: "favoriteSubjectFail", payload: error.response.data.message });
  }
}

export const getNotes = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getNotesRequest" });

    const { data } = await axios.get(`${server}/notes/${id}`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({ type: "getNotesSuccess", payload: data.notes });
  }

  catch (error) {
    dispatch({ type: "getNotesFail", payload: error.response.data.message });
  }
}

export const bookmarkNotes = (id) => async (dispatch) => {
  try {
    dispatch({ type: "bookmarkNotesRequest" });

    const { data } = await axios.post(`${server}/bookmarks`, { id }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "bookmarkNotesSuccess", payload: data.message });
  }

  catch (error) {
    dispatch({ type: "bookmarkNotesFail", payload: error.response.data.message });
  }
}