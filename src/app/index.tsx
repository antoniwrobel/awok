// External imports
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

// Local imports
import routes from "../../src/routes";
import LoadingModal from "../modals/Loading";
import RequireAuth from "../components/RequireAuth";
import { useLoading } from "../hooks";
import RequirePublic from "src/components/RequirePublic";

// Component definition
const App = () => {
  const { isLoading } = useLoading();

  return (
    <Box height="100%">
      <LoadingModal isOpen={isLoading} />
      <Routes>
        {routes.map(
          (
            { path, isProtected, isPublicOnly, component: RouteComponent },
            index
          ) => {
            return (
              <Route
                key={index}
                path={path}
                element={
                  isProtected ? (
                    <RequireAuth>
                      <RouteComponent />
                    </RequireAuth>
                  ) : isPublicOnly ? (
                    <RequirePublic>
                      <RouteComponent />
                    </RequirePublic>
                  ) : (
                    <RouteComponent />
                  )
                }
              />
            );
          }
        )}
      </Routes>
    </Box>
  );
};

// Default export
export default App;
