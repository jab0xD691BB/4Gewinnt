import { DefaultTheme } from "styled-components";
import theme from "styled-theming";

export const backgroundColor: theme.ThemeSet = theme('mode', {
  light: '#fafafa',
  dark: '#202020'
});

export const textColor: theme.ThemeSet = theme('mode', {
  light: '#191919',
  dark: '#fafafa'
});

export const buttonBackgroundColor = theme('mode', {
  light: '#222',
  dark: '#eee'
});

export const buttonTextColor = theme('mode', {
  light: '#eee',
  dark: '#222'
});

export const themeStyle: DefaultTheme = {
  colors: {
    primary: "rgb(54,161,139)",
    backgroundColor: "#202020",
    fontColor: "#fff",
    secondaryFontColor: "rgb(191,191,191)",
    shadowColor: "rgba(0,0,0,0.3)",
    listBackgroundColor: "rgb(120, 120, 120)",
    listHovorColor: "rgb(65,65,65)",
  },
};
