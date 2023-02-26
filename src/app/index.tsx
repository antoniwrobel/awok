// External imports
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";

// Local imports
import RequireAuth from "../components/RequireAuth";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import PublicPage from "../pages/Public";

// Component definition
const App = () => {
  return (
    <Box height="100%">
      <Routes>
        <Route>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Box>
  );
};

// Default export
export default App;
