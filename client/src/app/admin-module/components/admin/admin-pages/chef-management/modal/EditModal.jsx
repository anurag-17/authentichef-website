"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../loader/Index";
import config from "@/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const EditModal = ({ closeModal, editData, updateId, token, refreshData }) => {
  const [formData, setFormData] = useState({
    name: editData?.name || "",
    nationality: editData?.nationality || "",
    bio: editData?.bio || "",
    images:
      editData?.images && editData.images.length > 0 ? editData.images[0] : "", // Set the first image as default if available
    bannerImage:
      editData?.bannerImage && editData.bannerImage.length > 0
        ? editData.bannerImage[0]
        : "", // Set the first banner image as default if available
    Instagram_Link: editData?.Instagram_Link || "",
    Facebook_Link: editData?.Facebook_Link || "",
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === "images" || name === "bannerImage") {
      const fileSize = files[0]?.size || 0; // in bytes
      const maxSize = name === "bannerImage" ? 1024 * 1024 : 200 * 1024; // 1MB for bannerImage, 200KB for images

      if (fileSize > maxSize) {
        setError(
          `File size exceeds the limit. Maximum allowed size is ${
            name === "bannerImage" ? "1 MB" : "200 KB"
          }.`
        );
        return;
      }

      if (files.length === 0) {
        // No new file was selected
        setError(
          `No new ${
            name === "images" ? "profile" : "banner"
          } image was uploaded.`
        );

        // Fall back to default image
        setFormData((prevData) => ({
          ...prevData,
          [name]:
            name === "images"
              ? editData?.images && editData.images.length > 0
                ? editData.images[0]
                : ""
              : editData?.bannerImage && editData.bannerImage.length > 0
              ? editData.bannerImage[0]
              : "",
        }));
      } else {
        setFormData({
          ...formData,
          [name]: files,
        });
        setError(""); // Clear error if file size is within the limit
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setError(""); // Clear error for other inputs
    }
  };

  const handleBioChange = (value) => {
    setFormData({
      ...formData,
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
    if (
      formData.images &&
      formData.images[0] &&
      formData.images[0].size > maxImageSize
    ) {
      setError("Profile image size exceeds the limit of 200 KB.");
      setLoading(false);
      return;
    }

    if (
      formData.bannerImage &&
      formData.bannerImage[0] &&
      formData.bannerImage[0].size > maxBannerImageSize
    ) {
      setError("Banner image size exceeds the limit of 1 MB.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("nationality", formData.nationality);
      formDataToSend.append("bio", formData.bio);

      // Conditionally append images and bannerImage if they exist
      if (formData.images && formData.images[0]) {
        formDataToSend.append("images", formData.images[0]);
      } else {
        // Fallback to default image if no image is selected
        formDataToSend.append("images", editData?.images[0] || "");
      }
      if (formData.bannerImage && formData.bannerImage[0]) {
        formDataToSend.append("bannerImage", formData.bannerImage[0]);
      } else {
        // Fallback to default banner image if no image is selected
        formDataToSend.append("bannerImage", editData?.bannerImage[0] || "");
      }

      formDataToSend.append("Instagram_Link", formData.Instagram_Link);
      formDataToSend.append("Facebook_Link", formData.Facebook_Link);

      const response = await axios.put(
        `${config.baseURL}/api/chef/chefs/${updateId}`,
        formDataToSend,
        {
          headers: {
            authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Details updated successfully.");
        setLoading(false);
        refreshData();
        closeModal();
      } else {
        toast.error("Invalid details");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during category:", error);
      toast.error(error.response?.data?.error || "Server error");
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
                value={formData.name}
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
                value={formData.nationality}
                onChange={inputHandler}
                required
              />
            </div>

            <div className="py-2 mb-8">
              <span className="login-input-label capitalize"> Bio:</span>
              <ReactQuill
                value={formData.bio}
                onChange={handleBioChange}
                placeholder="Enter chef's bio"
                className="login-input w-full mt-1"
                style={{ height: "200px" }}
              />
            </div>

            {/*------------------- image -------------------*/}
            {/* Profile Image */}
            <div className="py-2">
              <span className="login-input-label capitalize">
                {" "}
                Profile Image :
              </span>
              <p className="text-sm text-red-500 mt-1">
                Profile Image size should be width 288px and height 323px pixels
                and maximum size 200kb.
              </p>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              <input
                type="file"
                name="images"
                className="login-input w-full mt-1"
                onChange={inputHandler}
                accept="image/*"
              />
              {formData.images ? (
                <img src={formData.images} alt="Profile" className="mt-4" />
              ) : editData?.images[0] ? (
                <img src={editData.images[0]} alt="Profile" className="mt-4" />
              ) : null}
            </div>

            {/* Banner Image */}
            <div className="py-2">
              <span className="login-input-label capitalize">
                {" "}
                Banner Image :
              </span>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              <p className="text-sm text-red-500 mt-1">
                Banner Image size should be width 1600px and height 529px pixels
                and maximum size 1 MB.
              </p>
              <input
                type="file"
                name="bannerImage"
                className="login-input w-full mt-1"
                onChange={inputHandler}
                accept="image/*"
              />
              {formData.bannerImage ? (
                <img src={formData.bannerImage} alt="Banner" className="mt-4" />
              ) : editData?.bannerImage[0] ? (
                <img
                  src={editData.bannerImage[0]}
                  alt="Banner"
                  className="mt-4"
                />
              ) : null}
            </div>

            {/*------------------- image -------------------*/}

            <div className="py-2 ">
              <span className="login-input-label capitalize">
                {" "}
                Instagram Link :
              </span>
              <input
                type="text"
                name="Instagram_Link"
                placeholder="Enter Instagram link"
                className="login-input w-full mt-1 "
                value={formData.Instagram_Link}
                onChange={inputHandler}
              />
            </div>

            <div className="py-2 ">
              <span className="login-input-label capitalize">
                {" "}
                Facebook Link :
              </span>
              <input
                type="text"
                name="Facebook_Link"
                placeholder="Enter Facebook link"
                className="login-input w-full mt-1 "
                value={formData.Facebook_Link}
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
                {isLoading ? "Loading.." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModal;
