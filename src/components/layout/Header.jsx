import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Settings,
  Info,
  AccountCircle,
  Dashboard,
  FilterList,
  Insights,
  LightMode,
  DarkMode,
  Person,
  ExitToApp,
  Security,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/layoutSlice";
import { toggleTheme } from "../../store/slices/themeSlice";

function Header() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarToggle = (content) => {
    dispatch(toggleSidebar(content));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Minerva Dashboard
          </Typography>
          <Tooltip
            title={`Switch to ${themeMode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton
              color="inherit"
              onClick={handleThemeToggle}
              sx={{ mr: 1 }}
            >
              {themeMode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <IconButton color="inherit">
            <Info />
          </IconButton>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <Person sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <Security sx={{ mr: 1 }} /> Security
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleProfileMenuClose}>
              <ExitToApp sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
        <Box
          sx={{
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Toolbar variant="dense">
            <Button
              startIcon={<Dashboard />}
              sx={{ fontWeight: "bold" }}
              onClick={() => handleSidebarToggle("dashboards")}
            >
              Dashboards
            </Button>
            <Button
              startIcon={<FilterList />}
              sx={{ fontWeight: "bold" }}
              onClick={() => handleSidebarToggle("filters")}
            >
              Filters
            </Button>
            <Button
              startIcon={<Insights />}
              sx={{ fontWeight: "bold" }}
              onClick={() => handleSidebarToggle("insights")}
            >
              Insights
            </Button>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
}

export default Header;
