import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Typography, Button, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import App from "./App";
import theme from "./styles/Theme";
import { AppProvider } from "./context/AppContext";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught React Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F8FAFC",
            p: 3,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              maxWidth: 500,
              textAlign: "center",
              borderRadius: 4,
              border: "1px solid #EF4444",
            }}
          >
            <Typography variant="h5" fontWeight={700} color="error" gutterBottom>
              Application Reload Required
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {this.state.error?.toString() || "A temporary rendering issue occurred."}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{ borderRadius: 3 }}
            >
              Reload Platform
            </Button>
          </Paper>
        </Box>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);