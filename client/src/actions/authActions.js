import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
//Register User
export const registerUser = (userData) => (dispatch) => {
  //in asyncronous call that is where a thunk comes in ...dispatch

  axios
    .post("/api/users/register", userData)
    .then((res) => console.log("action", res))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - Get User Token
export const loginUserr = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //save to localstorage
      const { token } = res.data;
      //set token to ls
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));

      console.log("action", res);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
