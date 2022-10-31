import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// -------------------------------------------------------------------------------

const GuestGuard = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // console.log("have auth in local storage");
    return <Navigate to={"/dashboard/home"} />;
  }
  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;