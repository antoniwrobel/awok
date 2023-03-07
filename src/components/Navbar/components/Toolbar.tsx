// External imports
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import ToolbarComponent from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import MoreIcon from "@mui/icons-material/MoreVert";
import PublishSharpIcon from "@mui/icons-material/PublishSharp";

// Local imports
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  SubmitIconWrapper,
} from "./composition";
import { useTranslation } from "react-i18next";
import { useUser } from "src/hooks";
import { UserContextType } from "src/types/user.types";

const menuId = "primary-search-account-menu";
const menuId1 = "primary-locale-select-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

type ToolbarPropsType = {
  handleProfileMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  handleMobileMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  handleLocalesMenuOpen: (event: MouseEvent<HTMLElement>) => void;
};

const createInitials = (user: UserContextType["user"]): string | undefined => {
  if (!user) {
    return;
  }

  const firstInitial = user.first_name.charAt(0);
  const lastInitial = user.last_name.charAt(0);
  return `${firstInitial}.${lastInitial}`.toUpperCase();
};

export const Toolbar = (toolbarProps: ToolbarPropsType) => {
  const { handleProfileMenuOpen, handleMobileMenuOpen, handleLocalesMenuOpen } =
    toolbarProps;

  const { t } = useTranslation();
  const { user } = useUser();
  const [focused, setFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const userInitials = createInitials(user);

  const useKeypress = useMemo(
    () => (key: string, action: () => void) =>
      useEffect(() => {
        const onKeyup = (e: { key: string }) => {
          if (e.key === key) {
            action();
          }
        };

        window.addEventListener("keyup", onKeyup);

        return () => window.removeEventListener("keyup", onKeyup);
      }, [focused]),
    [focused]
  );

  const handleLogSearchValue = useMemo(
    () => (condition: boolean) => {
      if (searchRef && searchRef.current) {
        const inputValue = searchRef.current.value;
        if (condition && inputValue.trim()) {
          console.log("search value => ", inputValue);
        }
      }
    },
    []
  );

  useKeypress("Enter", () => handleLogSearchValue(focused));

  return (
    <ToolbarComponent
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h6"
        noWrap
        component="a"
        href={process.env.PUBLIC_URL}
        sx={{ color: "#fff" }}
      >
        AWOK
      </Typography>

      <Search
        sx={{
          ml: "auto",
          mr: "auto",
          width: { lg: "550px", md: "80%" },
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          inputRef={searchRef}
          placeholder={t("search")}
          inputProps={{ "aria-label": "search" }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <SubmitIconWrapper onClick={() => handleLogSearchValue(true)}>
          <PublishSharpIcon
            sx={{
              cursor: "pointer",
            }}
          />
        </SubmitIconWrapper>
      </Search>

      <Box sx={{ display: { xs: "none", md: "flex", gap: "5px " } }}>
        {/* <IconButton size="large" aria-label="show 4 new mails">
          <Badge>
            <MailIcon />
          </Badge>
        </IconButton> */}

        <IconButton
          size="large"
          edge="end"
          aria-haspopup="true"
          aria-label="select language"
          color="inherit"
          aria-controls={menuId1}
          onClick={handleLocalesMenuOpen}
        >
          <LanguageSharpIcon />
        </IconButton>

        <IconButton
          edge="end"
          size="large"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          aria-controls={menuId}
          onClick={handleProfileMenuOpen}
          sx={{
            display: {
              sm: "none",
              lg: "flex",
            },
          }}
        >
          {userInitials ? (
            <Typography>{userInitials}</Typography>
          ) : (
            <AccountCircle />
          )}
        </IconButton>
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-haspopup="true"
          aria-label="show more"
          color="inherit"
          aria-controls={mobileMenuId}
          onClick={handleMobileMenuOpen}
          sx={{
            ml: {
              xs: "auto",
            },
          }}
        >
          <MoreIcon />
        </IconButton>
      </Box>
    </ToolbarComponent>
  );
};
