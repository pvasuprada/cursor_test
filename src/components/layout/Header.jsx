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

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "40px !important",
          px: "12px !important",
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          Minerva Dashboard
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Tooltip
            title={`Switch to ${themeMode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton
              color="inherit"
              onClick={() => dispatch(toggleTheme())}
              size="small"
            >
              {themeMode === "light" ? (
                <DarkMode sx={{ fontSize: 20 }} />
              ) : (
                <LightMode sx={{ fontSize: 20 }} />
              )}
            </IconButton>
          </Tooltip>
          <IconButton color="inherit" size="small">
            <Settings sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton color="inherit" size="small">
            <Info sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            size="small"
          >
            <AccountCircle sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <Person sx={{ mr: 1, fontSize: 18 }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <Security sx={{ mr: 1, fontSize: 18 }} /> Security
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose}>
            <ExitToApp sx={{ mr: 1, fontSize: 18 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: "36px !important",
            px: "12px !important",
          }}
        >
          <Button
            startIcon={<Dashboard sx={{ fontSize: 18 }} />}
            onClick={() => dispatch(toggleSidebar("dashboards"))}
            size="small"
          >
            Dashboards
          </Button>
          <Button
            startIcon={<FilterList sx={{ fontSize: 18 }} />}
            onClick={() => dispatch(toggleSidebar("filters"))}
            size="small"
          >
            Filters
          </Button>
          <Button
            startIcon={<Insights sx={{ fontSize: 18 }} />}
            onClick={() => dispatch(toggleSidebar("insights"))}
            size="small"
          >
            Insights
          </Button>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Header;
