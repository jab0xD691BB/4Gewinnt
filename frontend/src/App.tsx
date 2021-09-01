import  React, { useEffect, useContext} from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle"
import { theme } from "./components/theme";
import { AuthProvider, authContext} from "./context/AuthenticationContext";
import { UnauthenticatedLayout } from "./components/UnauthenticatedLayout";
import {LoginPage} from "./pages/Login/LoginPage";


export const App = () => {
  useEffect(() => {
    (async function() {
      const helloRequest = await fetch("/api");
      const halloJson = await helloRequest.json();
      console.log(halloJson);
    })();
  });
  return (
    <>
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <GlobalStyle />
        <UnauthenticatedLayout>
          <LoginPage />
        </UnauthenticatedLayout>
      </AuthProvider>
    </ThemeProvider> 
    </>
  );
}