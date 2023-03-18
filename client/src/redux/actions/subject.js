import { server } from "../store";
import axios from "axios";

export const getSubjects = (keywords, degree, year) => async (dispatch) => {
  try {
    dispatch({ type: "getSubjectsRequest" });
    
    const { data } = await axios.get(`${server}/getAllSubjects?search=${keywords}&degree=${degree}&year=${year}`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({ type: "getSubjectsSuccess", payload: data.subjects });
  }
  
  catch (error) {
    dispatch({ type: "getSubjectsFail", payload: error.response.data.message });
  }
}