import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

//Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_PROFILE, payload: {} });
    });
};

//Create profile
export const createProfile = (profileData) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => (window.location.href = "/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: err.response.data,
      })
    );
};

//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

//Clear loading
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
