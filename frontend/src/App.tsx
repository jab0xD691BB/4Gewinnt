import React, { useEffect, useContext } from "react";
import { AuthProvider, authContext } from "./context/AuthenticationContext";
import { UnauthenticatedLayout } from "./components/UnauthenticatedLayout";
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
import { themeStyle } from "./theme";
import { GlobalStyle } from "./components/GlobalStyle";
import { LoginPage } from "./pages/Login/LoginPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import { SettingsPage } from "./pages/Settings/SettingsPage";
import { ThemeManager } from "./pages/Settings/ThemeManager";

export const BasePage = () => {
  const { token } = useContext(authContext);
  if (token) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/login" />;
  }
};

const UnauthenticatedRoute: React.FC<RouteProps> = ({
  children,
  ...routeProps
}) => {
  const { token } = useContext(authContext);
  if (token === null) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/" />;
};

const AuthenticatedRoute: React.FC<RouteProps> = ({
  children,
  ...routeProps
}) => {
  const {
    token,
    actions: { getTokenData, logout },
  } = useContext(authContext);
  if (token !== null) {
    const tokenData = getTokenData();
    if (tokenData !== null) {
      const { exp } = tokenData;
      if (parseInt(exp) * 1000 > Date.now()) {
        return <Route {...routeProps} />;
      }
      logout();
    }
  }
  return <Redirect to="/" />;
};

export const App = () => {

  useEffect(() => {
    (async function () {
      const helloRequest = await fetch("/api");
      const helloJson = await helloRequest.json();
      console.log(helloJson);
    })();
  });

  return (
    <ThemeManager>
    <BrowserRouter>
      <ThemeProvider theme={themeStyle}>
      <AuthProvider>
        <GlobalStyle />
            <Switch>
              <UnauthenticatedRoute exact path="/login" component={LoginPage} />
              <UnauthenticatedRoute exact path="/register" component={RegisterPage}/>
              <AuthenticatedRoute exact path="/dashboard" component={DashboardPage}/>
              <AuthenticatedRoute exact path="/newgame" component={NewgamePage} />
              <AuthenticatedRoute exact path="/game" component={DashboardPage} />
              <AuthenticatedRoute exact path="/settings" component={SettingsPage} />
              <Route path="/" component={BasePage}></Route>
            </Switch>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
    </ThemeManager>
  );
};

/*
 return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
            <Switch>
              <UnauthenticatedRoute exact path="/login" component={LoginPage} />
              <UnauthenticatedRoute exact path="/register" component={RegisterPage}/>
              <AuthenticatedRoute exact path="/dashboard" component={DashboardPage}/>
              <AuthenticatedRoute exact path="/newgame" component={NewgamePage} />
              <AuthenticatedRoute exact path="/game" component={DashboardPage} />
              <AuthenticatedRoute exact path="/settings" component={SettingsPage} />
              <Route path="/" component={BasePage}></Route>
            </Switch>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
*/