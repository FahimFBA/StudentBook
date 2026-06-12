import LeftBar from "./components/leftbar/LeftBar";
import NavBar from "./components/navbar/NavBar";
// import RightBar from "./components/rightbar/RightBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { use } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Something from "./pages/something/Something";
import Article from "./pages/Article/Article";
import Job from "./pages/Job/Job";
import Announcement from "./pages/Announcement/Announcement";

const queryClient = new QueryClient();

const Layout = () => {
  const { darkMode } = use(DarkModeContext);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>

          {/* <RightBar /> */}
        </div>
      </div>
    </QueryClientProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { currentUser } = use(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/articles",
          element: <Article />,
        },
        {
          path: "/jobs",
          element: <Job />,
        },
        {
          path: "/announcements",
          element: <Announcement />,
        },
        {
          path: "/something",
          element: <Something />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
