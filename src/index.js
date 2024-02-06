import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import rootreducer from "./redux/store/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = configureStore({
  reducer: rootreducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  
      <Provider store={store}>
        <GoogleOAuthProvider clientId="341785343794-2aefodgbd32v7q8enj9pifdn0j7ab552.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
        <ToastContainer />
        <Toaster />
      </Provider>

  </BrowserRouter>
);
