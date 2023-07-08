import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children, redirectPath = "/login" }) => {
	if (!user) return <Navigate to={redirectPath} replace />;

	return children;
};
