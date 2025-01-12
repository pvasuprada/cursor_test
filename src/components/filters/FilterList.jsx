import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Checkbox,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Search,
  Clear,
  FilterList as FilterIcon,
  Place,
  Speed,
  CellTower,
} from "@mui/icons-material";

function FilterList() {
  const [open, setOpen] = useState({
    location: true,
    speed: true,
    technology: true,
  });
  const [searchText, setSearchText] = useState("");

  const handleClick = (section) => {
    setOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const filterSections = [
    {
      id: "location",
      title: "Location",
      icon: <Place />,
      items: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    },
    {
      id: "speed",
      title: "Speed Tier",
      icon: <Speed />,
      items: ["50 Mbps", "100 Mbps", "200 Mbps", "400 Mbps", "1 Gbps"],
    },
    {
      id: "technology",
      title: "Technology",
      icon: <CellTower />,
      items: ["5G", "4G LTE", "Fiber", "Cable", "DSL"],
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search filters..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearSearch} edge="end">
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
        component="nav"
      >
        {filterSections.map((section) => (
          <React.Fragment key={section.id}>
            <ListItem button onClick={() => handleClick(section.id)}>
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.title} />
              {open[section.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[section.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {section.items
                  .filter((item) =>
                    item.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((item, index) => (
                    <ListItem key={index} sx={{ pl: 4 }} dense button>
                      <Checkbox edge="start" size="small" />
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Selected filters will be applied to all widgets
        </Typography>
      </Box>
    </Box>
  );
}

export default FilterList;
