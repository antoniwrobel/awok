// External imports
import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";

// Local imports
import { Toolbar } from "./components/Toolbar";
import { Menu, MobileMenu } from "./components/composition";
import { useTranslation } from "react-i18next";
import { getAccessToken, removeAccessToken } from "src/auth/auth-service";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

type Language = {
  [key: string]: { nativeName: string };
};

const lngs: Language = {
  pl: { nativeName: "Polski" },
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [localeAnchorEl, setLocaleAnchorEl] =
    useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLocaleMenuOpen = Boolean(localeAnchorEl);

  const isUserLogged = getAccessToken();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLocalesMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setLocaleAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setLocaleAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const handleLogout = () => {
    removeAccessToken();
    handleMenuClose();
    navigate("/");
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate("/login");
  };

  const handleYourAccount = () => {
    handleMenuClose();
    navigate("/your-account");
  };

  return (
    <Box sx={{ flexGrow: 1, mb: "20px" }}>
      <AppBar position="static">
        <Toolbar
          handleMobileMenuOpen={handleMobileMenuOpen}
          handleProfileMenuOpen={handleProfileMenuOpen}
          handleLocalesMenuOpen={handleLocalesMenuOpen}
        />
      </AppBar>

      <MobileMenu
        anchorEl={mobileMoreAnchorEl}
        isMenuOpen={isMobileMenuOpen}
        handleMenuClose={handleMobileMenuClose}
      >
        <Box>
          {Object.keys(lngs).map((lng) => (
            <MenuItem
              key={lng}
              onClick={() => {
                i18n.changeLanguage(lng);
                handleMenuClose();
              }}
              disabled={i18n.resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}
            </MenuItem>
          ))}
          <MenuItem
            onClick={handleProfileMenuOpen}
            sx={{
              borderTop: "1px solid #dedede",
              borderBottom: "1px solid #dedede",
            }}
          >
            <p>Profile</p>
          </MenuItem>
        </Box>
      </MobileMenu>

      <Menu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      >
        {isUserLogged ? (
          <Box>
            <MenuItem onClick={handleLogout}>{t("signout")}</MenuItem>
            <MenuItem onClick={handleYourAccount}>{t("your-account")}</MenuItem>
          </Box>
        ) : (
          <MenuItem onClick={handleLogin}>{t("login")}</MenuItem>
        )}
      </Menu>

      <Menu
        anchorEl={localeAnchorEl}
        isMenuOpen={isLocaleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      >
        <Box>
          {Object.keys(lngs).map((lng) => (
            <MenuItem
              key={lng}
              onClick={() => {
                i18n.changeLanguage(lng);
                handleMenuClose();
              }}
              disabled={i18n.resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};
