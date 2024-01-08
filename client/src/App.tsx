import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useDevice } from "./hooks/useDevice";
import { appRouters } from "./route/Route";

function App() {
  const { isMobile } = useDevice();

  return (
    <div>
      <RouterProvider router={appRouters} />
    </div>
  );
}

export default App;
