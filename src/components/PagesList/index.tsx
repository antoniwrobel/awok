// External imports
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUser } from "src/hooks";
import routes from "src/routes";

export const PagesList = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useUser();
  return (
    <Box height="100%">
      <Box display="flex" flexDirection="column">
        {routes.map((route) => {
          if (isLoggedIn && route.isPublicOnly) {
            return;
          }

          if (!isLoggedIn && route.isProtected) {
            return;
          }
          return (
            <Link to={route.path} key={route.name}>
              {t(route.translKey)}
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};
