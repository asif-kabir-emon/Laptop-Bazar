import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routers } from "./Routes/Routers/Routers";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="max-w-screen-xl">
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
