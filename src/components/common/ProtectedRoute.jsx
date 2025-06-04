import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in but role not authorized
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-red-100 text-red-700 rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return children;
}
