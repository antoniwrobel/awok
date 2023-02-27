// External imports
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

// Local imports
import RequireAuth from "../components/RequireAuth";
import LoadingModal from "../modals/Loading";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import PublicPage from "../pages/Public";
import { useLoading } from "../hooks";

// Component definition
const App = () => {
  const { isLoading } = useLoading();

  return (
    <Box height="100%">
      <LoadingModal isOpen={isLoading} />
      <Routes>
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
      </Routes>
    </Box>
  );
};

// Default export
export default App;
