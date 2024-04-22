import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  // Navigate,
} from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Error from "./pages/Error";
import Login from "./pages/LoginPage";
import NewAwards from "./pages/NewAwards";
import Awards from "./pages/Awards";
import Detail from "./pages/Detail";
import Sale from "./pages/Sale";
import Seller from "./pages/Seller";
import LoginSeller from "./pages/LoginSeller";
import { CookiesProvider } from "react-cookie";

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      // {
      //   path: "/",
      //   element: <Navigate to={"/rifas"} />,
      // },
      {
        path: "/rifas",
        element: <Awards />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/login/vendedor",
        element: <LoginSeller />,
      },
      {
        path: "/novarifa",
        element: <NewAwards />,
      },
      {
        path: "/detalhes/:id",
        element: <Detail />,
      },
      {
        path: "/cotas/:id",
        element: <Sale />,
      },
      {
        path: "/cadastrar/vendedor",
        element: <Seller />,
      },
    ],
  },
]);

const initialState = {
  user: {},
  token: null,
  error: [],
  rifas: [],
  rifa: [],
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AppContext initialState={initialState}>
        <RouterProvider router={privateRoutes} />
      </AppContext>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
