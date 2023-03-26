import { useEffect } from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import routes from "../../src/routes";
import LoadingModal from "../modals/Loading";
import RequireAuth from "../components/RequireAuth";
import RequirePublic from "src/components/RequirePublic";
import { useLoading } from "../hooks";
import { ContainerBox } from "src/components/ContainerBox";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const App = () => {
  const { isLoading } = useLoading();
  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.pathname);
    const isTokenExpiredValue = params.get("token-expired");

    if (!isTokenExpiredValue) {
      return;
    }

    const isTokenExpired = JSON.parse(isTokenExpiredValue);

    if (isTokenExpired) {
      const message = t("user-signed-out");
      toast.error(message);
    }
  }, []);

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
                  <ContainerBox>
                    {isProtected ? (
                      <RequireAuth>
                        <RouteComponent />
                      </RequireAuth>
                    ) : isPublicOnly ? (
                      <RequirePublic>
                        <RouteComponent />
                      </RequirePublic>
                    ) : (
                      <RouteComponent />
                    )}
                  </ContainerBox>
                }
              />
            );
          }
        )}
        {/* <Route path="*" element={<ContainerBox>Page not found</ContainerBox>} /> */}
      </Routes>
    </Box>
  );
};

export default App;
