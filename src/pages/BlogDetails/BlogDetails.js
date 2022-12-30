import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { AiFillFolderOpen } from "react-icons/ai";
import { AuthContext } from "./../../ContextApi/UserContext";
import { toast } from "react-toastify";
import CommentsDisplay from "./CommentsDisplay/CommentsDisplay";
import { useQuery } from "@tanstack/react-query";
import parcer from "html-react-parser";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { useEffect } from "react";

const BlogDetails = () => {
  const {
    _id,
    title,
    picture,
    date,
    category,
    description,
    detailsDescription,
    authorName,
  } = useLoaderData();

  const parcerDescription = parcer(detailsDescription);

  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  // const [blog, setBlog] = useState({});

  // Comment Get
  const { data: comments = [], refetch } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch(
        `https://code-gallery-server-nasim0994.vercel.app/comments/${_id}`
      ).then((res) => res.json()),
  });

  // Blog Get
  const { data: blog = {} } = useQuery({
    queryKey: [_id],
    queryFn: () =>
      fetch(
        `https://code-gallery-server-nasim0994.vercel.app/blogs/${_id}`
      ).then((res) => res.json()),
  });

  // Comment post
  const handelComment = (_id) => {
    setLoading(true);

    const commentInfo = {
      blogId: _id,
      comment: comment,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
    };

    fetch("https://code-gallery-server-nasim0994.vercel.app/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("Code-Gallery-jwt")}`,
      },
      body: JSON.stringify(commentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          fetch(
            `https://code-gallery-server-nasim0994.vercel.app/blogs/${_id}`,
            {
              method: "PUT",
            }
          )
            .then((res) => res.json())
            .then((data) => {
              toast.success("Comment Success");
              setComment("");
              setLoading(false);
              refetch();
            });
        }
      });
  };

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto py-4">
      <div>
        <div>
          {/* Blog Details */}
          <div className="bg-white pb-6">
            {/* Image */}
            <img src={picture} alt="" className="w-full h-[450px]" />
            {/* Others Info */}
            <div className="px-2 lg:px-0 text-sm lg:flex items-center justify-center gap-6 text-[#6c6565] lg:text-md py-6 font-medium">
              <p className="flex items-center gap-1">
                <AiFillFolderOpen className="text-red-600" />
                {category}
              </p>
              <p className="flex items-center gap-1">
                <FcCalendar className="text-red-600" />
                {date}
              </p>
              <p className="flex items-center gap-1">
                <HiOutlinePencilAlt className="text-red-600" />
                {authorName}
              </p>
              <p className="flex items-center gap-1">
                <FaRegComment className="text-red-600" />
                {blog.comment}
              </p>
            </div>
            {/* Blog Info */}
            <div className="px-2 lg:px-10">
              {/* Title */}
              <h2 className="font-semibold text-4xl mb-3">{title}</h2>
              {/*Blog Description */}
              <div>
                <>{description}</>
                <br />
                <>{parcerDescription}</>
              </div>
            </div>
          </div>

          {/* Comment area */}
          <div className="bg-white p-6 mt-6">
            {user ? (
              <>
                {/* Comment Box */}
                <div className="flex gap-2">
                  <img
                    src={user?.photoURL}
                    alt="userPhoto"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="w-full mt-4">
                    <input
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      name="comment"
                      value={comment}
                      placeholder="Add a comment..."
                      className="border-b w-full outline-none"
                    />

                    {comment.length > 0 && (
                      <div className="flex gap-2 items-center justify-end mt-3">
                        <button
                          onClick={() => handelComment(_id)}
                          className=" bg-violet-600 hover:bg-violet-700 text-white px-3 py-1 rounded-2xl font-medium"
                        >
                          {loading ? <ButtonSpinner /> : "Comment"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comment display */}
                {comments?.map((comment) => (
                  <CommentsDisplay key={comment._id} comment={comment} />
                ))}
              </>
            ) : (
              // No user and login
              <p className="text-center">
                Please{" "}
                <Link
                  to="/login"
                  className="text-red-600 font-medium underline"
                >
                  LogIn
                </Link>{" "}
                to add a Comment
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
