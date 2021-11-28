import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddItem from "./pages/AddItem";
import Home from "./pages/Home/Home";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme({
  palette: {
    primary: {
      main: "#288308",
    },
    red: { main: "#830808" },
    offWhite: { main: "#fefefe" },
    blue: { main: "#086583" },
    offBlack: { main: "#3c3c3c" },
  },
  typography: {
    fontFamily: ['"Source Sans Pro"', "Open Sans"].join(","),
  },
});

export const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        scope={process.env.REACT_APP_AUTH0_SCOPE}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      >
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/AddItem" element={<AddItem />}></Route>
              </Routes>
            </BrowserRouter>
          </LocalizationProvider>
        </QueryClientProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
}

export default App;
