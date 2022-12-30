import React from "react";
import Blog from "./Blog/Blog";
import Spinner from "./../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Blogs = ({ blogs }) => {
  const { data: recentBlogs = [], isLoading } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch("https://code-gallery-server-nasim0994.vercel.app/recentBlog").then(
        (res) => res.json()
      ),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="lg:flex gap-4">
      <div data-aos="fade-right" className="lg:w-[75%] bg-white p-5 pt-0">
        {blogs.length
          ? blogs.map((blog) => <Blog key={blog._id} blog={blog} />)
          : "No Blog"}
      </div>

      {/* Right Side */}
      <div
        data-aos="fade-left"
        className="w-[25%] bg-white p-6 hidden lg:block"
      >
        <h2 className="text-2xl font-medium">Recent Blog</h2>
        <ul className="mt-2">
          {recentBlogs?.map((blog) => (
            <li className="border-b pb-1 mb-2 font-medium text-lg hover:underline text-gray-600">
              <Link to={`blog/${blog._id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blogs;
