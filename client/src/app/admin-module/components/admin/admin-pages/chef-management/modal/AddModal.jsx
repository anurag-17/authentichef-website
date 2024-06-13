import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../loader/Index";
import config from "@/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const AddModal = ({ closeModal, refreshData }) => {
  const token = JSON.parse(localStorage.getItem("admin_token"));
  const [error, setError] = useState("");
  const [renderedHTML, setRenderedHTML] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [dietaries, setDietaries] = useState([]);
  const [chefData, setChefData] = useState({
    name: "",
    nationality: "",
    Cuisines_id: [],
    dietaryType: [],
    bio: "",
    images: [],
    bannerImage: [],
    Instagram_Link: "",
    Facebook_Link: "",
    Dietary_id: [],
    popular_chef: "No",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCuisines() {
      try {
        const response = await axios.get(
          `${config.baseURL}/api/cuisines/getAllCuisines`
        );
        const { cuisines } = response.data;
        console.log("Fetched cuisines:", cuisines); // Add this log to check the fetched data

        if (Array.isArray(cuisines)) {
          setCuisines(cuisines);
        } else {
          console.error("Invalid data format for cuisines:", cuisines);
        }
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    }

    async function fetchDietaries() {
      try {
        const response = await axios.get(
          `${config.baseURL}/api/dietary/dietaries`
        );
        setDietaries(response.data.dietaries);
      } catch (error) {
        console.error("Error fetching dietaries:", error);
      }
    }

    fetchCuisines();
    fetchDietaries();
  }, []);

  const inputHandler = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "images" || name === "bannerImage") {
      if (files && files[0]) {
        const fileSize = files[0].size; // in bytes
        const maxSize = name === "bannerImage" ? 1024 * 1024 : 200 * 1024; // 1MB for bannerImage, 200KB for images

        // Check file size
        if (fileSize > maxSize) {
          setError(
            `File size exceeds the limit. Maximum allowed size is ${
              name === "bannerImage" ? "1 MB" : "200 KB"
            }.`
          );
          return;
        }

        // Validate dimensions of the profile image
        if (name === "images") {
          const img = new Image();
          img.src = URL.createObjectURL(files[0]);
          img.onload = () => {
            if (img.width !== 288 || img.height !== 323) {
              setError(
                "Profile Image size should be width 288px and height 323px pixels."
              );
            } else {
              setChefData({
                ...chefData,
                [name]: files[0],
              });
              setError(""); // Clear the error if the file size and dimensions are valid
            }
          };
          return; // Exit the handler to wait for image onload event
        }

        setChefData({
          ...chefData,
          [name]: files[0],
        });
        setError(""); // Clear the error if the file size is valid
      } else {
        setError("No file selected.");
      }
    } else if (name === "cuisineType" || name === "dietaryType") {
      // Handle multiple selections
      setChefData({
        ...chefData,
        [name]: [...chefData[name], value],
      });
    } else if (type === "checkbox") {
      setChefData({
        ...chefData,
        popular_chef: checked ? "Yes" : "No",
      });
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
      formData.append("cuisineType", JSON.stringify(chefData.cuisineType)); // Append new field
      formData.append("dietaryType", JSON.stringify(chefData.dietaryType)); // Append new field
      formData.append("bio", chefData.bio);
      formData.append("images", chefData.images);
      formData.append("bannerImage", chefData.bannerImage);
      formData.append("Instagram_Link", chefData.Instagram_Link);
      formData.append("Facebook_Link", chefData.Facebook_Link);
      formData.append("popular_chef", chefData.popular_chef); // Append new field

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

  const handleDietaryChange = (e) => {
    const { value } = e.target;
    const selectedDietary = dietaries.find((dietary) => dietary._id === value);

    if (
      selectedDietary &&
      !chefData.Dietary_id.includes(selectedDietary.title)
    ) {
      setChefData((prevState) => ({
        ...prevState,
        Dietary_id: [...prevState.Dietary_id, selectedDietary.title],
      }));
    }
  };

  const handleCuisineChange = (e) => {
    const { value } = e.target;
    const selectedCuisine = cuisines.find((cuisine) => cuisine._id === value);

    if (selectedCuisine && !chefData.Cuisines_id.includes(selectedCuisine)) {
      setChefData((prevState) => ({
        ...prevState,
        Cuisines_id: [...prevState.Cuisines_id, selectedCuisine],
      }));
    }
  };

  const removeDietary = (index) => {
    const updatedDietary = [...chefData.Dietary_id];
    updatedDietary.splice(index, 1);

    setChefData({
      ...chefData,
      Dietary_id: updatedDietary,
    });
  };

  const removeCuisine = (cuisineId) => {
    setChefData((prevState) => ({
      ...prevState,
      Cuisines_id: prevState.Cuisines_id.filter(
        (cuisine) => cuisine._id !== cuisineId
      ),
    }));
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="">
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-between px-4 lg:px-8 py-4">
            <div className="w-full lg:w-1/2 px-2">
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

              {/* New Cuisine Type Field */}
              <div className="py-2">
                <span className="login-input-label capitalize">
                  Cuisine Type :
                </span>
                <div className="grid md:grid-cols-2 flex-col gap-3 justify-between w-full px-2 py-2">
                  {Array.isArray(chefData.Cuisines_id) &&
                    chefData.Cuisines_id.length > 0 &&
                    chefData.Cuisines_id.map((cuisine, index) => (
                      <p className="flex gap-x-2 text-[14px]" key={cuisine._id}>
                        <span className="max-w-[150px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                          <b className="mr-2">{index + 1}.</b> {cuisine.title}
                        </span>
                        <span
                          className="cursor-pointer font-medium"
                          onClick={() => removeCuisine(cuisine._id)}
                        >
                          x
                        </span>
                      </p>
                    ))}
                </div>
                <select
                  name="cuisineType"
                  className="login-input w-full mt-1"
                  onChange={handleCuisineChange}
                  value=""
                >
                  <option value="">Select Cuisine</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine._id} value={cuisine._id}>
                      {cuisine.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* New Dietary Type Field */}
              <div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="dietary">
                    Dietary:
                  </label>
                  <select
                    id="dietary"
                    name="Dietary_id"
                    value=""
                    onChange={handleDietaryChange}
                    className="w-full px-3 py-2 border rounded mt-[10px]"
                  >
                    <option value="">Select Dietary</option>
                    {Array.isArray(dietaries) &&
                      dietaries.map((dietary, index) => (
                        <option key={index} value={dietary._id}>
                          {dietary.title}
                        </option>
                      ))}
                  </select>
                  <div className="grid md:grid-cols-2 flex-col gap-3 justify-between w-full px-2 py-2">
                    {Array.isArray(chefData.Dietary_id) &&
                      chefData.Dietary_id.length > 0 &&
                      chefData.Dietary_id.map((item, index) => (
                        <p className="flex gap-x-2 text-[14px]" key={index}>
                          <span className="max-w-[150px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                            <b className="mr-2">{index + 1}.</b> {item}
                          </span>
                          <span
                            className="cursor-pointer font-medium"
                            onClick={() => removeDietary(index)}
                          >
                            x
                          </span>
                        </p>
                      ))}
                  </div>
                </div>
              </div>

              <div className="py-2 mb-8">
                <span className="login-input-label capitalize"> Bio :</span>
                <ReactQuill
                  value={chefData.bio}
                  onChange={handleBioChange}
                  placeholder="Enter chef's bio"
                  className="login-input w-full mt-1"
                  style={{ height: "200px" }} // Adjust the height as needed
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 px-2">
              <div>
                <label className="custom_input_label">Profile Image</label>
                <p className="text-sm text-red-500 mt-1">
                  Profile Image size should be width 288px and height 323px
                  pixels & Size less than 200 KB.
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
                  pixels & Size less than 1 MB.
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
              <div className="mt-4">
                <label className="login-input-label capitalize">
                  Popular Chef:
                </label>
                <input
                  type="checkbox"
                  name="popular_chef"
                  checked={chefData.popular_chef === "Yes"}
                  onChange={inputHandler}
                  className="ml-2"
                />
              </div>

              <div>
                <span className="login-input-label capitalize">
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
            </div>

            <div className="w-full py-[20px] flex items-center justify-center md:justify-end gap-y-3 gap-x-3 px-2">
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
