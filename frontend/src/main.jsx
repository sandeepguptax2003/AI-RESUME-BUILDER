import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StateContext from "./Context/StateContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StateContext>
      <App />
    </StateContext>
  </BrowserRouter>
);