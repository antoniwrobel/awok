import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

import { useAuth, useUser } from "src/hooks";
import { ContainerBox } from "../ContainerBox";
import { withToggleVisibility } from "src/hocs/withToggleVisibility";

type UserDetailsPropsType = {
  isVisible: boolean;
};

const UserDetails = (props: UserDetailsPropsType) => {
  const { isVisible } = props;

  const { t } = useTranslation();
  const { isLoggedIn, user } = useUser();
  const { signOut } = useAuth();

  const handleLogout = () => signOut();

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <ContainerBox>
      {isVisible ? (
        <>
          <Box
            width="100%"
            display="grid"
            alignItems="center"
            gridTemplateColumns={["5fr 1fr"]}
          >
            <Box>
              <Trans
                i18nKey={"hello-user"}
                values={{ username: user.username }}
                components={{
                  strong: <strong style={{ textDecoration: "underline" }} />,
                }}
              />
            </Box>

            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{ display: { lg: "none", md: "flex" }, minWidth: "auto" }}
            >
              {t("signout")}
            </Button>
          </Box>
        </>
      ) : (
        <Box>User Details</Box>
      )}
    </ContainerBox>
  );
};

export default withToggleVisibility(UserDetails, "isUserDetailsVisible");
