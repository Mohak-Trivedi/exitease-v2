import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import { Box } from "@mui/material";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider>
      <Box sx={{ margin: '1rem' }}>
        <App />
      </Box>
    </SnackbarProvider>
  </StrictMode>
);
