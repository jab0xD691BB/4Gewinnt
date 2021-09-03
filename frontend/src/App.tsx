import React, { useEffect, useContext } from "react";
import { AuthProvider, authContext } from "./context/AuthenticationContext";
import { UnauthenticatedLayout } from "./components/UnauthenticatedLayout";
import { LoginPage } from "./pages/Login/LoginPage";
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

export const App = () => {
  useEffect(() => {
    (async function () {
      const helloRequest = await fetch("/api");
      const halloJson = await helloRequest.json();
      console.log(halloJson);
    })();
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <UnauthenticatedLayout>
            <LoginPage />
            <Switch>
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route exact path="/login" component={DashboardPage} />
              <Route exact path="/register" component={DashboardPage} />
              <Route exact path="/newgame" component={NewgamePage} />
              <Route exact path="/game" component={DashboardPage} />
              <Route exact path="/settings" component={DashboardPage} />
            </Switch>
          </UnauthenticatedLayout>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
