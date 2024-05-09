import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loader/Index";

const AddModal = ({ closeModal, refreshData }) => {
  const token = JSON.parse(localStorage.getItem("admin_token"));

  const [chefData, setChefData] = useState({
    name: "",
    specialty: "",
    bio: "",
    images: null, // Changed to match key in state
  });
  const [isLoading, setLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setChefData({
        ...chefData,
        [name]: files[0], // Use files[0] for file input
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
    setLoading(true); // Set loading to true when form is submitted

    try {
      const formData = new FormData();
      formData.append("name", chefData.name);
      formData.append("specialty", chefData.specialty);
      formData.append("bio", chefData.bio);
      formData.append("images", chefData.images);

      const response = await axios.post(
        "http://13.43.174.21:4000/api/chef/chefs",
        formData,
        {
          headers: {
            authorization: `${token}`,
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
          },
        }
      );
      
      if (response.status === 201) {
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
              <span className="login-input-label capitalize"> specialty :</span>
              <input
                type="text"
                name="specialty"
                placeholder="Enter specialty"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
              />
            </div>

            <div className="py-2 ">
              <span className="login-input-label capitalize"> bio :</span>
              <input
                type="text"
                name="bio"
                placeholder="Enter chef`s bio"
                className="login-input w-full mt-1 "
                onChange={inputHandler}
              />
            </div>

            <div>
              <label className="custom_input_label">Profile Image</label>
              <input
                type="file"
                onChange={inputHandler}
                name="images" // Changed to match key in state
                className="custom_inputt"
                accept="image/*" // Limit to image files
                required
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
