import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "./../../components/Spinner/Spinner";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const AllBlog = () => {
  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      fetch(`https://code-gallery-server-nasim0994.vercel.app/blogs`).then(
        (res) => res.json()
      ),
  });

  const handelUserDelete = (id) => {
    const confirm = window.confirm(`Are you sure delete this user`);
    if (confirm) {
      fetch(`https://code-gallery-server-nasim0994.vercel.app/blogs/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("Code-Gallery-jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast("Delete Success");
            refetch();
          }
        });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        {blogs?.length === 0 ? (
          <h2 className="text-2xl text-center text-red-600 font-semibold">
            No Blog
          </h2>
        ) : (
          <div>
            <h2 className="text-center text-3xl font-semibold mb-4">
              Total Blogs: {blogs.length}
            </h2>

            <table className="table w-full border">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {blogs?.map((blog, i) => (
                  <tr key={blog._id}>
                    <th>{i + 1}</th>
                    <td>{blog?.title}</td>
                    <td>{blog.category}</td>
                    <td>{blog.authorName}</td>
                    <td>
                      <button
                        onClick={() => handelUserDelete(blog._id)}
                        className="text-2xl text-red-700"
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
