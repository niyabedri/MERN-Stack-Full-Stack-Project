import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux"; // provides our app with a store
import store from "./store";

import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import Landing from "../src/components/layout/Landing";
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";
import Dashboard from "../src/components/dashboard/Dashboard";

import "./App.css";
import { clearCurrentProfile } from "./actions/profileActions";

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    // clear current profile
    store.dispatch(clearCurrentProfile());

    window.location.href = "/login";
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              {/* <div> */}
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              {/* </div> */}
            </Routes>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
