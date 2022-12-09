import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./../../ContextApi/UserContext";
import ButtonSpinner from "./../../components/ButtonSpinner/ButtonSpinner";

const Signup = () => {
  const { signup, updateUser, verifyEmail } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit } = useForm();
  const imageBBKey = process.env.REACT_APP_imageBB_key;

  const handelSignup = (data) => {
    setLoading(true);

    const userPhoto = data.photo[0];
    const formData = new FormData();
    formData.append("image", userPhoto);
    const url = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const userName = data.name;
          const userPhoto = imageData.data.url;
          const email = data.email;
          const password = data.password;

          signup(email, password)
            .then((result) => {
              if (result?.user) {
                handelUserProfile(userName, userPhoto);
                setLoading(false);
                getLoginUserToekn(email);

                verifyEmail().then(() => {
                  window.location.reload();
                });

                toast.warning("Please verify Your Email. cheack spam folder");
              }
            })
            .catch((error) => {
              console.log(error);
              setMessage(error.message);
              setLoading(false);
            });
        }
      });
  };

  // Handel user Profiule
  const handelUserProfile = (userName, userImg) => {
    const profile = {
      displayName: userName,
      photoURL: userImg,
    };

    updateUser(profile)
      .then((result) => {})
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  // GET token
  const getLoginUserToekn = (email) => {
    fetch(`https://code-gallery-server-nasim0994.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("Code-Gallery-jwt", data.accessToken);
        }
      });
  };

  return (
    <div className="container mx-auto py-5">
      <div className="w-[80%] md:w-[50%] lg:w-[40%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">SignUp Now!</h2>

        <div className="card w-full shadow-2xl bg-base-100">
          <form
            onSubmit={handleSubmit(handelSignup)}
            className="card-body pb-1"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Full name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                {...register("photo")}
                type="file"
                className="file-input w-full input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>

            <p className="text-red-500">{message}</p>

            <button type="submit" className="btn">
              {loading ? <ButtonSpinner /> : "Sign Up"}
            </button>
          </form>

          <div className="card-body pt-0">
            <div>
              <small>
                Already have a account?{" "}
                <Link to="/login" className="text-info underline">
                  LogIn
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
