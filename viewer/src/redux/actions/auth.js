import { server } from "../store";
import axios from "axios";

export const logout = () => async (dispatch) => {
  try {
    dispatch({type: "logoutRequest"});

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
      credentials: "include",
    });

    dispatch({type: "logoutSuccess", payload: data.message});
  }
  
  catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message })
  }
}

export const getUser = () => async (dispatch) => {
  try {
    dispatch({type: "loadUserRequest"});

    const { data } = await axios.get(`${server}/profile`, {
      withCredentials: true,
    });

    dispatch({type: "loadUserSuccess", payload: data.user});
  }
  
  catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message })
  }
}