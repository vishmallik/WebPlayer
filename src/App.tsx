import Home from "./components/Home";
import VideoPlayer from "./components/VideoPlayer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/player",
    element: <VideoPlayer />,
  },
]);

function App() {
  return (
    <main className=" bg-slate-200 h-fit">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
