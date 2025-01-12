import React, { useEffect, useRef } from "react";
import BaseWidget from "./BaseWidget";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ZoomIn, ZoomOut, Home, Layers } from "@mui/icons-material";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

function MapWidget({ widget }) {
  const mapRef = useRef();
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([-82.4572, 28.4772]), // Tampa, FL coordinates
          zoom: 7,
        }),
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => {
    const view = mapInstance.current.getView();
    view.animate({
      zoom: view.getZoom() + 1,
      duration: 250,
    });
  };

  const handleZoomOut = () => {
    const view = mapInstance.current.getView();
    view.animate({
      zoom: view.getZoom() - 1,
      duration: 250,
    });
  };

  const handleHome = () => {
    const view = mapInstance.current.getView();
    view.animate({
      center: fromLonLat([-82.4572, 28.4772]),
      zoom: 7,
      duration: 250,
    });
  };

  return (
    <BaseWidget widget={widget}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ position: "relative", flex: 1 }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <ToggleButtonGroup orientation="vertical" size="small">
              <ToggleButton value="zoomIn" onClick={handleZoomIn}>
                <ZoomIn />
              </ToggleButton>
              <ToggleButton value="zoomOut" onClick={handleZoomOut}>
                <ZoomOut />
              </ToggleButton>
              <ToggleButton value="home" onClick={handleHome}>
                <Home />
              </ToggleButton>
              <ToggleButton value="layers">
                <Layers />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>
    </BaseWidget>
  );
}

export default MapWidget;
