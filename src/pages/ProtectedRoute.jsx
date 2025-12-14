import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedProfiles, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedProfiles.includes(user.profile)) {
    // redirige vers une page par défaut si le profil n’est pas autorisé
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
