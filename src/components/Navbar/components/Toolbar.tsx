// External imports
import { MouseEvent } from "react";
import Box from "@mui/material/Box";
import ToolbarComponent from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import MoreIcon from "@mui/icons-material/MoreVert";

// Local imports
import { Search, SearchIconWrapper, StyledInputBase } from "./composition";

const menuId = "primary-search-account-menu";
const menuId1 = "primary-locale-select-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

type ToolbarPropsType = {
  handleProfileMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  handleMobileMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  handleLocalesMenuOpen: (event: MouseEvent<HTMLElement>) => void;
};

export const Toolbar = (toolbarProps: ToolbarPropsType) => {
  const { handleProfileMenuOpen, handleMobileMenuOpen, handleLocalesMenuOpen } =
    toolbarProps;
  return (
    <ToolbarComponent>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href={process.env.PUBLIC_URL}
        sx={{ display: { xs: "none", sm: "block", color: "#fff" } }}
      >
        AWOK
      </Typography>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>

        <IconButton
          size="large"
          edge="end"
          aria-label="select language"
          aria-controls={menuId1}
          aria-haspopup="true"
          onClick={handleLocalesMenuOpen}
          color="inherit"
        >
          <LanguageSharpIcon />
        </IconButton>

        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
    </ToolbarComponent>
  );
};
