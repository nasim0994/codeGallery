import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { AuthContext } from "./../../ContextApi/UserContext";

const Login = () => {
  const { login, setLoading } = useContext(AuthContext);
  const [loginLoading, setLoginLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Handel Login with Email and password
  const handelLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoginLoading(true);

    login(email, password)
      .then((result) => {
        const user = result?.user;
        if (user) {
          setLoginLoading(false);
          setMessage("");

          const userInfo = {
            name: user.displayName,
            email,
            password,
            photo: user.photoURL,
            role: "viewer",
          };

          if (user?.emailVerified) {
            toast("Login Success");
            form.reset();
            console.log(user);
            getLoginUserToekn(email);
            navigate(from, { replace: true });

            // User Info send Database
            fetch("https://code-gallery-server-nasim0994.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userInfo),
            })
              .then((res) => res.json())
              .then((data) => {});
          } else {
            toast.error(
              "Your Email is not Verify, Check your Email spam folder and verify"
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
        setLoginLoading(false);
      })
      .finally(() => {
        setLoading(false);
        setLoginLoading(false);
      });
  };

  // GET token
  const getLoginUserToekn = (email) => {
    fetch(`https://code-gallery-server-nasim0994.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("Code-Gallery-jwt", data.accessToken);
      });
  };

  return (
    <div className="hero py-8">
      <div className="w-[80%] md:w-[50%] lg:w-[30%]">
        <h2 className="text-3xl font-bold text-center mb-3">Login Now!</h2>

        <div className="card w-full shadow-2xl bg-base-100">
          <form onSubmit={handelLogin} className="card-body pb-1">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {message && <p className="text-red-500">{message}</p>}

            <div className="form-control">
              <button type="submit" className="btn">
                {loginLoading ? <ButtonSpinner /> : "Log In"}
              </button>
            </div>
          </form>

          <div className="card-body pt-0">
            <div>
              <small>
                Your have no account?{" "}
                <Link to="/signup" className="text-info underline">
                  SignUp
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
