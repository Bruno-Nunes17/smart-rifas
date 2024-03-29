import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Error from "./pages/Error";
import Login from "./pages/LoginPage";
import NewAwards from "./pages/NewAwards";
import Detail from "./pages/Detail";
import Sale from "./pages/Sale";
import Seller from "./pages/Seller";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/newaward",
        element: <NewAwards />,
      },
      {
        path: "/detail",
        element: <Detail />,
      },
      {
        path: "/sale",
        element: <Sale />,
      },
      {
        path: "/newseller",
        element: <Seller />,
      },
    ],
  },
]);

const initialState = {
  user: {
    nome: null,
  },
  token: null,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContext initialState={initialState}>
      <RouterProvider router={route} />
    </AppContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
