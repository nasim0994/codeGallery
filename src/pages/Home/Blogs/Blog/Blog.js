import React from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";

const Blog = ({ blog }) => {
  const { _id, title, description, picture, authorName, date } = blog;

  return (
    <div className="lg:flex gap-2 border-b py-6">
      <div className="lg:w-[40%]">
        <Link to={`blog/${_id}`}>
          <img src={picture} alt="" className="h-full" />
        </Link>
      </div>
      <div className="lg:w-[60%]">
        <Link to={`blog/${_id}`}>
          <h3 className="text-3xl font-semibold text-[#3c3434]">{title}</h3>
        </Link>
        <div className="flex items-center gap-6 text-[#6c6565] text-sm py-2">
          <p className="flex items-center gap-1">
            <HiOutlinePencilAlt />
            {authorName}
          </p>
          <p className="flex items-center gap-1">
            <FaRegComment />0
          </p>
          <p className="flex items-center gap-1">
            <FcCalendar />
            {date}
          </p>
        </div>
        <p className="text-[#504d4d] text-[16px]">
          {description.slice(0, 200)}...
          <Link
            to={`blog/${_id}`}
            className="text-violet-700 font-medium underline"
          >
            read more
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Blog;
