import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
// import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { SnackbarProvider } from "notistack";



const App = () => {
  const routing = useRoutes(routes);
  // routing.props
  console.log(routing)
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
