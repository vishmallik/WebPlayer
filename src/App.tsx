import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const Home = lazy(() => import("./components/Home"));
const VideoPlayer = lazy(() => import("./components/VideoPlayer"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        }
      >
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/player",
    element: (
      <Suspense
        fallback={
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        }
      >
        <VideoPlayer />
      </Suspense>
    ),
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
