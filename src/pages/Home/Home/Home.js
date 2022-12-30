import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "../../../components/Carousel/Carousel";
import Categorys from "../../../components/Categorys/Categorys";
import Blogs from "../Blogs/Blogs";
import { Link } from "react-router-dom";

const Home = () => {
  const [categoryText, setCategoryText] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`https://code-gallery-server-nasim0994.vercel.app/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  const handelAllBlogs = () => {
    fetch(`https://code-gallery-server-nasim0994.vercel.app/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  };

  const handelCategoryBlog = (e) => {
    const categoryText = e.target.innerText;
    setCategoryText(categoryText);
    fetch(
      `https://code-gallery-server-nasim0994.vercel.app/blogs?category=${categoryText}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  };

  return (
    <div className="py-3 w-[95%] lg:w-[80%] mx-auto">
      {/* Banner */}
      <section className="flex gap-4">
        <div data-aos="fade-right" className="lg:w-[75%]">
          <Carousel></Carousel>
        </div>
        <div data-aos="fade-left" className="lg:w-[25%] hidden lg:block">
          <Categorys handelCategoryBlog={handelCategoryBlog} />
        </div>
      </section>

      {/* Blog */}
      <section className="my-5">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link onClick={handelAllBlogs}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
                All Blogs
              </Link>
            </li>
            {categoryText && (
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-2 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    ></path>
                  </svg>
                  {categoryText}
                </a>
              </li>
            )}
          </ul>
        </div>
        <Blogs blogs={blogs} setBlogs={setBlogs} />
      </section>
    </div>
  );
};

export default Home;
