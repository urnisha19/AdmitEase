import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage/Home";
import Colleges from "../Pages/Colleges";
import Admission from "../Pages/AdmissionPage/Admission";
import MyCollege from "../Pages/MyCollege";
import CollegeDetails from "../Pages/CollegeDetails";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import PrivateRoute from "../Routes/PrivateRoute";
import Register from "../Pages/Register";
import PasswordReset from "../Pages/PasswordReset";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // public login page
  },
  {
    path: "/register",
    element: <Register />, // public register page
  },
  {
    path: "/reset-password",
    element: <PasswordReset />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/colleges", element: <Colleges /> },
      { path: "/admission", element: <Admission /> },
      {
        path: "/my-college",
        element: (
          <PrivateRoute>
            <MyCollege />
          </PrivateRoute>
        ),
      },
      {
        path: "/college/:id",
        element: (
          <PrivateRoute>
            <CollegeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
