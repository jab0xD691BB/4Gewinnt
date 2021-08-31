import * as React from "react";
import "./App.css";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { NewgamePage } from "./pages/NewgamePage/NewgamePage";

import { ThemeProvider } from "styled-components";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { theme } from "./theme";
import { GlobalStyle } from "./components/GlobalStyle";

function App() {
  React.useEffect(() => {
    fetch("/api");
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/login" component={DashboardPage} />
          <Route exact path="/register" component={DashboardPage} />
          <Route exact path="/newgame" component={NewgamePage} />
          <Route exact path="/game" component={DashboardPage} />
          <Route exact path="/settings" component={DashboardPage} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
