import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "src/hooks";
import { ContainerBox } from "../ContainerBox";
import { useLocale } from "src/hooks/useLocale";
import dayjs from "dayjs";

export const UserDetails = () => {
  const { t } = useTranslation();
  const { isLoggedIn, user } = useUser();
  const { signOut } = useAuth();
  const { locale } = useLocale();

  const formatOptions = {
    en: "MM-DD-YYYY",
    pl: "DD-MM-YYYY",
    es: "DD-MM-YYYY",
  };
  const todaysDate = dayjs(new Date()).format(formatOptions[locale]);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(() => {
      navigate("/");
      window.location.reload();
    });
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <ContainerBox>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Box display="flex">
          {t("hello-user", {
            username: user.username,
            interpolation: { escapeValue: false, prefix: "", suffix: "" },
          })
            .split(user.username)
            .map((part, index) =>
              index > 0 ? (
                <Typography
                  key={index}
                  sx={{
                    textUnderlinePosition: "under",
                    textUnderlineThickness: 3,
                    textUnderlineOffset: "0.4em",
                    fontWeight: "bold",
                    ml: "7px",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      width: "100%",
                      height: "4px",
                      backgroundColor: "#1976d2",
                      animation: "bounce 2s linear infinite",
                    },
                    "@keyframes bounce": {
                      "0%, 100%": {
                        transform: "translateX(0)",
                      },
                      "50%": {
                        transform: "translateX(50%)",
                      },
                      "75%": {
                        transform: "translateX(25%)",
                      },
                      "25%": {
                        transform: "translateX(-25%)",
                      },
                    },
                  }}
                >
                  {user.username}
                </Typography>
              ) : (
                <span key={index}>{part}</span>
              )
            )}{" "}
          - {todaysDate}
        </Box>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ display: { lg: "none", md: "flex" } }}
        >
          {t("signout")}
        </Button>
      </Box>
    </ContainerBox>
  );
};
