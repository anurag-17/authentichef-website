"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "@/app/admin-module/components/admin/loader/Index";

const EditModal = ({ params }) => {
  const { token } = useSelector((state) => state?.auth);
  const id = params.slug;
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    weight: "",
    portion_Size: "",
    Ingredients: "",
    Heating_Instruction: "",
    List_of_Ingredients: "",
    Dishtype_id: "",
    Dietary_id: "",
    spice_level_id: "",
    chef_id: "",
    ProfileImage: "",
  });

  const [image, setImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [imageDisable, setImageDisable] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [imageView, setImageview] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [editData, setEditData] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [dishTypes, setDishTypes] = useState([]);
  const [dietaries, setDietaries] = useState([]);
  const [spiceLevels, setSpiceLevels] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    if (!params) return;
    axios
      .get(`http://13.43.174.21:4000/api/menu/menuItems/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        setFormData({
          name: data.name,
          price: data.price,
          description: data.description,
          weight: data.weight,
          portion_Size: data.portion_Size,
          Ingredients: data.Ingredients,
          Heating_Instruction: data.Heating_Instruction,
          List_of_Ingredients: data.List_of_Ingredients,
          Dishtype_id: data.Dishtype_id._id, // Assign the _id value from the nested object
          Dietary_id: data.Dietary_id._id, // Assign the _id value from the nested object
          spice_level_id: data.spice_level_id._id, // Assign the _id value from the nested ob   ject
          chef_id: data.chef_id._id, 
          ProfileImage: data.ProfileImage || null,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error fetching data
      });
  }, [params.slug, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, ProfileImage: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpdate = (e) => {
    e.preventDefault();
    const profileImageInput = document.getElementById("profileImageInput");
    if (profileImageInput) {
      profileImageInput.click();
    } else {
      console.error("Profile Image Input not found.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData(); 
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("weight", formData.weight);
      formDataToSend.append("portion_Size", formData.portion_Size);
      formDataToSend.append("Ingredients", formData.Ingredients);
      formDataToSend.append(
        "Heating_Instruction",
        formData.Heating_Instruction
      );
      formDataToSend.append(
        "List_of_Ingredients",
        formData.List_of_Ingredients
      );
      formDataToSend.append("Dishtype_id", formData.Dishtype_id);
      formDataToSend.append("Dietary_id", formData.Dietary_id);
      formDataToSend.append("spice_level_id", formData.spice_level_id);
      formDataToSend.append("chef_id", formData.chef_id);
      formDataToSend.append("ProfileImage", formData.ProfileImage);

      const response = await axios.put(
        `http://13.43.174.21:4000/api/menu/menuItems/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Item updated successfully");
        // Perform any additional actions needed after successful update
      } else {
        toast.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("An error occurred while updating item");
    } finally {
      setLoading(false);
    }
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

  const fetchDishTypes = async () => {
    try {
      const response = await axios.get(
        "http://13.43.174.21:4000/api/dishTypes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDishTypes(response.data);
    } catch (error) {
      console.error("Error fetching dish types:", error);
      // Handle error fetching dish types
    }
  };

  const uploadImage = async () => {
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

  useEffect(() => {
    async function fetchDishTypes() {
      try {
        const response = await axios.get(
          "http://13.43.174.21:4000/api/DishType/dishTypes"
        );
        setDishTypes(response.data.dishTypes);
      } catch (error) {
        console.error("Error fetching dish types:", error);
      } finally {
        // setLoading(false);
      }
    }

    fetchDishTypes();
  }, []);

  useEffect(() => {
    async function fetchDietaries() {
      try {
        const response = await axios.get(
          "http://13.43.174.21:4000/api/dietary/dietaries"
        );
        setDietaries(response.data.dietaries);
      } catch (error) {
        console.error("Error fetching dietaries:", error);
      }
    }

    fetchDietaries();
  }, []);

  useEffect(() => {
    async function fetchSpiceLevels() {
      try {
        const response = await axios.get(
          "http://13.43.174.21:4000/api/SpiceLevel/spiceLevels"
        );
        setSpiceLevels(response.data.spiceLevels); // Update state with response data
      } catch (error) {
        console.error("Error fetching spice levels:", error);
      }
    }

    fetchSpiceLevels();
  }, []);

  useEffect(() => {
    async function fetchChefs() {
      try {
        const response = await axios.get(
          "http://13.43.174.21:4000/api/chef/chefs"
        );
        setChefs(response.data.chefs);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    }

    fetchChefs();
  }, []);

  return (
    <>
      <ToastContainer autoClose={1000} />
      {imageUploading && <Loader />}
      <div class="flex justify-center">
        <div class="w-full lg:w-1/2">
          <form action="" class="px-4 lg:px-8 py-4" onSubmit={handleSubmit}>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div class="py-2">
                <span class="login-input-label capitalize"> Name :</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter dish name"
                  class="login-input w-full mt-1"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize"> Price :</span>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  class="login-input w-full mt-1"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize"> Weight :</span>
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter weight"
                  class="login-input w-full mt-1"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize">
                  {" "}
                  Portion Size :
                </span>
                <input
                  type="text"
                  name="portion_Size"
                  placeholder="Enter portion size"
                  class="login-input w-full mt-1"
                  value={formData.portion_Size}
                  onChange={handleChange}
                  required
                />
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize"> Description :</span>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  class="login-input w-full mt-1"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize"> Ingredients :</span>
                <textarea
                  name="Ingredients"
                  placeholder="Enter ingredients"
                  class="login-input w-full mt-1"
                  value={formData.Ingredients}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize"> Dish Type :</span>
                <select
                  name="Dishtype_id"
                  value={formData.Dishtype_id}
                  onChange={handleChange}
                  class="login-input w-full mt-1"
                  required
                >
                  <option value="">Select Dish Type</option>
                  {Array.isArray(dishTypes) &&
                    dishTypes.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.title}
                      </option>
                    ))}
                </select>
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize"> Dietary :</span>
                <select
                  name="Dietary_id"
                  value={formData.Dietary_id}
                  onChange={handleChange}
                  class="login-input w-full mt-1"
                  required
                >
                  <option value="">Select Dietary</option>
                  {Array.isArray(dietaries) &&
                    dietaries.map((dietary) => (
                      <option key={dietary._id} value={dietary._id}>
                        {dietary.title}
                      </option>
                    ))}
                </select>
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize"> Spice Level :</span>
                <select
                  name="spice_level_id"
                  value={formData.spice_level_id}
                  onChange={handleChange}
                  class="login-input w-full mt-1"
                  required
                >
                  <option value="">Select Spice Level</option>
                  {spiceLevels.map((spiceLevel) => (
                    <option key={spiceLevel._id} value={spiceLevel._id}>
                      {spiceLevel.title}
                    </option>
                  ))}
                </select>
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize"> Chef :</span>
                <select
                  name="chef_id"
                  value={formData.chef_id}
                  onChange={handleChange}
                  class="login-input w-full mt-1"
                  required
                >
                  <option value="">Select Chef</option>
                  {chefs.map((chef) => (
                    <option key={chef._id} value={chef._id}>
                      {chef.name}
                    </option>
                  ))}
                </select>
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize">
                  Heating Instructions :
                </span>
                <textarea
                  name="Heating_Instruction"
                  placeholder="Enter heating instructions"
                  class="login-input w-full mt-1"
                  value={formData.Heating_Instruction}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize">
                  List of Ingredients :
                </span>
                <textarea
                  name="List_of_Ingredients"
                  placeholder="Enter list of ingredients"
                  class="login-input w-full mt-1"
                  value={formData.List_of_Ingredients}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize">
                  Profile Image :
                </span>
                <div className="flex items-center">
                  {formData.ProfileImage ? (
                    <img
                      src={formData.ProfileImage}
                      alt="Profile"
                      className="login-input w-full mt-1"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "375px",
                      }}
                    />
                  ) : (
                    <input
                      type="file"
                      id="profileImageInput"
                      name="ProfileImage"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  )}
                  <button
                    type="button"
                    onClick={handleProfileImageUpdate}
                    className="primary_btn ml-4"
                  >
                    Update Profile Photo
                  </button>
                </div>
              </div>
            </div>

            <div class="py-4 flex justify-center md:justify-end md:flex-nowrap gap-y-3 gap-x-3">
              <button
                type="button"
                class="secondary_btn w-full"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                class="primary_btn w-full"
              >
                {isLoading ? "Loading.." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
