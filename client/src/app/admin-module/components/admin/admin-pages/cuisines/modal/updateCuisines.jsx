"use client"
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../loader/Index";

const UpdateCuisines = ({
  closeDrawerO,
  refreshData,
  editData,
  dietaryEdit,
}) => {
  const token = JSON.parse(localStorage.getItem("admin_token"));
  const [formData, setFormData] = useState(editData);
  const [ProfileImage, setProfileImage] = useState(null); // State to store the profile image file
  const [isLoader, setLoader] = useState(false);

  const InputHandler = (e) => {
    if (e.target.type === "file") {
      setProfileImage(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const formDataWithImage = new FormData();
      formDataWithImage.append("title", formData.title);
      if (ProfileImage) {
        formDataWithImage.append("ProfileImage", ProfileImage);
      }
      const res = await axios.put(
        `http://13.43.174.21:4000/api/cuisines/updateCuisines/${dietaryEdit}`,
        formDataWithImage,
        {
          headers: {
            authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Details updated successfully.");
        closeDrawerO();
        refreshData();
      } else {
        toast.error("Invalid details");
      }
    } catch (error) {
      console.error("Error during category:", error);
      toast.error(error.response?.data?.error || "Server error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <section>
        <div className="flex justify-center items-center border border-[#f3f3f3] rounded-lg bg-white 2xl:px-5 2xl:h-[50px] 2xl:my-5 xl:px-4 xl:h-[40px] xl:my-4 lg:px-3 lg:h-[35px] lg:my-2 md:px-2 md:h-[30px] md:my-2 sm:px-1 sm:h-[25px] sm:my-2 px-1 h-[25px] my-2">
          <h2 className="custom_heading_text font-semibold">Update Cuisine</h2>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-lg p-2 mx-auto"
          >
            <div>
              <input
                type="text"
                name="title"
                placeholder="Enter Cuisine name"
                className="custom_inputt capitalize"
                defaultValue={formData?.title}
                onChange={InputHandler}
                required
              />
            </div>
            <div>
              <input
                type="file"
                name="ProfileImage"
                className="custom_inputt capitalize"
                onChange={InputHandler}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoader}
                className="custom_btn mt-2"
              >
                {isLoader ? "Loading..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateCuisines;
