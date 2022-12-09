import React, { useContext, useState, useRef } from "react";
import JoditEditor from "jodit-react";

import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useLoaderData, useNavigation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { AuthContext } from "../../ContextApi/UserContext";
import Swal from "sweetalert2";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  //   const navigation = useNavigation();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const imageBBKey = process.env.REACT_APP_imageBB_key;

  const editor = useRef(null);
  const [details, setDetails] = useState("");

  const { data: loginUser = {}, isLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: () =>
      fetch(
        `https://code-gallery-server-nasim0994.vercel.app/user?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("Code-Gallery-jwt")}`,
          },
        }
      ).then((res) => res.json()),
  });

  const now = new Date();
  // Date
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  const date = `${month}-${day}-${year}`;

  const handelAddProduct = (data) => {
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
          const blog = {
            date,
            picture: imageData.data.url,
            category: data.category,
            title: data.title,
            description: data.description,
            detailsDescription: details,
            authorName: loginUser?.name,
            authorEmail: loginUser?.email,
            comment: parseInt(0),
          };

          fetch("https://code-gallery-server-nasim0994.vercel.app/blogs", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem(
                "Code-Gallery-jwt"
              )}`,
            },
            body: JSON.stringify(blog),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Blog Post Success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setLoading(false);
                reset();
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { data: categorys = [] } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch("https://code-gallery-server-nasim0994.vercel.app/categorys").then(
        (res) => res.json()
      ),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-3 text-red-600">
        Add a Blog
      </h2>
      <form
        onSubmit={handleSubmit(handelAddProduct)}
        className="w-[95%] md:w-[80%] mx-auto card card-body shadow-2xl bg-white"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Title</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Blog Title"
            className="input input-bordered"
            required
          />
        </div>

        <div className="md:flex items-center gap-4">
          <div className="form-control  md:w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Blog Thumbnail</span>
            </label>
            <input
              {...register("photo")}
              type="file"
              className="file-input w-full input-bordered"
              required
            />
          </div>

          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Category:</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full "
            >
              {categorys.map((category) => (
                <option defaultValue={category.name} className="text-base">
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-control ">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered mb-2"
            {...register("description")}
            placeholder="Short Description"
            required
          ></textarea>

          <JoditEditor
            ref={editor}
            value={details}
            tabIndex={1}
            onBlur={(newContent) => setDetails(newContent)}
          />
        </div>

        <button type="submit" className="btn">
          {loading ? <ButtonSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
