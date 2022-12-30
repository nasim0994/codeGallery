import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { SiCodersrank } from "react-icons/si";
import { AuthContext } from "../../ContextApi/UserContext";
import useAdmin from "../../Hooks/useAdmin";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(true);
  const [isAdmin] = useAdmin(user?.email);
  const { setSearch } = useContext(AuthContext);

  return (
    <header className="bg-white sticky z-20 top-0">
      <div className="w-[80%] mx-auto navbar  ">
        <div className="navbar-start gap-2">
          <Link
            to="/"
            className="flex items-center gap-1 text-violet-600 hover:text-violet-700"
          >
            {/* <p className="text-3xl">
              <SiCodersrank />
            </p> */}
            <h2 className="text-2xl font-bold ">CodeGallery</h2>
          </Link>
        </div>

        <div className="navbar-end gap-4 items-center">
          <form className="w-[60%] hidden md:block">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                id="default-search"
                className="block w-full p-4 py-[10px] pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                placeholder="Search here"
              />
            </div>
          </form>

          <div>
            <ul className="relative">
              {user && user?.emailVerified ? (
                <>
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center text-[16px] font-medium text-gray-900 rounded-full hover:text-gray-700 md:mr-0 focus:ring-4 focus:ring-gray-100"
                    type="button"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="mr-2 w-10 h-10 rounded-full"
                      src={user?.photoURL}
                      alt={user?.photoURL}
                    />
                    <span className="hidden md:block">{user?.displayName}</span>
                    <svg
                      className="w-4 h-4 mx-1.5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  {/* <!-- Dropdown menu --> */}
                  <div
                    className={`${
                      !dropdown ? "block" : "hidden"
                    } z-10 w-52 px-2 bg-white rounded divide-y divide-gray-100 shadow-md dark:bg-gray-700 dark:divide-gray-600 absolute top-[51px] right-0`}
                  >
                    <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      <div className="font-medium ">{user?.displayName}</div>
                      <div className="truncate">{user?.email}</div>
                    </div>
                    <ul className="py-1 text-[16px] text-gray-700 dark:text-gray-200">
                      {isAdmin && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}

                      <li>
                        <Link className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Settings
                        </Link>
                      </li>
                    </ul>
                    <div className="py-1">
                      <Link
                        onClick={() => logout()}
                        className="btn btn-outline w-full"
                      >
                        Sign out
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <li>
                  <Link to="/login" className="btn">
                    LogIn
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
