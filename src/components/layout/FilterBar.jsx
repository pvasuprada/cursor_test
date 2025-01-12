import React from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";

function FilterBar() {
  const theme = useTheme();
  const [market, setMarket] = React.useState("all");
  const [sector, setSector] = React.useState("all");
  const [date, setDate] = React.useState("current");

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        p: 1,
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Market:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            displayEmpty
            sx={{ fontSize: "0.875rem" }}
          >
            <MenuItem value="all">All Markets</MenuItem>
            <MenuItem value="east">East</MenuItem>
            <MenuItem value="west">West</MenuItem>
            <MenuItem value="central">Central</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Sector:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            displayEmpty
            sx={{ fontSize: "0.875rem" }}
          >
            <MenuItem value="all">All Sectors</MenuItem>
            <MenuItem value="residential">Residential</MenuItem>
            <MenuItem value="commercial">Commercial</MenuItem>
            <MenuItem value="industrial">Industrial</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Date:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            displayEmpty
            sx={{ fontSize: "0.875rem" }}
          >
            <MenuItem value="current">Current Month</MenuItem>
            <MenuItem value="mtd">MTD</MenuItem>
            <MenuItem value="ytd">YTD</MenuItem>
            <MenuItem value="last3">Last 3 Months</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default FilterBar;
