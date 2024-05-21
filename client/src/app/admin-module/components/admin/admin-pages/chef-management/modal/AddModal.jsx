import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loader/Index";
import config from "@/config";

const AddModal = ({ closeModal ,refreshData }) => {
  const token = JSON.parse(localStorage.getItem("admin_token"));

  const [chefData, setChefData] = useState({
    name: "",
    specialty: "",
    bio: "",
    images: [],
    bannerImage: [],
    Instagram_Link: "",
    Facebook_Link: "",
  });
  const [isLoading, setLoading] = useState(false);


  const inputHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === "images" || name === "bannerImage") {
      // Check file size
      const fileSize = files[0].size; // in bytes
      const maxSize = name === "bannerImage" ? 1024 * 1024 : 200 * 1024; // 1MB for bannerImage, 200KB for images
      if (fileSize > maxSize) {
        toast.error(
          `File size exceeds the limit. Maximum allowed size is ${
            name === "bannerImage" ? "1 MB" : "200 KB"
          }.`
        );
        return; // Prevent setting state if file size exceeds the limit
      }

      setChefData({
        ...chefData,
        [name]: files[0],
      });
    } else {
      setChefData({
        ...chefData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", chefData.name);
      formData.append("specialty", chefData.specialty);
      formData.append("bio", chefData.bio);
      formData.append("images", chefData.images);
      formData.append("bannerImage", chefData.bannerImage);
      formData.append("Instagram_Link", chefData.Instagram_Link);
      formData.append("Facebook_Link", chefData.Facebook_Link);

      const response = await axios.post(
        `${config.baseURL}/api/chef/chefs`,
        formData,
        {
          headers: {
            authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Chef added successfully.");
        setLoading(false);
        refreshData();
        closeModal();
      } else {
        toast.error("Invalid details");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during category:", error);
      toast.error("Something went wrong, try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center px-4 lg:px-8 py-4 ">
            <div className="py-2 ">
              <span className="login-input-label capitalize"> Name :</span>
              <input
                type="text"
                name="name"
                placeholder="Enter chef name"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
                required
              />
            </div>

            <div className="py-2 ">
              <span className="login-input-label capitalize">
                {" "}
                Nationality :
              </span>
              <input
                type="text"
                name="specialty"
                placeholder="Enter Nationality"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
              />
            </div>

            <div className="py-2 ">
              <span className="login-input-label capitalize"> Bio :</span>
              <textarea
                name="bio"
                placeholder="Enter chef`s bio"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
              />
            </div>

            <div>
              <label className="custom_input_label">Profile Image</label>
              <p className="text-sm text-red-500 mt-1">
                Profile Image size should be width 288px and height 323px pixels.
              </p>
              <input
                type="file"
                onChange={inputHandler}
                name="images"
                className="custom_inputt"
                accept="image/*"
                required
              />
              
            </div>

            <div>
              <label className="custom_input_label">Banner Image</label>
              <p className="text-sm text-red-500 mt-1">
                Banner Image size should be width 1600px and height 529px pixels.
              </p>
              <input
                type="file"
                onChange={inputHandler}
                name="bannerImage"
                className="custom_inputt"
                accept="image/*"
                required
              />
              
            </div>

            <div>
              <span className="login-input-label capitalize">
                {" "}
                Instagram Link :
              </span>
              <input
                type="text"
                name="Instagram_Link"
                placeholder="Enter Instagram link"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
              />
            </div>

            <div>
              <span className="login-input-label capitalize">
                {" "}
                Facebook Link :
              </span>
              <input
                type="text"
                name="Facebook_Link"
                placeholder="Enter Facebook link"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
              />
            </div>

            <div className="py-[20px] flex items-center justify-center md:justify-end  md:flex-nowrap gap-y-3 gap-x-3 ">
              <button
                type="button"
                className="secondary_btn w-full"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="primary_btn w-full"
              >
                {isLoading ? "Loading.." : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddModal;
