import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../loader/Index";

const UpdateDietary = ({
  closeDrawerO,
  refreshData,
  editData,
  dietaryEdit,
}) => {
  const token = JSON.parse(localStorage.getItem("admin_token"));
  const [formData, setFormData] = useState(editData);
  const [profileImage, setProfileImage] = useState(null); // State to store the profile image file
  const [isLoader, setLoader] = useState(false);

  const InputHandler = (e) => {
    if (e.target.type === "file") {
      setProfileImage(e.target.files[0]); // Update profile image state
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
      formDataWithImage.append("ProfileImage", profileImage); // Append profile image to FormData
      const res = await axios.put(
        `http://localhost:4000/api/dietary/dietaries/${dietaryEdit}`,
        formDataWithImage,
        {
          headers: {
            authorization: `${token}`,
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
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
          <h2 className="custom_heading_text font-semibold">Update User</h2>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white border  rounded-lg 2xl:p-2 xl:p-2 lg:p-1 md:p-2 p-1 mx-auto"
          >
            <div>
              <input
                type="text"
                name="title"
                placeholder="Enter Dietary name"
                className="custom_inputt capitalize"
                defaultValue={formData?.title}
                onChange={InputHandler}
                required
              />
            </div>
            <div>
              <input
                type="file"
                name="profileImage" // Fixed typo here, remove extra spaces
                placeholder="Dietary image"
                className="custom_inputt capitalize"
                onChange={InputHandler}
                required
              />
            </div>

            <div className="">
              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  disabled={isLoader}
                  className="custom_btn mx-auto"
                >
                  {isLoader ? "Loading..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateDietary;
