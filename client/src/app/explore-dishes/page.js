"use client"
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import emptyCart from "../../../public/images/emptyCart.svg";
import Link from "next/link";
import Image from "next/image";
import cuisineindia from "../assets/cuisine-india.png";
import cuisineamerican from "../assets/cuisine-american.png";
import cuisinemexican from "../assets/cuisine-mexican.png";
import cuisinemediterranean from "../assets/cuisine-mediterranean.png";
import cuisineitalian from "../assets/cuisine-italian.png";
import cuisinemiddleEastern from "../assets/cuisine-middleEastern.png";
import cuisinesoutheast from "../assets/cuisine-southeast-asian.png";
import addCart from "../../../public/images/addCart.svg";
import p1 from "../assets/ellipse119.png";
import vegetarian from "./assets/vegetarian.svg";
import vegan from "./assets/vegan.svg";
import popimg from "./assets/pop-img.png";
import spicemedium from "./assets/spice-medium.svg";
import review1 from "../assets/testimonials-chef-mayank.png";
import review2 from "../assets/testimonials-chef-rohit.png";
import review3 from "../assets/testimonials-chef-shubham.png";
import Footer from "../footer";
import plus from "../../../public/images/plus.svg";
import minus from "../../../public/images/minus.svg";
import nonveg from "./assets/non-vag.svg";
import glutenfree from "./assets/gluten-free.svg";
import organic from "./assets/organic.svg";
import dairyfree from "./assets/dairy-free.svg";
import { useCart } from "../create-context/cart-context";
import { CartProvider } from "../create-context/cart-context";
import Navbar from "../navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import allCuisines from "./assets/all-cuisines.png";

const ExploreDishes = ({ item }) => {
  const token = JSON.parse(localStorage.getItem("user_token"));
  const { addToCart } = useCart();
  const { cart, removeFromCart, clearCart } = useCart();
  const [count, setCount] = useState(0);
  let subtotalPrice = 0;

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    defaultCuisines();
    defaultDietary();
    defaultDishtype();
    defaultDish();
    defaultSpicelevel();
  }, []);

  // ========= Get All Dish  =============

  const [getAllDish, setGetAllDish] = useState("");

  const defaultDish = () => {
    const option = {
      method: "GET",
      url: "http://localhost:4000/api/menu/menuItems",
      params: {
        Cuisines_id: cuisinesFilter,
        Dietary_id: dietaryFilter,
        Dishtype_id: moreFilters,
      },
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllDish(response?.data?.menuItems);
        console.log(response?.data?.menuItems, "dish");
        // console.log(response?.data, "DATA");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  // ========= Search Dish  =============
  const [isRefresh, setRefresh] = useState(false);

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    if (search.trim() === "") {
      refreshData();
    } else {
      const option = {
        method: "GET",
        url: `http://localhost:4000/api/menu/menuItems?search=${search}`,
      };
      axios
        .request(option)
        .then((response) => {
          setGetAllDish(response?.data?.menuItems);
          refreshData();
        })
        .catch((error) => {
          alert("Failed to fetch data");
        });
    }
  };

  // ========= Cuisines , Dietary ,DishType , Spice level =============

  const [getAllCuisines, setGetAllCuisines] = useState("");
  const [getAllDietary, setGetAllDietary] = useState("");
  const [getAllDishtype, setGetAllDishtype] = useState("");
  const [getAllSpiceL, setGetAllSpiceL] = useState("");

  const defaultCuisines = () => {
    const option = {
      method: "GET",
      url: "http://localhost:4000/api/cuisines/getAllCuisines",
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllCuisines(response?.data?.cuisines);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  const defaultDietary = () => {
    const option = {
      method: "GET",
      url: "http://localhost:4000/api/dietary/dietaries",
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllDietary(response?.data?.dietaries);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  const defaultDishtype = () => {
    const option = {
      method: "GET",
      url: "http://localhost:4000/api/DishType/dishTypes",
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllDishtype(response?.data?.dishTypes);
        // console.log(response?.data?.dishTypes, "dish");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  const defaultSpicelevel = () => {
    const option = {
      method: "GET",
      url: "http://localhost:4000/api/SpiceLevel/spiceLevels",
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllSpiceL(response?.data?.spiceLevels);
        console.log(response?.data?.spiceLevels, "spice");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  // ========= Filter By Cuisines =======
  const [cuisinesFilter, setCuisinesFilter] = useState("");
  const handleSearchCuisines = (e) => {
    // setLoader(true);
    try {
      setCuisinesFilter(e.target.value);
      const options = {
        method: "GET",
        url: `http://localhost:4000/api/menu/menuItem/sort?Cuisines_id=${e.target.value}&Dietary_id=${dietaryFilter}&Dishtype_id=${moreFilters}`,
      };
      axios
        .request(options)
        .then((response) => {
          if (response.status === 200) {
            setGetAllDish(response?.data?.menuItem);
            console.log(response?.data, "sort");

            // setLoader(false);
          } else {
            // setLoader(false);
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
          // setLoader(false);
        });
    } catch {
      console.error(error);
      // setLoader(false);
    }
  };

  // ========= Filter By Dietary =======
  const [dietaryFilter, setDietaryFilter] = useState("");
  const handleSearchDietary = (e) => {
    // setLoader(true);
    try {
      setDietaryFilter(e.target.value);
      const options = {
        method: "GET",
        url: `http://localhost:4000/api/menu/menuItem/sort?Dietary_id=${e.target.value}&Cuisines_id=${cuisinesFilter}&Dishtype_id=${moreFilters}`,
      };
      axios
        .request(options)
        .then((response) => {
          if (response.status === 200) {
            setGetAllDish(response?.data?.menuItem);
            // setLoader(false);
          } else {
            // setLoader(false);
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
          // setLoader(false);
        });
    } catch {
      console.error(error);
      // setLoader(false);
    }
  };

  // ========= Filter By MoreFilter =======

  const [moreFilters, setMoreFilters] = useState("");

  const handleSearchMoreFilter = (e) => {
    // setLoader(true);
    try {
      setMoreFilters(e.target.value);
      const options = {
        method: "GET",
        url: `http://localhost:4000/api/menu/menuItem/sort?Dishtype_id=${e.target.value}&Cuisines_id=${cuisinesFilter}&Dietary_id=${dietaryFilter}`,
      };
      axios
        .request(options)
        .then((response) => {
          if (response.status === 200) {
            setGetAllDish(response?.data?.menuItem);
            // setLoader(false);
          } else {
            // setLoader(false);
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
          // setLoader(false);
        });
    } catch {
      console.error(error);
      // setLoader(false);
    }
  };

  // ========= Add to Cart =======

  const handleAddToCart = async (id) => {
    // setLoader(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/Orders/AddtoCart",
        {
          menuItem: id,
        }
      );

      if (response.status === 200) {
        // toast.success("Added to Cart!");
        refreshData();
        // setLoader(false);
      } else {
        // toast.error("Failed. Something went wrong!");
        // setLoader(false);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Failed. Something went wrong!");
    }
  };
  // ========= Get Cart Item =======
  const [getCartItem, setGetCartItem] = useState("");

  useEffect(() => {
    defaultCartItem();
  }, []);
  const defaultCartItem = () => {
    const option = {
      method: "GET",
      url: "http://localhost:4000/api/Orders/getCartItem",

      headers: {
        Authorization: token,
      },
    };
    axios
      .request(option)
      .then((response) => {
        setGetCartItem(response?.data?.cart);
        console.log(response?.data?.cart, "cart");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  // ========= Delete Cart Item =======

  const handleRemove = async (id) => {
    setLoader(true);

    try {
      const response = await axios.delete(`DeleteById/${id}`);

      if (response.status === 200) {
        toast.success("Item remove successfully!");
        refreshData();
      } else {
        toast.error("Failed. Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed. Something went wrong!");
    } finally {
      setLoader(false);
    }
  };

  // ========= Clear Cart Item =======

  const handleAllClear = async () => {
    setLoader(true);

    try {
      const response = await axios.delete(
        "http://localhost:4000/api/Orders/deleteAllCartItem"
      );

      if (response.status === 200) {
        toast.success("Items remove successfully!");
        refreshData();
      } else {
        toast.error("Failed. Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed. Something went wrong!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <section>
        <Navbar />

        <div className="flex justify-center 2xl:py-20 xl:py-14 lg:py-8 hidden lg:block mnavbar 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] mx-auto">
          <div className="2xl:pt-[130px] xl:pt-[90px] pt-[60px]">
            <div className="mnavbar 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px] flex justify-between mx-auto">
              <div className="">
                <h1 className="third_head">Select Cuisine</h1>
              </div>

              <div className="flex justify-between 2xl:gap-10 xl:gap-5 lg:gap-4 items-center">
                <div className="flex 2xl:gap-5 xl:gap-3 lg:gap-2">
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className=" border py-1 px-2"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    open modal
                  </button>
                  <dialog
                    id="my_modal_3"
                    className="modal relative bg-base-100 flex justify-center items-center xl:mt-52 2xl:mt-72 2xl:w-[1660px] xl:w-[1100px] lg:w-[850px] 2xl:h-[520px] xl:h-[350px] 2xl:px-[0px] 2xl:py-[75px] xl:px-[30px] xl:py-[40px] "
                  >
                    <form method="dialog" className="modal-backdrop ">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_3").close()
                        }
                        className="absolute 2xl:top-2 2xl:right-4 xl:top-2 xl:right-2 xl:w-6 2xl:w-auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="text-black 2xl:w-10 2xl:h-10 xl:w-[8] xl:h-[8]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </form>
                    <div className=" flex flex-wrap gap-[20px]  2xl:w-[1602px] xl:w-[1200px] h-auto mx-[0px]">
                      {/* ================= Cuisines =========== */}
                      <div className="dropbox">
                        <Image
                          src={allCuisines}
                          className="rounded-[5px] 2xl:w-[74px] 2xl:h-[74px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]  "
                        />
                        <h1>All Cuisines</h1>
                      </div>

                      {Array.isArray(getAllCuisines) &&
                        getAllCuisines.map((item) => (
                          <div key={item._id} className="dropbox">
                            <img
                              src={item.ProfileImage}
                              className="rounded-[5px] 2xl:w-[74px] 2xl:h-[74px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]  "
                            />
                            <h1>{item.title}</h1>
                          </div>
                        ))}

                      {/* ================= Dietary=========== */}

                      {/* <div className=" flex flex-wrap gap-[20px]  2xl:w-[1602px] h-auto mx-auto">
                      {Array.isArray(getAllDietary) &&
                        getAllDietary.map((item) => (
                          <div key={item._id} className="dropbox">
                            <h1>{item.title}</h1>
                          </div>
                        ))}
                    </div> */}

                      {/* ================= Dish Type =========== */}

                      {/* <div className="flex justify-between 2xl:w-[1602px] h-auto mx-auto">
                        <div>
                          <h1 className="alata font-[400] 2xl:text-[20px] xl:text-[14px] lg:text-[10px] sm:text-[] text-[] my-1 ">
                            Dish Type
                          </h1>
                          <div className=" flex flex-wrap gap-[20px]  ">
                            {Array.isArray(getAllDishtype) &&
                              getAllDishtype.map((item) => (
                                <div key={item._id} className="dropbox3">
                                  <h1>{item.title}</h1>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div>
                          <h1 className="alata font-[400] 2xl:text-[20px] xl:text-[14px] lg:text-[10px] sm:text-[] text-[] my-1 ">
                            Spice Level
                          </h1>
                          <div className=" flex flex-wrap gap-[20px] ">
                            {Array.isArray(getAllSpiceL) &&
                              getAllSpiceL.map((item) => (
                                <div key={item._id} className="dropbox3">
                                  <h1>{item.title}</h1>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </dialog>
                  {/* =================Cuisines========================== */}

                  <div className="">
                    <select
                      id="cuisines"
                      className="2xl:w-[153px] third_select"
                      onChange={(e) => {
                        handleSearchCuisines(e);
                      }}
                    >
                      <option value=""> All Cuisines</option>
                      {Array.isArray(getAllCuisines) &&
                        getAllCuisines.map((item) => (
                          <option
                            key={item._id}
                            value={item._id}
                            className="custom_dropdown_text  capitalize"
                          >
                            {item.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* =================Dietary========================== */}

                  <div className="">
                    <select
                      id="dietary"
                      className="2xl:w-[126px] third_select"
                      onChange={(e) => {
                        handleSearchDietary(e);
                      }}
                    >
                      <option value=""> All Dietary</option>
                      {Array.isArray(getAllDietary) &&
                        getAllDietary.map((item) => (
                          <option
                            key={item._id}
                            value={item._id}
                            className="custom_dropdown_text  capitalize"
                          >
                            {item.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* =================More Filter========================== */}

                  <div className="">
                    <select
                      id="moreFilters"
                      className="2xl:w-[143px] third_select"
                      onChange={(e) => {
                        handleSearchMoreFilter(e);
                      }}
                    >
                      <option value="">More filters</option>
                      {Array.isArray(getAllDishtype) &&
                        getAllDishtype.map((item) => (
                          <option
                            key={item._id}
                            value={item._id}
                            className="custom_dropdown_text  capitalize"
                          >
                            {item.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-[13px] h-[13px] absolute 2xl:right-3 2xl:top-[16px] xl:right-3 xl:top-[10px] lg:right-3 lg:top-[5px] lg:text-[8px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>

                    <input
                      type="search"
                      name="search"
                      onChange={handleSearch}
                      placeholder="Search"
                      className=" third_input text-[#F38181]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center 2xl:my-10 xl:my-6 lg:my-5">
              <div className="carousel  2xl:gap-[40px] xl:gap-7 lg:gap-5">
                <div className="">
                  <Image
                    className="rounded-[5px] 2xl:w-[195px] 2xl:h-[195px] xl:w-[160px] lg:w-[125px] mcusinimg "
                    src={cuisineindia}
                    alt="cuisine-india"
                  />
                  <h1
                    className="alata font-[400] 2xl:text-[20px] 2xl:leading-[20px] 2xl:mt-[20px] xl:text-[14px] xl:leading-[20px] xl:my-3
                  lg:text-[12px] lg:leading-[18px] lg:my-2  mx-auto text-center"
                  >
                    Indian
                  </h1>
                </div>
                <div className="">
                  <Image
                    alt="cuisine-american"
                    className="rounded-[5px] 2xl:w-[195px] 2xl:h-[195px] xl:w-[160px] lg:w-[125px] mcusinimg"
                    src={cuisineamerican}
                  />
                  <h1
                    className="alata font-[400] 2xl:text-[20px] 2xl:leading-[20px] 2xl:mt-[20px] xl:text-[14px] xl:leading-[20px] xl:my-3
                  lg:text-[12px] lg:leading-[18px] lg:my-2  mx-auto text-center"
                  >
                    American
                  </h1>
                </div>
                <div className="">
                  <Image
                    alt="cuisine-mexican"
                    className="rounded-[5px] 2xl:w-[195px] 2xl:h-[195px] xl:w-[160px] lg:w-[125px] mcusinimg"
                    src={cuisinemexican}
                  />
                  <h1
                    className="alata font-[400] 2xl:text-[20px] 2xl:leading-[20px] 2xl:mt-[20px] xl:text-[14px] xl:leading-[20px] xl:my-3
                  lg:text-[12px] lg:leading-[18px] lg:my-2  mx-auto text-center"
                  >
                    Mexican
                  </h1>
                </div>
                <div className="">
                  <Image
                    alt="cuisine-mediterranean"
                    className="rounded-[5px] 2xl:w-[195px] 2xl:h-[195px] xl:w-[160px] lg:w-[125px] mcusinimg"
                    src={cuisinemediterranean}
                  />
                  <h1
                    className="alata font-[400] 2xl:text-[20px] 2xl:leading-[20px] 2xl:mt-[20px] xl:text-[14px] xl:leading-[20px] xl:my-3
                  lg:text-[12px] lg:leading-[18px] lg:my-2  mx-auto text-center"
                  >
                    Mediterranean
                  </h1>
                </div>
                <div className="">
                  <Image
                    alt="cuisine-italian"
                    className="rounded-[5px] 2xl:w-[195px] 2xl:h-[195px] xl:w-[160px] lg:w-[125px] mcusinimg"
                    src={cuisineitalian}
                  />
                  <h1
                    className="alata font-[400] 2xl:text-[20px] 2xl:leading-[20px] 2xl:mt-[20px] xl:text-[14px] xl:leading-[20px] xl:my-3
                  lg:text-[12px] lg:leading-[18px] lg:my-2  mx-auto text-center"
                  >
                    Italian
                  </h1>
                </div>
                <div className="">
                  <Image
                    alt="cuisine-middleEastern"
                    className="rounded-[5px] 2xl:w-[195px] 2xl:h-[195px] xl:w-[160px] lg:w-[125px] mcusinimg"
                    src={cuisinemiddleEastern}
                  />
                  <h1
                    className="alata font-[400] 2xl:text-[20px] 2xl:leading-[20px] 2xl:mt-[20px] xl:text-[14px] xl:leading-[20px] xl:my-3
                  lg:text-[12px] lg:leading-[18px] lg:my-2  mx-auto text-center"
                  >
                    Middle Eastern
                  </h1>
                </div>
                <div className="">
                  <Image
                    alt="cuisine-middleEastern"
                    className="rounded-[5px] 2xl:w-[195px] 2xl:h-[195px] xl:w-[160px] lg:w-[125px] mcusinimg"
                    src={cuisinesoutheast}
                  />
                  <h1
                    className="alata font-[400] 2xl:text-[20px] 2xl:leading-[20px] 2xl:mt-[20px] xl:text-[14px] xl:leading-[20px] xl:my-3
                  lg:text-[12px] lg:leading-[18px] lg:my-2  mx-auto text-center"
                  >
                    Southeast Asian
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="2xl:my-[20px] xl:my-[20px] my-[50px] bg-[#F9F2F2]">
          <div className="mnavbar 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]  2xl:py-[60px] xl:py-[60px] py-[40px] mx-auto">
            <div className="flex justify-center">
              <div>
                <h1 className="third_head text-center">Explore Dishes</h1>
                <p className="seven_p 2xl:w-[980px] xl:w-[600px] lg:w-[460px] w-[460px]">
                  Browse world of authentic homemade dishes by our independent
                  chef community. More chefs and dishes added every week.
                </p>
              </div>
            </div>
            <div className=" flex flex-wrap gap-[20px] xl:gap-[25px] 2xl:gap-[70px] w-full px-10 md:px-0 mx-auto">
              {Array.isArray(getAllDish) &&
                getAllDish.map((item) => (
                  <div
                    key={item.id}
                    className="  my-5 2xl:w-[345px] 2xl:h-[560px] lg:w-[23%]  md:w-[31%] w-[45%]  relative  rounded-[9.8px] mexploreD "
                  >
                    <button
                      className=""
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      <img
                        src={item.ProfileImage}
                        alt={item.title}
                        width={345}
                        height={278}
                        className="w-full h-auto 2xl:w-[365.5px] 2xl:h-[278px] rounded-[10px] mexplorimg"
                      />
                    </button>
                    <div className="">
                      <h1 className="alata capitalize font-[400] text-[#DB5353] 2xl:my-4 xl:my-3 my-2 2xl:text-[20px] 2xl:leading-[20px]  xl:text-[14px] xl:leading-[18px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                        {item.name}
                      </h1>
                      <div className="flex items-center 2xl:gap-3 xl:gap-2 lg:gap-2  gap-2 xl:my-3 lg:my-2 my-2">
                        <img
                          alt="image"
                          src={item.chef_id.images}
                          className="four_img2 "
                        />
                        <div>
                          <h1 className="fourth_name ">{item.chef_id.name}</h1>
                          <p className="fourth_p text-[#6765EB]">Indian</p>
                        </div>
                      </div>

                      <div className="flex gap-5 2xl:my-[20px] xl:my-[15px] my-[12px]">
                        <button className="four_btn">
                          <Image
                            alt="image"
                            src={vegetarian}
                            className="2xl:w-[13px] 2xl:h-[13px] lg:w-[10px] lg:h-[10px] w-[10px] h-auto"
                          />
                          <p className="fourth_day">{item?.Dietary_id?.title}</p>
                        </button>
                        <button className="four_btn">
                          <Image
                            alt="image"
                            src={vegan}
                            className="2xl:w-[13px] 2xl:h-[13px] lg:w-[10px] lg:h-[10px] w-[10px] h-auto"
                          />
                          <p className="fourth_day">Vegan</p>
                        </button>
                      </div>
                      <div className="flex items-center gap-5  2xl:my-[20px] xl:my-[15px] my-[12px]">
                        <h1 className="fourth_p">Spice level</h1>
                        <button className="four_btn">
                          <Image
                            alt="image"
                            src={spicemedium}
                            className="2xl:w-[13px] 2xl:h-[13px] lg:w-[10px] lg:h-[10px] w-[10px] h-auto"
                          />
                          <p className="fourth_day">
                            {item.spice_level_id.title}
                          </p>
                        </button>
                      </div>

                      <div className=" w-full bottom-0 flex justify-between items-center  2xl:my-[22px] xl:my-[18px] my-[15px]">
                        <p className="alata font-[400] text-[#000] 2xl:text-[20px] 2xl:leading-[24px] xl:text-[14px] xl:leading-[18px] lg:text-[12px] lg:leading-[16px] text-[12px] leading-[16px] ">
                          Serves 1 (500g){" "}
                          <span className="text-[#DB5353]">£8.50</span>
                        </p>
                        <button
                          onClick={() => {
                            // addToCart(item);
                            handleAddToCart(item?._id);
                          }}
                        >
                          <div className="drawer-content">
                            {/* Page content here */}
                            <label
                              htmlFor="my-drawer-4"
                              className="drawer-button"
                            >
                              <Image
                                src={addCart}
                                alt={item.title}
                                className=" 2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] lg:w-[25px] lg:h-[25px] w-[25px] h-[25px]"
                              />
                            </label>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:my-14 xl:my-28 my-10">
          <div className="mnavbar 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]">
            <h1 className="nine_head">Testimonials</h1>
            <p className="nine_p text-center">
              All our chefs have fans raving about their food
            </p>

            <div className="lg:flex justify-around 2xl:my-10 xl:my-8 lg:my-6 my-3">
              <div className="w-2/4 sm:w-1/3 mx-auto my-5 lg:my-0 lg:mx-0 lg:w-auto">
                <div>
                  <div>
                    <Image
                      alt="chef-mayank"
                      src={review1}
                      className="nine_img"
                    />
                  </div>
                  <div className="rating flex justify-center nine_start">
                    <label for="star1">
                      <input
                        type="radio"
                        id="star1"
                        name="rating-2"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star2">
                      <input
                        type="radio"
                        id="star2"
                        name="rating-2"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star3">
                      <input
                        type="radio"
                        id="star3"
                        name="rating-2"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star4">
                      <input
                        type="radio"
                        id="star4"
                        name="rating-2"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star5">
                      <input
                        type="radio"
                        id="star5"
                        name="rating-2"
                        className="mask mask-star-2 bg-[#DB5353]"
                        checked
                      />
                    </label>
                  </div>

                  <p className="nine_p2">
                    Lorem ipsum dolor sit amet. Ut maxime necessitatibus rem
                    odio Quis 33 galisum molestias ut voluptas fuga et quia
                    voluptate ut pariatur aperiam.
                  </p>
                  <p className="nine_name">Mayank Jaiswal</p>
                </div>
              </div>
              <div>
                <div className="w-2/4 sm:w-1/3 mx-auto my-5 lg:my-0 lg:mx-0 lg:w-auto">
                  <div>
                    <Image
                      alt="chef-rohit"
                      src={review2}
                      className="nine_img"
                    />
                  </div>
                  <div className="rating flex justify-center nine_start">
                    <label for="star1">
                      <input
                        type="radio"
                        id="star1"
                        name="rating-3"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star2">
                      <input
                        type="radio"
                        id="star2"
                        name="rating-3"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star3">
                      <input
                        type="radio"
                        id="star3"
                        name="rating-3"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star4">
                      <input
                        type="radio"
                        id="star4"
                        name="rating-3"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star5">
                      <input
                        type="radio"
                        id="star5"
                        name="rating-3"
                        className="mask mask-star-2 bg-[#DB5353]"
                        checked
                      />
                    </label>
                  </div>

                  <p className="nine_p2">
                    Lorem ipsum dolor sit amet. Ut maxime necessitatibus rem
                    odio Quis 33 galisum molestias ut voluptas fuga et quia
                    voluptate ut pariatur aperiam.
                  </p>
                  <p className="nine_name">Rohit Thakur</p>
                </div>
              </div>
              <div>
                <div className="w-2/4 sm:w-1/3 mx-auto my-5 lg:my-0 lg:mx-0 lg:w-auto">
                  <div>
                    <Image
                      alt="chef-shubham"
                      src={review3}
                      className="nine_img"
                    />
                  </div>
                  <div className="rating flex justify-center nine_start">
                    <label for="star1">
                      <input
                        type="radio"
                        id="star1"
                        name="rating-4"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star2">
                      <input
                        type="radio"
                        id="star2"
                        name="rating-4"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star3">
                      <input
                        type="radio"
                        id="star3"
                        name="rating-4"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star4">
                      <input
                        type="radio"
                        id="star4"
                        name="rating-4"
                        className="mask mask-star-2 bg-[#DB5353]"
                      />
                    </label>
                    <label for="star5">
                      <input
                        type="radio"
                        id="star5"
                        name="rating-4"
                        className="mask mask-star-2 bg-[#DB5353]"
                        checked
                      />
                    </label>
                  </div>

                  <p className="nine_p2">
                    Lorem ipsum dolor sit amet. Ut maxime necessitatibus rem
                    odio Quis 33 galisum molestias ut voluptas fuga et quia
                    voluptate ut pariatur aperiam.
                  </p>
                  <p className="nine_name">Shubham Sharma</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
      {/* ===============PopUp=============== */}
      <dialog
        id="my_modal_1"
        className="2xl:w-[1000px] 2xl:h-[939px] xl:w-[720px] w-[600px] h-auto mx-auto rounded-[10px]  my-auto 2xl:px-[40px] 2xl:py-[45px] xl:px-[25px] xl:py-[30px] px-[15px] py-[20px]"
      >
        <button
          onClick={() => document.getElementById("my_modal_1").close()}
          className="absolute right-4 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] w-[14px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-full">
          <div method="dialog">
            <div className="flex 2xl:gap-[60px] xl:gap-[40px] gap-[20px] justify-between">
              <div className="2xl:w-[459px] xl:w-[360px] w-[260px] ">
                <Image src={popimg} className="rounded-[15px]" />
              </div>
              <div className="2xl:w-[400px] xl:w-[359px] w-[300px]">
                <div>
                  <h1 className="pop-head">Chicken kabab</h1>
                  <p className="pop-chef">by Chef Radha</p>
                </div>
                <div className="flex justify-between pop-detail">
                  <h3>Price: £8.50</h3>
                  <h3>Weight: 400g</h3>
                  <h3>Portion Size: Serves 1</h3>
                </div>
                <div className="flex flex-wrap 2xl:gap-[10px] xl:gap-[8px] gap-[6px]  2xl:my-[15px] xl:my-[12px] my-[8px]">
                  <div className="pop">
                    <Image
                      src={nonveg}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    />
                    <h3>Non-Veg</h3>
                  </div>
                  <div className="pop">
                    <Image
                      src={glutenfree}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    />
                    <h3>Gulten Free</h3>
                  </div>{" "}
                  <div className="pop">
                    <Image
                      src={organic}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    />
                    <h3>Organic</h3>
                  </div>{" "}
                  <div className="pop">
                    <Image
                      src={dairyfree}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    />
                    <h3>Dairy Free</h3>
                  </div>{" "}
                  <div className="pop">
                    <Image
                      src={spicemedium}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    />
                    <h3>Medium</h3>
                  </div>
                </div>
                <div className="flex justify-center 2xl:w-[103px] 2xl:h-[39px] xl:w-[60px] xl:h-[22px] lg:w-[50px] lg:h-[20px] border rounded-[5px] 2xl:mt-[25px] xl:mt-[20px] mt-[15px]">
                  {" "}
                  <button
                    className="   text-[#DB5353] rounded-l w-1/3"
                    onClick={() => {
                      handleDecrement();
                      // alert("Removed from cart");
                    }}
                  >
                    <Image
                      src={minus}
                      className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                    />
                  </button>
                  <p className=" flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px]  2xl:leading-[28px] ">
                    {count}
                  </p>
                  <button
                    className="    text-[#DB5353] rounded-r w-1/3"
                    onClick={() => handleIncrement()}
                  >
                    <Image
                      src={plus}
                      className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                    />
                  </button>
                </div>
                <div>
                  <button className="pop-btn">Add to basket</button>
                </div>
              </div>
            </div>
            <div className="2xl:my-[15px] xl:my-[10px] my-[8px]">
              <div className="">
                <p className="fourth_p text-[#555555]">Description</p>{" "}
                <p className="fourth_p 2xl:w-[890px] xl:w-[660px] w-[550px]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
            <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
              <div className="flex justify-between">
                <div>
                  <p className="fourth_p text-[#555555]">Ingredients</p>{" "}
                  <p className="fourth_p ">Chicken, Egg, Tomato, etc</p>
                </div>
                <div className="2xl:w-[578px] xl:w-[430px] w-[360px]">
                  <p className="fourth_p text-[#555555]">
                    Heating instructions
                  </p>{" "}
                  <p className="fourth_p ">
                    As our food is hand-made by our chefs, these reheating
                    instructions are a guide. Check your food is piping hot
                    throughout before serving.
                  </p>
                </div>
              </div>
            </div>
            <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
              <div className="flex justify-between">
                <div>
                  <p className="fourth_p text-[#555555]">List of Allergens</p>{" "}
                  <p className="fourth_p ">Dish contains i.e Celery,  Egg</p>
                </div>
                <div className="2xl:w-[578px] xl:w-[430px] w-[360px]">
                  <p className="fourth_p text-[#555555]">
                    Best Cooked directly from FROZEN
                  </p>{" "}
                  <p className="fourth_p ">
                    OVEN: Preheat oven to 180°C (Gas Mark 5). Remove lid and any
                    outer packaging. Place on a baking tray at the top of oven
                    for 20 minutes or until piping hot.
                  </p>
                </div>
              </div>
            </div>
            <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
              <div className="flex justify-between">
                <div>
                  <p className="fourth_p text-[#555555]">Storage</p>{" "}
                  <p className="fourth_p 2xl:w-[270px] xl:w-[200px] w-[160px]">
                    Store immediately in freezer on delivery.
                  </p>
                  <p className="fourth_p ">Keep frozen at -18℃.</p>
                  <p className="fourth_p 2xl:w-[270px] xl:w-[200px] w-[180px]">
                    Should this product defrost, keep refrigerated, heat and eat
                    within 48 hours.
                  </p>
                </div>
                <div className="2xl:w-[578px] xl:w-[430px] w-[360px]">
                  <p className="fourth_p ">
                    MICROWAVE: Remove lid and place loosely on the container.
                    Place on a microwaveable plate and heat on full power for
                    7-8 minutes. Halfway through heating, add 2 tablespoons of
                    water to rice and stir contents together. Re-cover and
                    continue heating. Heat until piping hot and stand for 1
                    minute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>

      {/* ===============Right drawer=============== */}

      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content  2xl:w-[505px] xl:w-[350px] lg:w-[290px] bg-white 2xl:mt-[116px] xl:mt-[80px] lg:mt-[50px] sm:mt-[45px] mt-12">
            <div className="bg-white hidden lg:block   rounded-s-[15px]">
              <div className="">
                <h1 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[22px] text-[22px] 2xl:leading-[32px]  xl:text-[18px] xl:leading-[24px] lg:text-[14px] lg:leading-[20px]">
                  My Basket
                </h1>

                {getCartItem.length === 0 ? (
                  <div>
                    <div className="2xl:mt-40">
                      <Image
                        src={emptyCart}
                        className="2xl:w-[268.25px] 2xl:h-[265px] mx-auto"
                      />
                    </div>
                    <h1 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[25px] 2xl:leading-[35px]  xl:text-[20px] xl:leading-[28px] lg:text-[16px] lg:leading-[24px] text-center 2xl:mt-24">
                      Explore a World of Deliciousness
                    </h1>
                    <p className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[16px] 2xl:leading-[26px]  xl:text-[14px] xl:leading-[20px] lg:text-[12px] lg:leading-[18px] text-center">
                      add dishes to your cart now.
                    </p>
                    <div className="flex 2xl:mt-12 xl:mt-6 lg:mt-5 mt-4">
                      <button className=" alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[221px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] xl:px-6 xl:py-[10px] lg:px-3 lg:py-1 px-3 py-1 ">
                        Explore Dishes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div
                      className=" flex justify-end mt-10 md:mr-5"
                      onClick={() => handleAllClear()}
                    >
                      <button className="border p-2 text-[20px]">
                        All Clear
                      </button>
                    </div>
                    {getCartItem.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-center 2xl:my-6 my-2">
                          <div className="flex items-center gap-2 2xl:gap-4 xl:h-[70px]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="2xl:w-[70px] 2xl:h-[70px] xl:w-[50px] xl:h-[50px] lg:w-[40px] lg:h-[40px] rounded-[5.8px]"
                            />
                            <div>
                              <h1 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px]  xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                                {item?.title}
                              </h1>
                              <h1 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px]  xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                                £{item?.price}
                              </h1>
                            </div>
                          </div>
                          <div className="flex justify-center 2xl:w-[103px] 2xl:h-[39px] xl:w-[60px] xl:h-[22px] lg:w-[50px] lg:h-[20px] border rounded-[5px] ">
                            {" "}
                            <button
                              className="   text-[#DB5353] rounded-l w-1/3"
                              onClick={() => {
                                handleDecrement(item?.id);
                                removeFromCart(item.id);
                                alert("Removed from cart");
                              }}
                            >
                              <Image
                                src={minus}
                                className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                              />
                            </button>
                            <p className=" flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px]  2xl:leading-[28px] ">
                              {count}
                            </p>
                            <button
                              className="    text-[#DB5353] rounded-r w-1/3"
                              onClick={() => handleIncrement(item?.id)}
                            >
                              <Image
                                src={plus}
                                className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                              />
                            </button>
                          </div>
                        </div>
                        <button
                          className="px-4 text-[13px] border rounded h-[25px] text-[red] hover:bg-[#efb3b38a]"
                          onClick={() => handleRemove(item?._id)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-20">
                      <div>
                        <h1 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                          {subtotalPrice}
                        </h1>
                      </div>
                      <div>
                        <button className=" alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[164px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] lg:text-[10px] xl:px-6 xl:py-[10px] lg:px-3 lg:py-1 px-3 py-1 ">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};
const App = () => {
  return (
    <CartProvider>
      {" "}
      {/* Wrapping the component tree with CartProvider */}
      <ExploreDishes />
    </CartProvider>
  );
};
export default dynamic(() => Promise.resolve(App), { ssr: false });
