"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";

const AddDietary = ({ closeDrawer, refreshData }) => {
 const { token } = useSelector((state) => state?.auth);

  const [dietaryDetail, setDietaryDetail] = useState({
    title: "",
    ProfileImage: null, // Changed to null
  });
  const [isLoader, setLoader] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true)
      const formData = new FormData();
      formData.append("title", dietaryDetail.title);
      formData.append("ProfileImage", dietaryDetail.ProfileImage); // Append image to FormData

      const response = await axios.post(
        "http://13.43.174.21:4000/api/dietary/dietaries",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Changed content type
          },
        }
      );

      if (response.status === 201) {
        toast.success("Dietary Added Successfully!");
        refreshData();
        closeDrawer();
      setLoader(false)

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
      // Changed to match key in state
      setDietaryDetail({
        ...dietaryDetail,
        ProfileImage: files[0], // Set the selected image file
      });
    } else {
      setDietaryDetail({
        ...dietaryDetail,
        [name]: value,
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
            <label className="custom_input_label">Dietary Name</label>
            <input
              onChange={inputHandler}
              value={dietaryDetail.title}
              type="text"
              name="title"
              className="custom_inputt"
              required
            />
          </div>
          <div>
            <label className="custom_input_label">Profile Image</label>
            <input
              type="file"
              onChange={inputHandler}
              name="ProfileImage" // Changed to match key in state
              className="custom_inputt"
              accept="image/*" // Limit to image files
              required
            />
          </div>
         
          <div className="flex justify-center w-full">
            <button
              type="submit"
              disabled={isLoader}
              className="custom_btn mx-auto"
            >
              {isLoader ? "Loading..." : "Add Dietary"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDietary;
