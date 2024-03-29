import { Outlet, useLocation } from "react-router-dom";
import HeaderComponent from "./components/Header";
import { useMemo } from "react";
import Awards from "./pages/Awards";

function App() {
  const location = useLocation()
  const path = useMemo( ()=> location.pathname ,[location.pathname] )
  console.log(location);
  return (
    <div className="App">
      <HeaderComponent/>
      <Outlet/>

      {path === "/" && <Awards/>}
    </div>
  );
}

export default App;
