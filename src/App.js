import "react-perfect-scrollbar/dist/css/styles.css";
import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
// import 'src/mixins/chartjs';
import theme from "src/theme";
import routes from "src/routes";
import { SnackbarProvider } from "notistack";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  console.log("쿠키");
  console.log(cookies.accessToken);

  useEffect(() => {
    if (cookies.accessToken == undefined) {
      navigate("/login");
    }
  }, []);

  const routing = useRoutes(routes);
  // routing.props
  console.log(routing);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <GlobalStyles />
        {routing}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
