import { Navigate, useLocation } from "react-router-dom";
import { getAccessToken } from "src/auth/auth-service";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
