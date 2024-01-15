import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import Home from "./views/Home";
import Solution from "./views/Solution";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f13700",
    },
  },
});

const stackBuilder = (Component, path) =>  ({ Component, path });

const stacks = [
  stackBuilder(Home, "/"),
  stackBuilder(Solution, "/solution"),
];

const App = () => {

  return(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          {
            stacks.map(({ Component, path }, i) => 
              <Route 
                key={i}
                exact 
                { ...{ path } } 
                render={ (props) => <Component { ...props } /> } 
              />
            )
          }
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
