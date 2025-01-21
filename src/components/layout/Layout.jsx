import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import GridLayout from "./GridLayout";
import FullscreenWidget from "./FullscreenWidget";

function Layout() {
  const sidebarOpen = useSelector((state) => state.layout.sidebarOpen);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 1,
            transition: "margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            marginLeft: 0,
            width: "100%",
          }}
        >
          <GridLayout />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
