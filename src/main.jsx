import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/pages/Profile";
import Members from "./components/pages/Members.jsx";
import Layout from "./Layout.jsx";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/blockers/ProtectedRoute";
// Import your Zustand store (if you have any global store configuration)
import useAuthStore from "./store/useAuthStore";
import PrivateRoute from "./components/blockers/PrivateRoute";
import Home from "./components/pages/Home";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfile from "./components/profile/UserProfile";
import Events from "./components/events/Events";
const router = createBrowserRouter([
  {
    path: "/", // Parent route using the layout
    element: <Layout />,
    children: [
      {
        path: "/", // Matches the root path
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "members", // Matches "/members"
        element: (
          <PrivateRoute>
            <Members />
          </PrivateRoute>
        ),
      },
      {
        path: "profile", // Matches "/members"
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "events", // Matches "/events"
        element: (
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        ),
      },
      {
        path: "profile/:_id",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const initializeStore = () => {
  const token = localStorage.getItem("token");
  if (token) {
    useAuthStore.getState().setToken(token);
  }
};

initializeStore();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster />
  </QueryClientProvider>
);
