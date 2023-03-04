import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "src/hooks";

const RequirePublic = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user, isLoggedIn, hasBeenChecked } = useUser();

  if ((user || isLoggedIn) && hasBeenChecked) {
    return <Navigate to="/protected" state={{ from: location }} replace />;
  }

  return children;
};

export default RequirePublic;
