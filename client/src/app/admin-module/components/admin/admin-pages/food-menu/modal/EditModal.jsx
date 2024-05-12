import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../loader/Index";
import { useSelector } from "react-redux";

const EditModal = ({ closeModal, refreshData, editData, updateId }) => {
 // const { token } = useSelector((state) => state?.auth);

  const [formData, setFormData] = useState();
  const [image, setImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [imageDisable, setImageDisable] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [imageView, setImageview] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);

  console.log(formData)
  const handleVideo = (vid) => {
    setImageview(vid);
    setOpenImage(true);
  };

  const removeVideo = (videoUrl) => {
    // setLoading(true);
    setEdit({ ...edit, [`image`]: "" });
    setImageRemoved(true);
    return;
    const options = {
      method: "DELETE",
      url: `/api/pages/`,
      data: {
        image: videoUrl,
      },
      headers: {
        authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Removed successfully !");
          refreshData();
        } else {
          setLoading(false);
          toast.error("Failed. something went wrong!");
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed. something went wrong!");
      });
  };

  const InputHandler = (e) => {
    if (e.target.name === "image") {
      setImage({ file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const uploadImage = async () => {

  console.log(formData)
  return;

    setImageUploading(true);
    try {
      if (!image) {
        setImageUploading(false);
        return toast.warn("Please upload Image");
      }

      const response = await axios.post(`/api/auth/upload`, image, {
        headers: {
          authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        const videoUrl = response?.data?.url;
        setFormData({ ...formData, ["image"]: videoUrl });
        setImageDisable(true);
        setImageUploading(false);
      } else {
        setImageDisable(false);
        setImageUploading(false);
      }
    } catch (error) {
      console.error(
        "Error uploading Image:",
        error.response?.data || error.message
      );
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.images?.length<1) {
      toast.error("Please upload Image");
    } else {
      // console.log(formData);
      setLoading(true);
      try {
        const res = await axios.put(`http://13.43.174.21:4000/api/menu/menuItems/${updateId}`, formData, {
          headers: {
            authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(res);
        if (res.status === 200) {
          toast.success("Details updated successfully.");
          setLoading(false);
          refreshData();
          closeModal();
        }  else {
          toast.error("Invalid details");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during category:", error);
        toast.error( error.response?.data?.error || "Server error");
        setLoading(false);
      }
    }
  };

  return (
    <>
      {imageUploading && <Loader />}
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
                defaultValue={editData?.name}
                onChange={InputHandler}
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
                defaultValue={editData?.specialty}
                onChange={InputHandler}
                // required
              />
            </div>

            <div className="py-2 ">
              <span className="login-input-label capitalize"> bio :</span>
              <input
                type="text"
                name="bio"
                placeholder="Enter chef`s bio"
                className="login-input w-full mt-1 "
                defaultValue={editData?.bio}
                onChange={InputHandler}
                // required
              />
            </div>

            {/*------------------- image -------------------*/}
            <div className="py-2 mt-1 flex  items-end gap-x-10">
              <div className="w-[50%]">
                <span className="login-input-label cursor-pointer mb-1">
                  Images :
                </span>

                {editData?.image !== "" && !imageRemoved && (
                  <div className="p-1 flex">
                    <div
                      className={`text-[14px] font-[400] cursor-pointer text-[blue] whitespace-nowrap`}
                      onClick={() => handleVideo(editData?.image)}
                    >
                      background video
                    </div>
                    <button
                      type="button"
                      className={`text-[14px] px-4 font-[400] border rounded h-[25px] text-[red] hover:bg-[#efb3b38a] ml-4`}
                      onClick={() => removeVideo(editData?.image)}
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="flex items-center  w-full mt-1">
                  <input
                    id="image"
                    type="file"
                    name="image"
                    className="w-full"
                    onChange={InputHandler}
                    accept="video/mp4,video/x-m4v,video/*"
                    disabled={imageDisable}
                  />
                </div>
              </div>
              <div className="">
                <button
                  className={`focus-visible:outline-none  text-white text-[13px] px-4 py-1 rounded
                            ${imageDisable ? "bg-[green]" : "bg-[#070708bd]"}`}
                  type="button"
                  onClick={uploadImage}
                  disabled={imageDisable || imageUploading}
                >
                  {imageDisable
                    ? "Uploaded"
                    : imageUploading
                    ? "Loading.."
                    : "Upload"}
                </button>
              </div>
            </div>
            {/*------------------- image -------------------*/}

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
