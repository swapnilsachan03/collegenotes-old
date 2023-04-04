import { server } from "../store";
import axios from "axios";

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