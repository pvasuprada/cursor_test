import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setFullscreenWidget } from "../../store/slices/layoutSlice";
import ChartWidget from "../widgets/ChartWidget";
import MapWidget from "../widgets/MapWidget";
import NetworkGenieWidget from "../widgets/NetworkGenieWidget";
import StatsWidget from "../widgets/StatsWidget";

function FullscreenWidget() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const widgets = useSelector((state) => state.layout.widgets);
  const fullscreenWidgetId = useSelector(
    (state) => state.layout.fullscreenWidget
  );

  const widget = widgets.find((w) => w.id === fullscreenWidgetId);

  if (!widget) return null;

  const handleClose = () => {
    dispatch(setFullscreenWidget(null));
  };

  const getWidgetComponent = () => {
    switch (widget.type) {
      case "column":
      case "line":
      case "pie":
        return <ChartWidget widget={widget} isFullscreen={true} />;
      case "map":
        return <MapWidget widget={widget} isFullscreen={true} />;
      case "stats":
        return <StatsWidget widget={widget} isFullscreen={true} />;
      case "chat":
        return <NetworkGenieWidget widget={widget} isFullscreen={true} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: theme.palette.background.paper,
          minHeight: "60vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {widget.title}
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 2 }}>
        <Box sx={{ height: "500px" }}>{getWidgetComponent()}</Box>
      </DialogContent>
    </Dialog>
  );
}

export default FullscreenWidget;
