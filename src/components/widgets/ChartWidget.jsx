import React, { useRef } from "react";
import BaseWidget from "./BaseWidget";
import { Box } from "@mui/material";
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
} from "recharts";
import { useTheme } from "@mui/material/styles";
import html2canvas from "html2canvas";
import { Radar } from "@mui/icons-material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function ChartWidget({ widget, isFullscreen = false }) {
  const theme = useTheme();
  const chartRef = useRef(null);

  const lineData = [
    { name: "01/24", value: 65 },
    { name: "02/24", value: 75 },
    { name: "03/24", value: 85 },
    { name: "04/24", value: 82 },
    { name: "05/24", value: 90 },
  ];

  const barData = [
    { name: "Cband+Sub3+Sub1", value: 13.1 },
    { name: "Cband+Sub1", value: 2.3 },
    { name: "Sub3+Sub1", value: 3.2 },
    { name: "Cband", value: 7.1 },
  ];

  const pieData = [
    { name: "50 Mbps", value: 400 },
    { name: "100 Mbps", value: 300 },
    { name: "200 Mbps", value: 200 },
    { name: "400 Mbps", value: 100 },
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
    return isFullscreen ? 400 : 160;
  };

  const renderChart = () => {
    const height = getChartHeight();

    switch (widget.type) {
      case "line":
        return (
          <ResponsiveContainer width="95%" height={height}>
            <LineChart
              data={lineData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "column":
        return (
          <ResponsiveContainer width="95%" height={height}>
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Bar dataKey="value" fill={theme.palette.primary.main} />
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
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isFullscreen ? 120 : 50}
                fill={theme.palette.primary.main}
                dataKey="value"
                label={({ name, percent }) =>
                  isFullscreen ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
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
