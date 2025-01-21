import React, { useRef } from "react";
import BaseWidget from "./BaseWidget";
import { Box, useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
} from "recharts";
import { Typography } from "@mui/material";
import html2canvas from "html2canvas";
import { Radar } from "@mui/icons-material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function ChartWidget({ widget, isFullscreen = false }) {
  const theme = useTheme();
  const chartRef = useRef(null);

  const lineData = [
    { name: "Jan", value: 65, target: 50 },
    { name: "Feb", value: 75, target: 55 },
    { name: "Mar", value: 85, target: 60 },
    { name: "Apr", value: 82, target: 65 },
    { name: "May", value: 90, target: 70 },
  ];

  const barData = [
    { name: "Cband+Sub3", value: 13.1, avg: 10 },
    { name: "Cband", value: 7.1, avg: 8 },
    { name: "Sub3", value: 3.2, avg: 5 },
    { name: "Sub1", value: 2.3, avg: 3 },
  ];

  const pieData = [
    { name: "50 Mbps", value: 400, percentage: 40 },
    { name: "100 Mbps", value: 300, percentage: 30 },
    { name: "200 Mbps", value: 200, percentage: 20 },
    { name: "400 Mbps", value: 100, percentage: 10 },
  ];

  const radarData = [
    {
      subject: "Math",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "Chinese",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "English",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Geography",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "Physics",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "History",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  const handleDownload = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${widget.title}.png`;
      link.href = url;
      link.click();
    }
  };

  const getChartHeight = () => {
    return isFullscreen ? 400 : 140;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 1.5,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Box key={index} sx={{ mt: 0.5 }}>
              <Typography
                variant="body2"
                color={entry.color}
                sx={{ fontWeight: 500 }}
              >
                {`${entry.name}: ${entry.value}`}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  const renderChart = () => {
    const height = getChartHeight();

    switch (widget.type) {
      case "line":
        return (
          <ResponsiveContainer width="95%" height={height}>
            <AreaChart
              data={lineData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                stroke={theme.palette.text.secondary}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                stroke={theme.palette.text.secondary}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke={theme.palette.secondary.main}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "column":
        return (
          <ResponsiveContainer width="95%" height={height}>
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                stroke={theme.palette.text.secondary}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                stroke={theme.palette.text.secondary}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill={theme.palette.primary.main}
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke={theme.palette.secondary.main}
                strokeWidth={2}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "radar":
        return (
          <ResponsiveContainer width="95%" height={height}>
            <RadarChart
              data={radarData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
              <Radar
                name="Metrics"
                dataKey="value"
                fill={theme.palette.primary.main}
                fillOpacity={0.6}
                stroke={theme.palette.primary.dark}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
            </RadarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="95%" height={height}>
            <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={isFullscreen ? 60 : 30}
                outerRadius={isFullscreen ? 80 : 40}
                fill={theme.palette.primary.main}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  isFullscreen ? `${name} (${(percent * 100).toFixed(0)}%)` : ""
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconSize={8}
                iconType="circle"
                wrapperStyle={{ fontSize: "10px", paddingLeft: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <BaseWidget widget={widget} onDownload={handleDownload}>
      <Box
        ref={chartRef}
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 1,
        }}
      >
        {renderChart()}
      </Box>
    </BaseWidget>
  );
}

export default ChartWidget;
