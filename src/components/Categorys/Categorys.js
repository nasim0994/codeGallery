import React from "react";
import { DiJavascript, DiHtml5, DiCss3 } from "react-icons/di";
import { Link } from "react-router-dom";

const Categorys = ({ handelCategoryBlog }) => {
  return (
    <ul className="menu bg-base-100 p-2">
      <li className="lg:text-lg font-semibold text-orange-600 shadow-sm mb-1 bg-gray-100 rounded-md">
        <Link onClick={handelCategoryBlog}>
          <DiHtml5 className="text-2xl" />
          HTML
        </Link>
      </li>
      <li className="lg:text-lg font-semibold text-blue-700 shadow-sm mb-1 bg-gray-100 rounded-md">
        <Link onClick={handelCategoryBlog}>
          <DiCss3 className=" text-2xl" />
          CSS
        </Link>
      </li>
      <li className="lg:text-lg font-semibold text-violet-700 shadow-sm mb-1 bg-gray-100 rounded-md">
        <Link onClick={handelCategoryBlog}>
          {" "}
          <DiJavascript className=" text-2xl" />
          Bootstrap
        </Link>
      </li>
      <li className="lg:text-lg font-semibold text-green-600 shadow-sm mb-1 bg-gray-100 rounded-md">
        <Link onClick={handelCategoryBlog}>
          {" "}
          <DiJavascript className="text-2xl" />
          Tailwind CSS
        </Link>
      </li>
      <li className="lg:text-lg font-semibold text-yellow-500 shadow-sm mb-1 bg-gray-100 rounded-md">
        <Link onClick={handelCategoryBlog}>
          {" "}
          <DiJavascript className=" text-2xl" />
          JavaScript
        </Link>
      </li>
      <li className="lg:text-lg font-semibold text-cyan-500 shadow-sm mb-1 bg-gray-100 rounded-md">
        <Link onClick={handelCategoryBlog}>
          {" "}
          <DiJavascript className=" text-2xl" />
          React JS
        </Link>
      </li>
      <li className="lg:text-lg font-semibold text-teal-600  shadow-sm mb-1 bg-gray-100 rounded-md">
        <Link onClick={handelCategoryBlog}>
          {" "}
          <DiJavascript className="text-2xl" />
          Express JS
        </Link>
      </li>
    </ul>
  );
};

export default Categorys;
