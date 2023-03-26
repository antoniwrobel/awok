import { Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import routes from "src/routes";
import { useUser } from "src/hooks";
import { ContainerBox } from "../ContainerBox";
import { withToggleVisibility } from "src/hocs/withToggleVisibility";

type PagesListPropsType = {
  isVisible: boolean;
};

const PagesList = (props: PagesListPropsType) => {
  const { t } = useTranslation();
  const { isLoggedIn, checkIsUserLoggedIn } = useUser();
  const { isVisible } = props;

  return (
    <ContainerBox>
      <Box height="100%">
        {isVisible ? (
          <Box display="grid">
            {routes.map((route) => {
              if (isLoggedIn && route.isPublicOnly) {
                return;
              }

              if (!isLoggedIn && route.isProtected) {
                return;
              }

              return (
                <Link
                  to={route.path}
                  key={route.name}
                  component={RouterLink}
                  onClick={checkIsUserLoggedIn}
                  width="fit-content"
                >
                  {t(route.translKey)}
                </Link>
              );
            })}
          </Box>
        ) : (
          <Box>Page list</Box>
        )}
      </Box>
    </ContainerBox>
  );
};

export default withToggleVisibility(PagesList, "isPageListVisible");
