// External imports
import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

// Local imports
import { Toolbar } from "./components/Toolbar";
import { Menu, MobileMenu } from "./components/composition";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) =>
    setMobileMoreAnchorEl(event.currentTarget);

  return (
    <Box sx={{ flexGrow: 1, mb: "20px" }}>
      <AppBar position="static">
        <Toolbar
          handleMobileMenuOpen={handleMobileMenuOpen}
          handleProfileMenuOpen={handleProfileMenuOpen}
        />
      </AppBar>

      <MobileMenu
        anchorEl={mobileMoreAnchorEl}
        isMenuOpen={isMobileMenuOpen}
        handleMenuClose={handleMobileMenuClose}
      />

      <Menu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
    </Box>
  );
};
