// External imports
import { Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { useUser } from "src/hooks";
import { ContainerBox } from "../ContainerBox";
import routes from "src/routes";

export const PagesList = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useUser();

  return (
    <ContainerBox>
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
              <Link to={route.path} key={route.name} component={RouterLink}>
                {t(route.translKey)}
              </Link>
            );
          })}
        </Box>
      </Box>
    </ContainerBox>
  );
};
