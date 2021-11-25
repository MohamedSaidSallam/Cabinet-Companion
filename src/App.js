import { Auth0Provider } from "@auth0/auth0-react";
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
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </ThemeProvider>
  );
}

export default App;
