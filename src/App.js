import { Outlet } from "react-router-dom";
import HeaderComponent from "./components/Header";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { isLoggedAction } from "./context/action";
import { useAppContext } from "./context/AppContext";

function App() {
  const { state, dispatch } = useAppContext();
  const [cookies] = useCookies(["User", "Token"]);

  useEffect(() => {
    if (state.token === null) {
      isLoggedAction(dispatch, cookies);
    }
  }, [cookies, dispatch, state.token, state.type]);

  return (
    <div className="App">
      <HeaderComponent />
      <Outlet />
    </div>
  );
}

export default App;
