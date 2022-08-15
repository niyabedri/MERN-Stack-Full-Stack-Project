import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ auth, children }) => {
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : "";
};

ProtectedRoute.propTpyes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
