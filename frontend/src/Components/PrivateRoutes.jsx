import { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const auth = localStorage.getItem('token'); 
  const location = useLocation();

  useEffect(() => {
    if (!auth) {
    }
  }, [auth, location]);

  return auth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;