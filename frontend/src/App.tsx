import * as React from "react";
import "./App.css";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { theme } from "./theme";

function App() {
  React.useEffect(() => {
    fetch("/api");
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route path="/login" component={DashboardPage} />
          <Route path="/register" component={DashboardPage} />
          <Route path="/newgame" component={DashboardPage} />
          <Route path="/game" component={DashboardPage} />
          <Route path="/settings" component={DashboardPage} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
