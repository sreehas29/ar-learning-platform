import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565C0",
      light: "#38BDF8",
      dark: "#0F172A",
    },
    secondary: {
      main: "#7C3AED",
      light: "#A855F7",
      dark: "#5B21B6",
    },
    warning: {
      main: "#F59E0B",
      light: "#FEF3C7",
      dark: "#B45309",
    },
    success: {
      main: "#10B981",
      light: "#D1FAE5",
      dark: "#065F46",
    },
    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
  },

  typography: {
    fontFamily: ["Inter", "Roboto", "sans-serif"].join(","),
    h1: { fontWeight: 900, letterSpacing: "-0.02em" },
    h2: { fontWeight: 800, letterSpacing: "-0.01em" },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: {
      textTransform: "none",
      fontWeight: 700,
      borderRadius: 12,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;