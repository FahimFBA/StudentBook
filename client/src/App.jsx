import Login from "./pages/login/Login"
import Register from "./pages/register/Register";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const Layout = () => {
    return (
      <div>
        
      </div>
    )
  }

  const router = createBrowserRouter([
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
    </div >
  );
}

export default App;
