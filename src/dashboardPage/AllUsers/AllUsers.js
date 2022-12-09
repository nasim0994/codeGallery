import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "./../../components/Spinner/Spinner";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const AllUsers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch(`https://code-gallery-server-nasim0994.vercel.app/users`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("Code-Gallery-jwt")}`,
        },
      }).then((res) => res.json()),
  });

  const handelUserDelete = (id) => {
    const confirm = window.confirm(`Are you sure delete this user`);
    if (confirm) {
      fetch(`https://code-gallery-server-nasim0994.vercel.app/users/${id}`, {
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
        {users?.length === 0 ? (
          <h2 className="text-2xl text-center text-red-600 font-semibold">
            No User
          </h2>
        ) : (
          <div>
            <h2 className="text-center text-3xl font-semibold mb-4">
              Total User: {users.length}
            </h2>
            <table className="table w-full border">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, i) => (
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>{user?.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => handelUserDelete(user._id)}
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

export default AllUsers;
