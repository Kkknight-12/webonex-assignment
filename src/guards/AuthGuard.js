import React, { useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // console.log("have access token");
      setIsAuthenticated(true);
      return <Navigate to={"/dashboard/home"} />;
    } else {
      // console.log("dont have access token");
      return <Navigate to={"/login"} />;
    }
  }

  return <div>{children}</div>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;