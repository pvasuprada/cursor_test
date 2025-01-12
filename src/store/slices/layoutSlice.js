import { createSlice } from "@reduxjs/toolkit";
import { widgetConfig } from "../../config/widgetConfig";

const initialState = {
  widgets: widgetConfig.widgets.map((widget) => ({
    ...widget,
    visible: true,
  })),
  sidebarOpen: false,
  sidebarContent: null, // 'filters' | 'insights' | 'dashboards'
  fullscreenWidget: null,
  layout: {}, // Store the current layout
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebarOpen = action.payload !== null;
      state.sidebarContent = action.payload;
    },
    updateWidgetLayout: (state, action) => {
      state.layout = action.payload;
    },
    setFullscreenWidget: (state, action) => {
      state.fullscreenWidget = action.payload;
    },
    toggleWidget: (state, action) => {
      const widgetId = action.payload;
      const widget = state.widgets.find((w) => w.id === widgetId);
      if (widget) {
        widget.visible = !widget.visible;
      }
    },
  },
});

export const {
  toggleSidebar,
  updateWidgetLayout,
  setFullscreenWidget,
  toggleWidget,
} = layoutSlice.actions;
export default layoutSlice.reducer;
