"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "@/app/admin-module/components/admin/loader/Index";
import config from "@/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const EditModal = ({
  closeEditPopup,
  refreshData,
  editData,
  updateId,
  token,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    weight: "",
    portion_Size: "",
    Ingredients: "",
    Heating_Instruction: "",
    List_of_Allergens: "",
    Dishtype_id: "",
    Dietary_id: [],
    Nutrition_id: [],
    spice_level_id: "",
    chef_id: "",
    ProfileImage: "",
    nutritional_information: "",
  });

  console.log(formData);

  const [isLoading, setLoading] = useState(false);
  const [dishTypes, setDishTypes] = useState([]);
  const [dietaries, setDietaries] = useState([]);
  const [spiceLevels, setSpiceLevels] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        price: editData.price || "",
        description: editData.description || "",
        weight: editData.weight || "",
        portion_Size: editData.portion_Size || "",
        Ingredients: editData.Ingredients || "",
        Heating_Instruction: editData.Heating_Instruction || "",
        List_of_Allergens: editData.List_of_Allergens || "",
        Dishtype_id: editData.Dishtype_id ? editData.Dishtype_id._id : "",
        Dietary_id: editData.Dietary_id ? editData.Dietary_id.map(d => d._id) : [],
        Nutrition_id: editData.Nutrition_id ? editData.Nutrition_id.map(n => n._id) : [],
        nutritional_information: editData.nutritional_information,
        spice_level_id: editData.spice_level_id
          ? editData.spice_level_id._id
          : "",
        chef_id: editData.chef_id ? editData.chef_id._id : "",
        ProfileImage: editData.ProfileImage || null,
      });
    }
  }, [editData]);

  useEffect(() => {
    async function fetchDishTypes() {
      try {
        const response = await axios.get(`${config.baseURL}/api/dishTypes`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setDishTypes(response.data);
      } catch (error) {
        console.error("Error fetching dish types:", error);
      }
    }

    fetchDishTypes();
  }, [token]);

  useEffect(() => {
    async function fetchDietaries() {
      try {
        const response = await axios.get(
          `${config.baseURL}/api/dietary/dietaries`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setDietaries(response.data.dietaries);
      } catch (error) {
        console.error("Error fetching dietaries:", error);
      }
    }

    fetchDietaries();
  }, [token]);

  useEffect(() => {
    async function fetchSpiceLevels() {
      try {
        const response = await axios.get(
          `${config.baseURL}/api/SpiceLevel/spiceLevels`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setSpiceLevels(response.data.spiceLevels);
      } catch (error) {
        console.error("Error fetching spice levels:", error);
      }
    }

    fetchSpiceLevels();
  }, [token]);

  useEffect(() => {
    async function fetchChefs() {
      try {
        const response = await axios.get(`${config.baseURL}/api/chef/chefs`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setChefs(response.data.chefs);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    }

    fetchChefs();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Dietary_id" || name === "Nutrition_id") {
      if (value && !formData[name].includes(value)) {
        setFormData(prevState => ({
          ...prevState,
          [name]: [...prevState[name], value]
        }));
      }
    } else if (name === "ProfileImage") {
      const file = e.target.files[0];
      setFormData(prevState => ({ ...prevState, ProfileImage: file }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const removeDietary = (index) => {
    setFormData({
      ...formData,
      Dietary_id: formData.Dietary_id.filter((_, i) => i !== index),
    });
  };

  const removeNutrition = (index) => {
    setFormData({
      ...formData,
      Nutrition_id: formData.Nutrition_id.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formDataToSend = new FormData();
  
      // Append other form data
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("weight", formData.weight);
      formDataToSend.append("portion_Size", formData.portion_Size);
      formDataToSend.append("Ingredients", formData.Ingredients);
      formDataToSend.append("Heating_Instruction", formData.Heating_Instruction);
      formDataToSend.append("List_of_Allergens", formData.List_of_Allergens);
      formDataToSend.append("Dishtype_id", formData.Dishtype_id);
      formDataToSend.append("spice_level_id", formData.spice_level_id);
      formDataToSend.append("chef_id", formData.chef_id);
      formDataToSend.append("nutritional_information", formData.nutritional_information);
  
      // Append each Dietary_id
      formData.Dietary_id.forEach((id, index) => {
        formDataToSend.append(`Dietary_id[${index}]`, id);
      });
  
      // Append each Nutrition_id
      formData.Nutrition_id.forEach((id, index) => {
        formDataToSend.append(`Nutrition_id[${index}]`, id);
      });
  
      // Append ProfileImage if available
      if (formData.ProfileImage) {
        formDataToSend.append("ProfileImage", formData.ProfileImage);
      }
  
      const response = await axios.put(
        `${config.baseURL}/api/menu/menuItems/${updateId}`,
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
        refreshData();
        closeEditPopup();
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
  const handleNutritionalChange = (value) => {
    setFormData({
      nutritional_information: value,
    });
  };

  useEffect(() => {
    async function fetchDishTypes() {
      try {
        const response = await axios.get(
          `${config.baseURL}/api/DishType/dishTypes`
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

  const [nutrition, setNutrition] = useState([]);

  useEffect(() => {
    defaultNutrition();
  }, []);

  const defaultNutrition = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/Nutritional/nutritional`,
    };
    axios
      .request(option)
      .then((response) => {
        setNutrition(response?.data?.nutritional);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div class="flex justify-center">
        <div class="w-full">
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
                <select
                  name="portion_Size"
                  class="login-input w-full mt-1"
                  value={formData.portion_Size}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select portion size</option>
                  <option value="1">Serve for I</option>
                  <option value="2">Serve for II</option>
                  <option value="3">Serve for III</option>
                </select>
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

              <div className="py-2">
                <span className="login-input-label capitalize">Dietary:</span>
                <select
                  name="Dietary_id"
                  value={formData.Dietary_id[formData.Dietary_id.length - 1] || ""}
                  onChange={handleChange}
                  className="login-input w-full mt-1"
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
                <div className="grid md:grid-cols-2 flex-col gap-3 justify-between w-full px-2 py-2">
                  {formData.Dietary_id.map((dietaryId, index) => {
                    const dietary = dietaries.find(d => d._id === dietaryId);
                    return dietary ? (
                      <p className="flex gap-x-2 text-[14px]" key={index}>
                        <span className="max-w-[150px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                          <b className="mr-2">{index + 1}.</b> {dietary.title}
                        </span>
                        <span
                          className="cursor-pointer font-medium"
                          onClick={() => removeDietary(index)}
                        >
                          x
                        </span>
                      </p>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="py-2">
                <span className="login-input-label capitalize">Nutrition:</span>
                <select
                  name="Nutrition_id"
                  value={formData.Nutrition_id[formData.Nutrition_id.length - 1] || ""}
                  onChange={handleChange}
                  className="login-input w-full mt-1"
                  required
                >
                  <option value="">Select Nutrition</option>
                  {Array.isArray(nutrition) &&
                    nutrition.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.Nutritional}
                      </option>
                    ))}
                </select>
                <div className="grid md:grid-cols-2 flex-col gap-3 justify-between w-full px-2 py-2">
                  {formData.Nutrition_id.map((nutritionId, index) => {
                    const nutritionItem = nutrition.find(n => n._id === nutritionId);
                    return nutritionItem ? (
                      <p className="flex gap-x-2 text-[14px]" key={index}>
                        <span className="max-w-[150px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                          <b className="mr-2">{index + 1}.</b> {nutritionItem.Nutritional}
                        </span>
                        <span
                          className="cursor-pointer font-medium"
                          onClick={() => removeNutrition(index)}
                        >
                          x
                        </span>
                      </p>
                    ) : null;
                  })}
                </div>
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
                  List of Allergens :
                </span>
                <textarea
                  name="List_of_Allergens"
                  placeholder="Enter list of ingredients"
                  class="login-input w-full mt-1"
                  value={formData.List_of_Allergens}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block mb-1" htmlFor="nutritionalInformation">
                  Nutritional Information:
                </label>
                <ReactQuill
                  value={formData.nutritional_information}
                  onChange={handleNutritionalChange}
                  placeholder="Enter chef's bio"
                  className="login-input w-full mt-1"
                  style={{ height: "200px" }}
                />
              </div>

              <div class="py-2">
                <span class="login-input-label capitalize">
                  Profile Image :
                </span>
                <div className="flex items-center">
                  <div className="w-full px-4">
                    <label htmlFor="ProfileImage">Profile Image:</label>
                    <input
                      type="file"
                      id="ProfileImage"
                      name="ProfileImage"
                      onChange={handleChange}
                      accept="image/*"
                    />
                    <p className="text-sm text-red-500 mt-1">
                      Image size should be width 345px and height 278px pixels.
                    </p>
                  </div>
                </div>
                {/* Display selected image */}
                <div className="flex items-center mt-4">
                  <img
                    src={formData.ProfileImage}
                    alt="Selected Profile"
                    className={`login-input w-full mt-1 ${formData.ProfileImage ? "" : "hidden"
                      }`}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "375px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div class="py-4 flex justify-center md:justify-end md:flex-nowrap gap-y-3 gap-x-3">
              <button
                type="button"
                class="secondary_btn w-full"
                onClick={closeEditPopup}
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
