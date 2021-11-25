import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#288308",
    },
  },
  typography: {
    fontFamily: ['"Source Sans Pro"', "Open Sans"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
