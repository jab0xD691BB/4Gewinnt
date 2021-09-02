import {} from "styled-components/cssprop";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      backgroundColor: string;
      listBackgroundColor: string;
      buttonColor: string;
      fontColor: string;
      secondaryFontColor: string;
      shadowColor: string;
      primary: string;
      listHovorColor: string;
    };
  }
}
