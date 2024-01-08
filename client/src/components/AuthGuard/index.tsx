import React from "react";
import { Navigate } from "react-router-dom";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import useAuth from "../../hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={SCREEN_PATHS.HOME} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
