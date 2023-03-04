import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "src/hooks";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user, hasBeenChecked } = useUser();

  if (hasBeenChecked && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
