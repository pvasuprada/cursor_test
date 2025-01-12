import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSelector, useDispatch } from "react-redux";
import { updateWidgetLayout } from "../../store/slices/layoutSlice";
import ChartWidget from "../widgets/ChartWidget";
import MapWidget from "../widgets/MapWidget";
import DataGridWidget from "../widgets/DataGridWidget";
import NetworkGenieWidget from "../widgets/NetworkGenieWidget";
import StatsWidget from "../widgets/StatsWidget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

function GridLayout() {
  const dispatch = useDispatch();
  const widgets = useSelector((state) => state.layout.widgets);
  const [currentLayout, setCurrentLayout] = useState({});

  const getWidgetComponent = (widget) => {
    switch (widget.type) {
      case "column":
      case "line":
      case "pie":
        return <ChartWidget widget={widget} />;
      case "map":
        return <MapWidget widget={widget} />;
      case "stats":
        return <StatsWidget widget={widget} />;
      case "chat":
        return <NetworkGenieWidget widget={widget} />;
      case "grid":
        return <DataGridWidget widget={widget} />;
      default:
        return null;
    }
  };

  const handleLayoutChange = (layout) => {
    // Store the latest layout
    const newLayout = {};
    layout.forEach((item) => {
      newLayout[item.i] = {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      };
    });
    setCurrentLayout(newLayout);
  };

  // Filter visible widgets and maintain their last known positions
  const visibleWidgets = widgets
    .filter((widget) => widget.visible)
    .map((widget) => ({
      ...widget,
      ...(currentLayout[widget.id] || {}), // Use stored layout if available
    }));

  const generateLayout = () => {
    return visibleWidgets.map((widget) => ({
      i: widget.id,
      x: widget.x || 0,
      y: widget.y || 0,
      w: widget.width || 2,
      h: widget.height || 1,
      minW: 2,
      minH: 1,
    }));
  };

  return (
    <Box sx={{ height: "calc(100vh - 128px)" }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: generateLayout() }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable
        isResizable
        compactType="vertical"
        preventCollision={false}
      >
        {visibleWidgets.map((widget) => (
          <div key={widget.id}>{getWidgetComponent(widget)}</div>
        ))}
      </ResponsiveGridLayout>
    </Box>
  );
}

export default GridLayout;
