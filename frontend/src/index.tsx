import ReactDOM from 'react-dom';
import {App} from './App';
import { ThemeManager } from './pages/Settings/ThemeManager';
const rootElement = document.getElementById("root");
ReactDOM.render(
    <ThemeManager>
    <App />
  </ThemeManager>, rootElement
    );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
