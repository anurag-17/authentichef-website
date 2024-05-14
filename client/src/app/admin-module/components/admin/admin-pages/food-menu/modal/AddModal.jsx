"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { defaultHead } from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MenuItemForm = ({ closeEditPopup, editData, updateId }) => {
  const router = useRouter();
  const { token } = useSelector((state) => state?.auth);
  const [isRefresh, setRefresh] = useState(false);
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    weight: "",
    portion_Size: "",
    Ingredients: "",
    Heating_Instruction: "",
    List_of_Ingredients: "",
    Dishtype_id: "",
    Dietary_id: "",
    spice_level_id: "",
    chef_id: "",
    ProfileImage: null, // Changed to an array to hold multiple images
  });

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleImageChange = (e) => {
    setMenuItem({
      ...menuItem,
      ProfileImage: e.target.files[0],
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
      formData.append("List_of_Ingredients", menuItem.List_of_Ingredients);

      // Append dropdown values
      formData.append("Dishtype_id", menuItem.Dishtype_id);
      formData.append("Dietary_id", menuItem.Dietary_id);
      formData.append("spice_level_id", menuItem.spice_level_id);
      formData.append("chef_id", menuItem.chef_id);

      // Append ProfileImage
      formData.append("ProfileImage", menuItem.ProfileImage);

      const response = await axios.post(
        "http://13.43.174.21:4000/api/menu/menuItems",
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
        router.push("/admin-module/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the Dish.");
    }
  };

  const [dishTypes, setDishTypes] = useState([]);

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

  const [dietaries, setDietaries] = useState([]);

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
  console.log(dietaries);

  const [spiceLevels, setSpiceLevels] = useState([]);

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

  const [chefs, setChefs] = useState([]);

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
    <form
      onSubmit={handleSubmit}
      className="max-w-10xl mx-auto border border-gray-500 rounded-xl p-6 mt-4 mb-4 flex flex-wrap"
    >
      <ToastContainer autoClose={1000} />
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
            <option value="1">Serve for I</option>
            <option value="2">Serve for II</option>
            <option value="3">Serve for III</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="ingredients">
            Ingredients:
          </label>
          <textarea
            id="ingredients"
            name="Ingredients"
            value={menuItem.Ingredients}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
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
                <option key={type._id} value={type._id}>
                  {type.title}
                </option>
              ))}
          </select>
        </div>
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
              dietaries.map((dietary) => (
                <option key={dietary._id} value={dietary._id}>
                  {dietary.title}
                </option>
              ))}
          </select>
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
        <div className="mb-4">
          <label className="block mb-1" htmlFor="heatingInstructions">
            Heating Instructions:
          </label>
          <textarea
            id="heatingInstructions"
            name="Heating_Instruction"
            value={menuItem.Heating_Instruction}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="ingredientsList">
            List of Ingredients:
          </label>
          <textarea
            id="ingredientsList"
            name="List_of_Ingredients"
            value={menuItem.List_of_Ingredients}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="w-full px-4">
        <label htmlFor="ProfileImage">Profile Image:</label>
        <input
          type="file"
          id="ProfileImage"
          name="ProfileImage"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        <p className="text-sm text-red-500 mt-1">
          Image size should be width 345px and height 278px pixels.
        </p>
      </div>

      {/* Submit button */}
      <div className="w-full px-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;
