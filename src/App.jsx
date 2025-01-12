import React from "react";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./store/store";
import Layout from "./components/layout/Layout";
import { getTheme } from "./theme/theme";

function ThemedApp() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

export default App;
