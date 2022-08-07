import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import Landing from "../src/components/layout/Landing";
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";

import "./App.css";
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            {/* <div> */}
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            {/* </div> */}
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
}
