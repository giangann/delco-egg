import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SCREEN_PATHS from "../shared/constants/screenPaths";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // call useAuth() => check local state if user status is authenticated
  const { user } = useAuth();

  // return children if auth status is true
  if (user) {
    return children;
  } else {
    return <Navigate to={SCREEN_PATHS.LOGIN} replace />;
  }

  // navigate to login when auth status is false
};
