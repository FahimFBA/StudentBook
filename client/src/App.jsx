import LeftBar from "./components/leftbar/LeftBar";
import MobileNav from "./components/mobileNav/MobileNav";
import NavBar from "./components/navbar/NavBar";
import "./style.scss";
import { lazy, Suspense, use } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthContext } from "./context/authContext";

const queryClient = new QueryClient();
const Home = lazy(() => import("./pages/home/Home"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Something = lazy(() => import("./pages/something/Something"));
const Videos = lazy(() => import("./pages/videos/Videos"));
const Article = lazy(() => import("./pages/Article/Article"));
const Job = lazy(() => import("./pages/Job/Job"));
const Announcement = lazy(() => import("./pages/Announcement/Announcement"));

const AppLoading = () => (
  <div className="app-loading" aria-live="polite">
    Loading StudentBook...
  </div>
);

const Layout = () => {
  const { darkMode } = use(DarkModeContext);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"} app-shell`}>
        <NavBar />
        <MobileNav />
        <main className="main-shell">
          <LeftBar />
          <div className="content-panel">
            <Outlet />
          </div>
        </main>
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
  const { darkMode } = use(DarkModeContext);

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
          path: "/videos",
          element: <Videos />,
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
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Suspense fallback={<AppLoading />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
