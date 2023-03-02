// External imports
import { MouseEvent } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import MenuComponent from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getAccessToken, removeAccessToken } from "src/auth/auth-service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

type MenuPropsType = {
  anchorEl: Element | null;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleProfileMenuOpen?: (event: MouseEvent<HTMLElement>) => void | undefined;
};

export const MobileMenu = (mobileMenuProps: MenuPropsType) => {
  const { handleMenuClose, isMenuOpen, anchorEl, handleProfileMenuOpen } =
    mobileMenuProps;

  return (
    <MenuComponent
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </MenuComponent>
  );
};

export const Menu = (menuProps: MenuPropsType) => {
  const { handleMenuClose, isMenuOpen, anchorEl } = menuProps;
  const isUserLogged = getAccessToken();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    <MenuComponent
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isUserLogged ? (
        <Box>
          <MenuItem onClick={handleLogout}>{t("signout")}</MenuItem>
          <MenuItem onClick={handleYourAccount}>{t("your-account")}</MenuItem>
        </Box>
      ) : (
        <MenuItem onClick={handleLogin}>{t("login")}</MenuItem>
      )}
    </MenuComponent>
  );
};

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
