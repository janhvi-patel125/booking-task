import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "./assets/scss/style.scss";
import { Provider } from "react-redux";
import store from "./app/store";
import ToastNotification from "./components/ToastNotification";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <ToastNotification />
          <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;