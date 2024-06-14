"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { defaultHead } from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import config from "@/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Kufam } from "next/font/google";

const MenuItemForm = ({ closeAddPopup, updateId, refreshData }) => {
  const router = useRouter();
  const { token } = useSelector((state) => state?.auth);
  const [cuisines, setCuisines] = useState([]);

  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
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
    ProfileImage: [],
    popular_dish: "",
    Cuisines_id: "",
    nutritional_information: "",
    SKU_Number: "",
  });
  console.log(menuItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const selectedImages = files.slice(0, 5); // Limit to 5 images

    setMenuItem({
      ...menuItem,
      ProfileImage: selectedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", menuItem.name);
      formData.append("price", menuItem.price);
      formData.append("description", menuItem.description);
      formData.append("weight", menuItem.weight);
      formData.append("portion_Size", menuItem.portion_Size);
      formData.append("Ingredients", menuItem.Ingredients);
      formData.append("Heating_Instruction", menuItem.Heating_Instruction);
      formData.append("List_of_Allergens", menuItem.List_of_Allergens);
      formData.append(
        "nutritional_information",
        menuItem.nutritional_information
      );
      // Append dropdown values
      menuItem.Dietary_id.forEach((id) => {
        formData.append("Dietary_id[]", id);
      });
      formData.append("spice_level_id", menuItem.spice_level_id);
      formData.append("chef_id", menuItem.chef_id);
      formData.append("Cuisines_id", menuItem.Cuisines_id);
      formData.append("SKU_Number", menuItem.SKU_Number);
      menuItem.Nutrition_id.forEach((id) => {
        formData.append("Nutrition_id[]", id);
      });
      // Append popular_dish
      formData.append("popular_dish", menuItem.popular_dish);

      for (let i = 0; i < menuItem.ProfileImage.length; i++) {
        formData.append("ProfileImage", menuItem.ProfileImage[i]);
      }

      const response = await axios.post(
        `${config.baseURL}/api/menu/menuItems`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Dish Added Successfully!");
        refreshData();
        closeAddPopup();
        router.push("/admin-module/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        if (errorMessage.includes("SKU Number already exists")) {
          toast.error(
            "SKU Number already exists. Please use a different SKU Number."
          );
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("SKU Number already exists. Please use a different SKU Number.");
      }
    }
  };

  useEffect(() => {
    async function fetchCuisines() {
      try {
        const response = await axios.get(
          `${config.baseURL}/api/cuisines/getAllCuisines`
        );
        const { cuisines } = response.data; // Extract the cuisines array from the response
        if (Array.isArray(cuisines)) {
          setCuisines(cuisines); // Update state with fetched cuisines
          if (cuisines.length > 0) {
            setMenuItem((prevState) => ({
              ...prevState,
              Cuisines_id: cuisines[0]._id,
            }));
          }
        } else {
          console.error("Invalid data format for cuisines:", cuisines);
        }
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    }

    fetchCuisines();
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

  const [dishTypes, setDishTypes] = useState([]);

  useEffect(() => {
    async function fetchDishTypes() {
      try {
        const response = await axios.get(
          `${config.baseURL}/api/DishType/dishTypes`
        );
        setDishTypes(response.data.dishTypes);
      } catch (error) {
        console.error("Error fetching dish types:", error);
      }
    }

    fetchDishTypes();
  }, []);

  const [dietaries, setDietaries] = useState([]);

  useEffect(() => {
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

    fetchDietaries();
  }, []);

  const [spiceLevels, setSpiceLevels] = useState([]);

  useEffect(() => {
    async function fetchSpiceLevels() {
      try {
        const response = await axios.get(
          `${config.baseURL}/api/SpiceLevel/spiceLevels`
        );
        setSpiceLevels(response.data.spiceLevels);
      } catch (error) {
        console.error("Error fetching spice levels:", error);
      }
    }

    fetchSpiceLevels();
  }, []);

  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    async function fetchChefs() {
      try {
        const response = await axios.get(`${config.baseURL}/api/chef/chefs`);
        setChefs(response.data.chefs);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    }

    fetchChefs();
  }, []);

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    const newValue = checked ? "Yes" : "No";
    setMenuItem({ ...menuItem, popular_dish: newValue });
  };

  const handleDietaryChange = (e) => {
    const { value } = e.target;
    if (value && !menuItem.Dietary_id.includes(value)) {
      setMenuItem((prevState) => ({
        ...prevState,
        Dietary_id: [...prevState.Dietary_id, value],
      }));
    }
  };

  const removeDietary = (index) => {
    const updatedDietary = [...menuItem.Dietary_id];
    updatedDietary.splice(index, 1);

    setMenuItem({
      ...menuItem,
      Dietary_id: updatedDietary,
    });
  };

  const handleNutritionChange = (e) => {
    const { value } = e.target;
    if (value && !menuItem.Nutrition_id.includes(value)) {
      setMenuItem((prevState) => ({
        ...prevState,
        Nutrition_id: [...prevState.Nutrition_id, value],
      }));
    }
  };

  const removeNutrition = (index) => {
    const updatedNutrition = [...menuItem.Nutrition_id];
    updatedNutrition.splice(index, 1);
    setMenuItem({
      ...menuItem,
      Nutrition_id: updatedNutrition,
    });
  };

  const handleNutritionalInformationChange = (value) => {
    setMenuItem((prevState) => ({
      ...prevState,
      nutritional_information: value,
    }));
  };

  const handleHeatingInstructionChange = (value) => {
    setMenuItem((prevState) => ({
      ...prevState,
      Heating_Instruction: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setMenuItem((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleIngredientsChange = (value) => {
    setMenuItem((prevState) => ({
      ...prevState,
      Ingredients: value,
    }));
  };

  const handleChangeListofAllergens = (value) => {
    setMenuItem((prevState) => ({
      ...prevState,
      List_of_Allergens: value,
    }));
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <form
        onSubmit={handleSubmit}
        className="max-w-10xl mx-auto border border-gray-500 rounded-xl p-6 mt-4 mb-4 flex flex-wrap"
      >
        <div className="w-full flex justify-center text-[30px] my-4">
          <div className="font-bold">Add new Dish</div>
        </div>

        {/* Left Column */}
        <div className="w-full md:w-[50%] px-4 mb-1">
          {/* Input fields */}

          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={menuItem.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="SKUnumber">
              SKU Number
            </label>
            <input
              type="text"
              id="SKU_Number"
              name="SKU_Number"
              value={menuItem.SKU_Number}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="price">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={menuItem.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="weight">
              Weight:
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={menuItem.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="portionSize">
              Portion Size:
            </label>
            <select
              id="portionSize"
              name="portion_Size"
              value={menuItem.portion_Size}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select portion size</option>
              <option value="1">Serve for 1</option>
              <option value="2">Serve for 2</option>
              <option value="3">Serve for 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="description">
              Description:
            </label>
            <ReactQuill
              id="description"
              name="description"
              value={menuItem.description}
              onChange={handleDescriptionChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="ingredients">
              Ingredients:
            </label>
            <ReactQuill
              id="ingredients"
              name="Ingredients"
              value={menuItem.Ingredients}
              onChange={handleIngredientsChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* Checkbox for Popular Dish */}
          <div className="mb-4">
            <label className="block mb-1">
              Popular Dish:
              <input
                type="checkbox"
                name="popular_dish"
                checked={menuItem.popular_dish === "Yes"} // Check if the value is "Yes"
                onChange={handleCheckboxChange}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="nutritionalInformation">
              Nutritional Information:
            </label>
            <ReactQuill
              id="nutritionalInformation"
              value={menuItem.nutritional_information}
              onChange={handleNutritionalInformationChange}
              className="w-full border rounded"
              placeholder="Enter nutritional information"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 px-4 mt-1">
          {/* Dropdowns */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="dishType">
              Dish Type:
            </label>
            <select
              id="dishType"
              name="Dishtype_id"
              value={menuItem.Dishtype_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mt-[10px]"
              required
            >
              <option value="">Select Dish Type</option>
              {Array.isArray(dishTypes) &&
                dishTypes.map((type) => (
                  <option key={type._id} value={type._id} className="capitalize">
                    {type.title}
                  </option>
                ))}
            </select>
          </div>

          {/* <div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="dietary">
              Dietary:
            </label>
            <select
              id="dietary"
              name="Dietary_id"
              value={menuItem.Dietary_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mt-[10px]"
              required
            >
              <option value="">Select Dietary</option>
              {Array.isArray(dietaries) &&
                dietaries.map((dietary, inx) => (
                  <option key={inx} value={dietary._id}>
                    {dietary.title}
                  </option>
                ))}
            </select>
            <div className="grid md:grid-cols-2 flex-col gap-3 justify-between w-full px-2 py-2">
              {Array.isArray(menuItem) &&
                menuItem?.Dietary_id?.length > 0 &&
                menuItem?.Dietary_id?.map((item, inx) => (
                  <p className="flex gap-x-2 text-[14px]" key={inx}>
                    <span className="max-w-[150px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                      <b className="mr-2">{inx + 1}.</b> {item}
                    </span>
                    <span
                      className="cursor-pointer font-medium"
                      onClick={() => removeDietary(inx)}
                    >
                      x
                    </span>
                  </p>
                ))}
            </div>
          </div>
        </div> */}

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
                  <option key={index} value={dietary._id} className="capitalize">
                    {dietary.title}
                  </option>
                ))}
            </select>
            <div className="grid md:grid-cols-2 flex-col gap-3 justify-between w-full px-2 py-2">
              {Array.isArray(menuItem.Dietary_id) &&
                menuItem.Dietary_id.length > 0 &&
                menuItem.Dietary_id.map((item, index) => (
                  <p className="flex gap-x-2 text-[14px]" key={index}>
                    <span className="max-w-[150px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                      <b className="mr-2">{index + 1}.</b>{" "}
                      {
                        dietaries.find(
                          (dietaryItem) => dietaryItem._id === item
                        )?.title
                      }
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

          <div className="mb-4">
            <label className="block mb-1" htmlFor="nutrition">
              Nutrition:
            </label>
            <select
              id="nutrition"
              name="Nutrition_id"
              value=""
              onChange={handleNutritionChange}
              className="w-full px-3 py-2 border rounded mt-[10px]"
            >
              <option value="">Select Nutrition</option>
              {Array.isArray(nutrition) &&
                nutrition.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.Nutritional}
                  </option>
                ))}
            </select>
            <div className="grid md:grid-cols-2 flex-col gap-3 justify-between w-full px-2 py-2">
              {Array.isArray(menuItem.Nutrition_id) &&
                menuItem.Nutrition_id.length > 0 &&
                menuItem.Nutrition_id.map((item, index) => (
                  <p className="flex gap-x-2 text-[14px]" key={index}>
                    <span className="max-w-[150px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                      <b className="mr-2">{index + 1}.</b>{" "}
                      {/* Assuming the item here is the nutrition value */}
                      {
                        nutrition.find(
                          (nutritionItem) => nutritionItem._id === item
                        )?.Nutritional
                      }
                    </span>
                    <span
                      className="cursor-pointer font-medium"
                      onClick={() => removeNutrition(index)}
                    >
                      x
                    </span>
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="spiceLevel">
              Spice Level:
            </label>
            <select
              id="spiceLevel"
              name="spice_level_id"
              value={menuItem.spice_level_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mt-[10px]"
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
          <div className="mb-4">
            <label className="block mb-1" htmlFor="chef">
              Chef:
            </label>
            <select
              id="chef"
              name="chef_id"
              value={menuItem.chef_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mt-[10px]"
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
          {cuisines.length > 0 && (
            <div className="mb-4">
              <label className="block mb-1" htmlFor="cuisine_id">
                Cuisine:
              </label>
              <select
                id="cuisine_id"
                name="Cuisines_id" // Change name to "Cuisines_id" to match the state property name
                value={menuItem.Cuisines_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Select Cuisine</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine._id} value={cuisine._id}>
                    {cuisine.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1" htmlFor="heatingInstructions">
              Heating Instructions:
            </label>
            {/* <textarea
            id="heatingInstructions"
            name="Heating_Instruction"
            value={menuItem.Heating_Instruction}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          /> */}
            <ReactQuill
              id="heatingInstructions"
              value={menuItem.Heating_Instruction}
              onChange={handleHeatingInstructionChange}
              className="w-full border rounded"
              placeholder="Enter Heating Instruction"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="ingredientsList">
              List of Allergens:
            </label>
            {/* <textarea
            id="ingredientsList"
            name="List_of_Allergens"
            value={menuItem.List_of_Allergens}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          /> */}
            <ReactQuill
              id="ingredientsList"
              name="List_of_Allergens"
              value={menuItem.List_of_Allergens}
              onChange={handleChangeListofAllergens}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="w-full px-4">
          <label htmlFor="ProfileImages">Profile Images: </label>
          <input
            type="file"
            id="ProfileImages"
            name="ProfileImages"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            required
            className="mx-2"
          />
          <p className="text-sm text-red-500 mt-1">
            Image size should be width 345px and height 278px pixels.
          </p>
        </div>

        <div className="w-full px-4 mt-4">
          <button type="submit" className=" px-4 py-2 rounded primary_btn">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default MenuItemForm;
