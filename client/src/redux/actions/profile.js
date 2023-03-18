import { server } from "../store";
import axios from "axios";

export const updateProfile = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });
    
    const { data } = await axios.put(`${server}/profile`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({ type: "updateProfileSuccess", payload: data.message });
  }

  catch (error) {
    dispatch({ type: "updateProfileFail", payload: error.response.data.message });
  }
}

export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "deleteProfileRequest" });
    
    const { data } = await axios.delete(`${server}/profile`, {
      headers: {},
      withCredentials: true,
    });

    dispatch({ type: "deleteProfileSuccess", payload: data.message });
  }

  catch (error) {
    dispatch({ type: "deleteProfileFail", payload: error.response.data.message });
  }
}

export const changePassword = ({ oldPassword, newPassword }) => async (dispatch) => {
  try {
    dispatch({ type: "changePasswordRequest" });
    
    const { data } = await axios.put(`${server}/changePassword`, { oldPassword, newPassword }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "changePasswordSuccess", payload: data.message });
  }
  
  catch (error) {
    dispatch({ type: "changePasswordFail", payload: error.response.data.message });
  }
}

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });
    
    const { data } = await axios.post(`${server}/forgotPassword`, { email }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "forgotPasswordSuccess", payload: data.message });
  }
  
  catch (error) {
    dispatch({ type: "forgotPasswordFail", payload: error.response.data.message });
  }
}

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });
    
    const { data } = await axios.put(`${server}/resetPassword/${token}`, { password }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  }
  
  catch (error) {
    dispatch({ type: "resetPasswordFail", payload: error.response.data.message });
  }
}