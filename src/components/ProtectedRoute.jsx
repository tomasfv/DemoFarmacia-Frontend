import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth0();
  
  const email = process.env.REACT_APP_ALLOWED_USER_EMAIL;
  const userName = process.env.REACT_APP_ALLOWED_USER_NAME;

  const usuarioPermitido = user?.email === email && user?.name === userName;

  if (!isAuthenticated || !usuarioPermitido) {
    return <Navigate to="/acceso-denegado" />;
  }

  return children;
}
