import { createTheme } from "@mui/material";

export const getTheme = (mode) =>
  createTheme({
    typography: {
      fontFamily: '"Montserrat", sans-serif',
      h1: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1.1rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: "0.9rem",
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: "0.8rem",
        fontWeight: 500,
      },
      body1: {
        fontSize: "0.9rem",
      },
      body2: {
        fontSize: "0.8rem",
      },
      button: {
        fontSize: "0.8rem",
        fontWeight: 500,
        textTransform: "none",
      },
      caption: {
        fontSize: "0.75rem",
      },
    },
    palette: {
      mode,
      primary: {
        main: "#ee0000",
        light: "#fff",
        dark: "#eee",
        contrastText: "#ff00ff",
      },
      secondary: {
        main: mode === "light" ? "#9c27b0" : "#ce93d8",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff",
        secondary:
          mode === "light" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
            color: mode === "light" ? "#000000" : "#ffffff",
            borderBottom: `1px solid ${
              mode === "light" ? "#e0e0e0" : "#333333"
            }`,
            "& .MuiToolbar-root": {
              minHeight: "48px",
              paddingLeft: "12px",
              paddingRight: "12px",
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          dense: {
            minHeight: "40px",
            paddingLeft: "12px",
            paddingRight: "12px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
            borderRadius: 8,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            padding: "4px 12px",
            minHeight: "32px",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: "8px",
          },
          sizeSmall: {
            padding: "4px",
          },
        },
      },
    },
  });
