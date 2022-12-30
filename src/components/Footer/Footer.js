import React from "react";
import { Link } from "react-router-dom";
import { DiJavascript, DiHtml5, DiCss3 } from "react-icons/di";

const Footer = ({ handelCategoryBlog }) => {
  return (
    <footer className="py-4 bg-base-200 text-base-content">
      <div className="w-[80%] mx-auto footer">
        <div>
          <Link
            to="/"
            className="flex items-center gap-1 text-violet-600 hover:text-violet-700"
          >
            <h2 className="text-xl font-bold ">CodeGallery</h2>
          </Link>
          <p>
            Programming Blog Content.
            <br />
            Providing reliable tech since 2022.
          </p>
        </div>

        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </div>

        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>

        <div>
          <span className="footer-title">Link</span>
          <a
            href="https://www.facebook.com/nasimuddin0994/"
            className="link link-hover"
            target="blank"
          >
            Facebook
          </a>
          <a
            href="https://github.com/nasim0994"
            className="link link-hover"
            target="blank"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/mdnasimuddin/"
            className="link link-hover"
            target="blank"
          >
            Linkend
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
