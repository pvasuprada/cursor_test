import React from "react";
import { Drawer, Box, IconButton, useTheme } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/layoutSlice";
import FilterList from "../filters/FilterList";
import InsightsList from "../insights/InsightsList";

function Sidebar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { sidebarOpen, sidebarContent } = useSelector((state) => state.layout);

  const handleClose = () => {
    dispatch(toggleSidebar(null));
  };

  const renderContent = () => {
    switch (sidebarContent) {
      case "filters":
        return <FilterList />;
      case "insights":
        return <InsightsList />;
      default:
        return null;
    }
  };

  return (
    <Drawer
      variant="temporary"
      open={sidebarOpen}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          p: 1,
        }}
      >
        <IconButton onClick={handleClose} size="small">
          <ChevronLeft />
        </IconButton>
      </Box>
      {renderContent()}
    </Drawer>
  );
}

export default Sidebar;
