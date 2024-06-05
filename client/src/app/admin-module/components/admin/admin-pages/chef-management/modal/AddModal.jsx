import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import Loader from "../../../loader/Index";
import config from "@/config";

const AddModal = ({ closeModal, refreshData }) => {
  const token = JSON.parse(localStorage.getItem("admin_token"));
  const [error, setError] = useState("");
  const [renderedHTML, setRenderedHTML] = useState("");
  const [chefData, setChefData] = useState({
    name: "",
    nationality: "",
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
      if (files && files[0]) {
        const fileSize = files[0].size; // in bytes
        const maxSize = name === "bannerImage" ? 1024 * 1024 : 200 * 1024; // 1MB for bannerImage, 200KB for images
        if (fileSize > maxSize) {
          setError(
            `File size exceeds the limit. Maximum allowed size is ${
              name === "bannerImage" ? "1 MB" : "200 KB"
            }.`
          );
          return;
        }

        setChefData({
          ...chefData,
          [name]: files[0],
        });
        setError(""); // Clear the error if the file size is valid
      } else {
        setError("No file selected.");
      }
    } else {
      setChefData({
        ...chefData,
        [name]: value,
      });
      setError(""); // Clear the error for non-file inputs
    }
  };

  const handleBioChange = (value) => {
    setChefData({
      ...chefData,
      bio: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors

    const maxImageSize = 200 * 1024; // 200KB
    const maxBannerImageSize = 1024 * 1024; // 1MB

    // Validate image sizes
    if (chefData.images && chefData.images.size > maxImageSize) {
      setError("Image size exceeds the limit of 200 KB.");
      setLoading(false);
      return;
    }

    if (
      chefData.bannerImage &&
      chefData.bannerImage.size > maxBannerImageSize
    ) {
      setError("Banner image size exceeds the limit of 1 MB.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", chefData.name);
      formData.append("nationality", chefData.nationality);
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

        // Render the HTML content
        const renderedHTML = `<div dangerouslySetInnerHTML={{ __html: '${chefData.bio}' }} />`;
        setRenderedHTML(renderedHTML);
      } else {
        toast.error("Invalid details");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during category:", error);
      setError("Image size not as per requirement");
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
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
                name="nationality"
                placeholder="Enter Nationality"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
              />
            </div>

            <div className="py-2 mb-8">
              <span className="login-input-label capitalize"> Bio :</span>
              <ReactQuill
                value={chefData.bio}
                onChange={handleBioChange}
                placeholder="Enter chef's bio"
                className="login-input w-full mt-1"
                style={{ height: "200px" }} // Adjust the height as needed
                // dangerouslySetInnerHTML={{ __html:{chefData.bio} }}
              />
            </div>

            <div>
              <label className="custom_input_label">Profile Image</label>
              <p className="text-sm text-red-500 mt-1">
                Profile Image size should be width 288px and height 323px
                pixels.
              </p>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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
                Banner Image size should be width 1600px and height 529px
                pixels.
              </p>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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
