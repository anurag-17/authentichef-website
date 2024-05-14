import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../loader/Index";

const EditModal = ({ closeModal, refreshdata, editData, updateId, token }) => {
  const [formData, setFormData] = useState({
    name: editData?.name || "",
    specialty: editData?.specialty || "",
    bio: editData?.bio || "",
    images: editData?.images[0] || "", // Set the first image as default
    bannerImage: editData?.bannerImage[0] || "", // Set the first banner image as default
    Instagram_Link: editData?.Instagram_Link || "",
    Facebook_Link: editData?.Facebook_Link || "",
  });
  const [isLoading, setLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === "images" || name === "bannerImage") {
      const fileSize = files[0].size; // in bytes
      const maxSize = 200 * 1024; // 200KB for images
      if (fileSize > maxSize) {
        toast.error(
          `File size exceeds the limit. Maximum allowed size is 200 KB.`
        );
        return;
      }

      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("specialty", formData.specialty);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("images", formData.images);
      formDataToSend.append("bannerImage", formData.bannerImage);
      formDataToSend.append("Instagram_Link", formData.Instagram_Link);
      formDataToSend.append("Facebook_Link", formData.Facebook_Link);

      const response = await axios.put(
        `http://13.43.174.21:4000/api/chef/chefs/${updateId}`,
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
        refreshdata();
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
              <span className="login-input-label capitalize"> Nationality :</span>
              <input
                type="text"
                name="specialty"
                placeholder="Enter Nationality"
                className="login-input w-full mt-1 "
                value={formData.specialty}
                onChange={inputHandler}
                required
              />
            </div>

            <div className="py-2 ">
              <span className="login-input-label capitalize"> bio :</span>
              <input
                type="text"
                name="bio"
                placeholder="Enter chef`s bio"
                className="login-input w-full mt-1 "
                value={formData.bio}
                onChange={inputHandler}
                required
              />
            </div>

            {/*------------------- image -------------------*/}
            {/* Profile Image */}
            <div className="py-2 ">
              <span className="login-input-label capitalize"> Profile Image :</span>
              <input
                type="file"
                name="images"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
                accept="image/*"
              />
              {formData.images && (
                <img src={formData.images} alt="Profile" />
              )}
            </div>

            {/* Banner Image */}
            <div className="py-2 ">
              <span className="login-input-label capitalize"> Banner Image :</span>
              <input
                type="file"
                name="bannerImage"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
                accept="image/*"
              />
              {formData.bannerImage && (
                <img src={formData.bannerImage} alt="Banner" />
              )}
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
                {isLoading ? "Loading.." : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModal;
