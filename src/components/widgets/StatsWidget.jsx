import React from "react";
import BaseWidget from "./BaseWidget";
import { Box, Typography, Grid, useTheme } from "@mui/material";

function StatsWidget({ widget }) {
  const theme = useTheme();

  const stats = [
    { label: "New Builds", value: "50" },
    { label: "On Hold", value: "150" },
    { label: "Active", value: "27" },
    { label: "Complete", value: "113" },
  ];

  return (
    <BaseWidget widget={widget}>
      <Grid container spacing={0.5}>
        {stats.map((stat, index) => (
          <Grid item xs={3} key={index}>
            <Box
              sx={{
                p: 0.5,
                textAlign: "center",
                backgroundColor:
                  theme.palette.mode === "light" ? "grey.100" : "grey.900",
                borderRadius: 1,
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.65rem",
                  display: "block",
                  lineHeight: 1.2,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </BaseWidget>
  );
}

export default StatsWidget;
