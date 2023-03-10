// External imports
import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

// Local imports
import MenuItem from "@mui/material/MenuItem";
import { Toolbar } from "./components/Toolbar";
import { Menu, MobileMenu } from "./components/composition";
import { useTranslation } from "react-i18next";
import { removeTokens } from "src/auth/auth-service";
import { useNavigate } from "react-router-dom";
import { useLocale } from "src/hooks/useLocale";
import { LocalesType } from "src/types/locale.types";
import { useUser } from "src/hooks";

type Language = {
  [key: string]: { nativeName: string };
};

const lngs: Language = {
  pl: { nativeName: "Polski" },
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

export const Navbar = () => {
  const {
    t,
    i18n: { resolvedLanguage },
  } = useTranslation();
  const { changeLocale } = useLocale();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [localeAnchorEl, setLocaleAnchorEl] =
    useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLocaleMenuOpen = Boolean(localeAnchorEl);

  const { isLoggedIn } = useUser();
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
    removeTokens();
    handleMenuClose();
    navigate("/");
    window.location.reload();
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
    <Box sx={{ flexGrow: 1, mb: ["10px", "10px", "20px"] }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: "4px",
        }}
      >
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
                const lang = lng as LocalesType;
                changeLocale(lang);
                handleMenuClose();
              }}
              disabled={resolvedLanguage === lng}
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
        {isLoggedIn ? (
          <Box>
            <MenuItem onClick={handleYourAccount}>{t("your-account")}</MenuItem>
            <MenuItem onClick={handleLogout}>{t("signout")}</MenuItem>
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
                const lang = lng as LocalesType;
                changeLocale(lang);
                handleMenuClose();
              }}
              disabled={resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};
