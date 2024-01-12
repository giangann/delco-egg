import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRouters } from "./route/Route";

function App() {

  return (
    <div>
      <RouterProvider router={appRouters} />
    </div>
  );
}

export default App;
