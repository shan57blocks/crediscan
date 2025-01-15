import { ThemeProvider, createTheme } from "@mui/material";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const theme = createTheme({
  typography: {
    fontFamily: ["Red-Hat-Display"].join(","),
  },
  palette: {
    primary: {
      main: "#B246FF",
    },
    secondary: {
      main: "#B246FF",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
