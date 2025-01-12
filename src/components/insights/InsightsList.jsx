import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Typography,
  Box,
} from "@mui/material";
import { TableChart, ShowChart, PieChart, Map } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleWidget } from "../../store/slices/layoutSlice";

function InsightsList() {
  const dispatch = useDispatch();
  const widgets = useSelector((state) => state.layout.widgets);

  const insights = [
    { id: "data-grid", title: "Data Grid", icon: <TableChart /> },
    { id: "usage-speed", title: "Usage Speed", icon: <PieChart /> },
    {
      id: "customer-experience",
      title: "Customer Experience",
      icon: <ShowChart />,
    },
    { id: "map", title: "Geography", icon: <Map /> },
  ];

  const handleToggle = (widgetId) => {
    dispatch(toggleWidget(widgetId));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="subtitle2">Toggle Insights</Typography>
      </Box>
      <List>
        {insights.map((insight) => {
          const widget = widgets.find((w) => w.id === insight.id);
          return (
            <ListItem key={insight.id}>
              <ListItemIcon>{insight.icon}</ListItemIcon>
              <ListItemText
                primary={insight.title}
                primaryTypographyProps={{ variant: "body2" }}
              />
              <Switch
                edge="end"
                checked={widget ? widget.visible : false}
                onChange={() => handleToggle(insight.id)}
                size="small"
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default InsightsList;
