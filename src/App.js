import { Outlet } from "react-router-dom";
import HeaderComponent from "./components/Header";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Outlet />
    </div>
  );
}

export default App;
