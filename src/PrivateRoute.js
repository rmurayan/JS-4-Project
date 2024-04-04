import React from "react";
import { Route, Navigate } from "react-router-dom";
import { auth } from "./DB/database";

const PrivateRoute = ({ element : Element, ...rest }) => {
  const isAuthenticated = auth.currentUser !== null;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Element : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
