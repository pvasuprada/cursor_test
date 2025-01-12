import React from "react";
import BaseWidget from "./BaseWidget";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

function DataGridWidget({ widget }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "market", headerName: "Market", width: 130 },
    { field: "sector", headerName: "Sector", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "speed", headerName: "Speed", width: 130 },
    { field: "technology", headerName: "Technology", width: 130 },
    {
      field: "completion",
      headerName: "Completion %",
      width: 130,
      type: "number",
    },
  ];

  const rows = [
    {
      id: 1,
      market: "East",
      sector: "Residential",
      status: "Active",
      speed: "100 Mbps",
      technology: "5G",
      completion: 65,
    },
    {
      id: 2,
      market: "West",
      sector: "Commercial",
      status: "On Hold",
      speed: "200 Mbps",
      technology: "Fiber",
      completion: 30,
    },
    {
      id: 3,
      market: "Central",
      sector: "Industrial",
      status: "Complete",
      speed: "400 Mbps",
      technology: "4G LTE",
      completion: 100,
    },
    {
      id: 4,
      market: "East",
      sector: "Residential",
      status: "Active",
      speed: "100 Mbps",
      technology: "5G",
      completion: 45,
    },
    {
      id: 5,
      market: "West",
      sector: "Commercial",
      status: "On Hold",
      speed: "200 Mbps",
      technology: "Fiber",
      completion: 20,
    },
  ];

  return (
    <BaseWidget widget={widget}>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              fontSize: "0.875rem",
            },
            "& .MuiDataGrid-columnHeader": {
              fontSize: "0.875rem",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </BaseWidget>
  );
}

export default DataGridWidget;
