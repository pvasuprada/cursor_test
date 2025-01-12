import React from "react";
import { Card, CardContent, IconButton } from "@mui/material";
import { FullscreenOutlined, GetAppOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setFullscreenWidget } from "../../store/slices/layoutSlice";
import CardHeader from "../library/CardHeader";

function BaseWidget({ widget, children }) {
  const dispatch = useDispatch();

  const handleFullscreen = () => {
    dispatch(setFullscreenWidget(widget.id));
  };

  const handleDownload = () => {
    console.log("Download:", widget.id);
  };

  const actions = (
    <>
      {widget.fullscreen && (
        <IconButton size="small" onClick={handleFullscreen}>
          <FullscreenOutlined fontSize="small" />
        </IconButton>
      )}
      {widget.downloadable && (
        <IconButton size="small" onClick={handleDownload}>
          <GetAppOutlined fontSize="small" />
        </IconButton>
      )}
    </>
  );

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title={widget.title} actions={actions} />
      <CardContent
        sx={{
          flex: 1,
          p: 1,
          "&:last-child": { pb: 1 },
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}

export default BaseWidget;
