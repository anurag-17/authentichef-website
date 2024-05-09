"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddModal = ({ closeAddPopup, refreshData }) => {
  const token = JSON.parse(localStorage.getItem("admin_token"));
  const [dishDetails, setDishDetails] = useState({
    name: "",
    price: "",
    description: "",
    ProfileImage: null, // Changed to null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", dishDetails.name); // Changed to name
      formData.append("price", dishDetails.price); // Added price
      formData.append("description", dishDetails.description); // Added description
      formData.append("ProfileImage", dishDetails.ProfileImage);

      const response = await axios.post(
        "http://localhost:4000/api/menu/menuItems",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Dietary Added Successfully!");
        refreshData();
        closeAddPopup();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the Dietary.");
    }
  };

  const inputHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === "ProfileImage") {
      setDishDetails({
        ...dishDetails,
        ProfileImage: files[0],
      });
    } else {
      setDishDetails({
        ...dishDetails,
        [name]: value, // Use name instead of e.target.value
      });
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className=" mx-auto">
        <div className="flex justify-center items-center border border-[#f3f3f3] rounded-lg bg-white 2xl:px-5  2xl:h-[50px] 2xl:my-5 xl:px-4  xl:h-[40px] xl:my-4 lg:px-3  lg:h-[35px] lg:my-2 md:px-2  md:h-[30px] md:my-2 sm:px-1 sm:h-[25px] sm:my-2 px-1 h-[25px] my-2">
          <h2 className="custom_heading_text font-semibold">Add New Dietary</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap bg-white border rounded-lg 2xl:p-2 xl:p-2 lg:p-1 md:p-2 p-1 mx-auto"
        >
          <div className="w-1/2">
            <label className="custom_input_label">Dish Name</label>
            <input
              onChange={inputHandler}
              value={dishDetails.name}
              type="text"
              name="name"
              className="custom_inputt"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="custom_input_label">Dish Price</label>
            <input
              onChange={inputHandler}
              value={dishDetails.price}
              type="text"
              name="price"
              className="custom_inputt"
              required
            />
          </div>
          <div className="w-full">
            <label className="custom_input_label">Dish Description</label>
            <input
              onChange={inputHandler}
              value={dishDetails.description}
              type="text"
              name="description"
              className="custom_inputt"
              required
            />
          </div>
          <div className="w-full">
            <label className="custom_input_label">Profile Image</label>
            <input
              type="file"
              onChange={inputHandler}
              name="ProfileImage"
              className="custom_inputt"
              accept="image/*"
              required
            />
          </div>
          <div className="w-full flex justify-center">
            <button type="submit" className="custom_btn">
              Add Dish
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddModal;
