// External imports
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

// Local imports
import routes from "../../src/routes";
import LoadingModal from "../modals/Loading";
import RequireAuth from "../components/RequireAuth";
import { useLoading } from "../hooks";

// Component definition
const App = () => {
  const { isLoading } = useLoading();

  return (
    <Box height="100%">
      <LoadingModal isOpen={isLoading} />
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.isProtected ? (
                  <RequireAuth>
                    <route.component />
                  </RequireAuth>
                ) : (
                  <route.component />
                )
              }
            />
          );
        })}
      </Routes>
    </Box>
  );
};

// Default export
export default App;
