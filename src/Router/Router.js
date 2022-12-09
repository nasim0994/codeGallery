import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Signup from "./../pages/Signup/Signup";
import Login from "./../pages/Login/Login";
import Admin from "../Layout/Admin";
import Dashboard from "../dashboardPage/Dashboard/Dashboard";
import AllUsers from "../dashboardPage/AllUsers/AllUsers";
import AddBlog from "../dashboardPage/AddBlog/AddBlog";
import AllBlog from "../dashboardPage/AllBlog/AllBlog";
import BlogDetails from "../pages/BlogDetails/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails></BlogDetails>,
        loader: ({ params }) =>
          fetch(
            `https://code-gallery-server-nasim0994.vercel.app/blogs/${params.id}`
          ),
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },

  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/allusers",
        element: <AllUsers />,
      },
      {
        path: "/admin/addblog",
        element: <AddBlog />,
      },
      {
        path: "/admin/allblog",
        element: <AllBlog />,
      },
    ],
  },
]);

export default router;
