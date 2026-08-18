import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Links from "./pages/Links";
import CreateLinks from "./pages/CreateLinks";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/links",
    element: (
      <ProtectedRoute>
        <Links />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-link",
    element: (
      <ProtectedRoute>
        <CreateLinks />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}

export default App;
