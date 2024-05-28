"use client";
import React, { Fragment, useEffect, useState } from "react";
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
import { Dialog, Transition } from "@headlessui/react";
import DishDetails from "./dish-details/page";
import Slider from "react-slick";
import Carousel from "react-elastic-carousel";
import config from "@/config";
import {
  setDish,
  addItemToCart,
  handleClearCart,
  removeItemFromCart,
  clearCart,
} from "../redux/dishSlice";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { useRouter } from "next/navigation";

const ExploreDishes = () => {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [dishID, setDishID] = useState("");
  const closeModal = () => setOpen(false);
  const [getADish, setGetADish] = useState("");
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { token } = useSelector((state) => state?.auth);
  const { cart } = useSelector((state) => state?.userCart);
  console.log(cart, "cart");

  // const data = dish?.data;

  cart.forEach((item, index) => {
    const { data } = item;
    console.log(data, `data from item ${index + 1}`);
  });

  const handleRemoveItem = (_id) => {
    console.log(_id, "iggg");
    dispatch(removeItemFromCart({ _id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  function openModal(id) {
    setDishID(id);
    setOpen(true);
  }

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
      url: `${config.baseURL}/api/menu/menuItems`,
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
        url: `${config.baseURL}/api/menu/menuItems?search=${search}`,
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
      url: `${config.baseURL}/api/cuisines/getAllCuisines`,
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
      url: `${config.baseURL}/api/dietary/dietaries`,
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
      url: `${config.baseURL}/api/DishType/dishTypes`,
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllDishtype(response?.data?.dishTypes);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  const defaultSpicelevel = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/SpiceLevel/spiceLevels`,
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllSpiceL(response?.data?.spiceLevels);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  // ========= Filter By Cuisines =======
  const [cuisinesFilter, setCuisinesFilter] = useState("");
  const handleSearchCuisines = (_id) => {
    // setLoader(true);
    try {
      setCuisinesFilter(_id);
      const options = {
        method: "GET",
        url: `${config.baseURL}/api/menu/menuItem/sort?Cuisines_id=${_id}&Dietary_id=${dietaryFilter}&Dishtype_id=${moreFilters}`,
      };
      axios
        .request(options)
        .then((response) => {
          if (response.status === 200) {
            setGetAllDish(response?.data?.menuItem);
            document.getElementById("my_modal_3").close();
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
    } catch (error) {
      console.error(error);
      // setLoader(false);
    }
  };

  // ========= Filter By Dietary =======
  const [dietaryFilter, setDietaryFilter] = useState("");
  const handleSearchDietary = (_id) => {
    // setLoader(true);
    try {
      setDietaryFilter(_id);
      const options = {
        method: "GET",
        url: `${config.baseURL}/api/menu/menuItem/sort?Dietary_id=${_id}&Cuisines_id=${cuisinesFilter}&Dishtype_id=${moreFilters}`,
      };
      axios
        .request(options)
        .then((response) => {
          if (response.status === 200) {
            setGetAllDish(response?.data?.menuItem);
            document.getElementById("my_modal_4").close();

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

  const handleSearchMoreFilter = (_id) => {
    // setLoader(true);
    try {
      setMoreFilters(_id);
      const options = {
        method: "GET",
        url: `${config.baseURL}/api/menu/menuItem/sort?Dishtype_id=${_id}&Cuisines_id=${cuisinesFilter}&Dietary_id=${dietaryFilter}`,
      };
      axios
        .request(options)
        .then((response) => {
          if (response.status === 200) {
            setGetAllDish(response?.data?.menuItem);
            document.getElementById("my_modal_5").close();

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

  // const handleAddToCart = async (id) => {
  //   // setLoader(true);
  //   try {
  //     const response = await axios.post(
  //       `${config.baseURL}/api/Orders/AddtoCart`,
  //       {
  //         menuItem: id,
  //       }
  //     );

  //     if (response.status === 200) {
  //       // toast.success("Added to Cart!");
  //       refreshData();
  //       // setLoader(false);
  //     } else {
  //       // toast.error("Failed. Something went wrong!");
  //       // setLoader(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // toast.error("Failed. Something went wrong!");
  //   }
  // };
  // ========= Get Cart Item =======
  const [getCartItem, setGetCartItem] = useState("");

  // useEffect(() => {
  //   defaultCartItem();
  // }, []);
  // const defaultCartItem = () => {
  //   const option = {
  //     method: "GET",
  //     url: `${config.baseURL}/api/Orders/getCartItem`,
  //   };
  //   axios
  //     .request(option)
  //     .then((response) => {
  //       setGetCartItem(response?.data?.cart);
  //     })
  //     .catch((error) => {
  //       console.log(error, "Error");
  //     });
  // };

  const handleAllClear = async () => {
    setLoader(true);

    try {
      const response = await axios.delete(
        `${config.baseURL}/api/Orders/deleteAllCartItem`
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

  // Slider

  const breakPoints = [
    { width: 1, itemsToShow: 1 }, // Mobile: Show 1 item
    { width: 425, itemsToShow: 2 }, // Mobile: Show 1 item
    { width: 640, itemsToShow: 3 }, // Tablet: Show 3 items
    { width: 750, itemsToShow: 3 },
    { width: 1024, itemsToShow: 10 }, // Laptop: Show 7 items
  ];

  const defaultADish = (_id) => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/menu/menuItems/${_id}`,
    };
    axios
      .request(option)
      .then((response) => {
        setGetADish(response?.data);
        dispatch(addItemToCart(response));
        handleDrawerOpen();
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  useEffect(() => {
    const ids = cart.map((item) => item?.data?._id);
    // console.log(cart, "item");
    setItemId(ids);
    console.log(ids, "ids");
  }, []);
  const [itemId, setItemId] = useState([]);
  const handleAddCart = async (itemId) => {
    try {
      const response = await axios.post(
        `${config.baseURL}/api/Orders/AddtoCart`,

        { menuItem: itemId },

        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("Item Added to Cart");
        handleDrawerOpen();
        refreshData();
      } else {
        toast.error(
          error.response.data.message ||
            "Failed to add item to cart. Please try again."
        );
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      toast.error("An error occurred while adding the item to the cart.");
      console.log("Error:", error);
    }
  };

  const [getCartItems, setGetCartItems] = useState({});
  useEffect(() => {
    if (token) {
      defaultCartItems();
    }
  }, [token, isRefresh]);

  const defaultCartItems = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/Orders/getCartItem`,

      headers: {
        Authorization: token,
      },
    };
    axios
      .request(option)
      .then((response) => {
        setGetCartItems(response?.data?.userCart?.items);
        console.log(response?.data?.userCart?.items, "data");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  const handleItemRemove = async (id) => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/api/Orders/deleteCartItem/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("Item Remove From Cart");
        refreshData();
      } else {
        alert("failed");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "server error");
    }
  };
  const handleCartClear = async () => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/api/Orders/deleteAllCartItem`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("All Items Are Removed");
        refreshData();
      } else {
        alert("failed");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "server error");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.baseURL}/api/auth/login`,
        loginDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res?.data?.success) {
        toast.success("Login successfully!");
        dispatch(setToken(res?.data?.token));
        dispatch(setUser(res?.data?.user));
        dispatch(setSuccess(res?.data?.success));
        handleClose();
        setLoader(false);
        setIsLoggedIn(true);
      } else {
        toast.error("Login failed please try later!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer className="mt-24" autoClose={1000} />
      <section>
        <Navbar />
        <div class="2xl:pt-[130px] xl:pt-[90px] pt-[60px] ">
          <div class="main_section 2xl:w-[1700px] xl:w-[1100px] md:w-[811px]  m-auto mt-auto">
            <div class="flex flex-col md:flex-row justify-center my-10 mx-6 lg:my-6">
              <div class="mr-6 lg:mb-0 mb-4 lg lg:w-[30%] 2xl:w-[45%] xl:w-[33%] lg:text-[2.25rem] lg:ml-[-45px] md:w-[30%] xs:text-[1.875rem] sm:text-[2.25rem] md:text-[29px]">
              <h1 className="third_head mb-4 alata font-[400] 2xl:text-[55px] lg:text-left 2xl:ml-[105px] xl:ml-[19px] text-center">
                  Select Cuisine
                </h1>
              </div>

              <div className="mnavbar 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] sm:pt-[12px] sm:pb-[4px] 2xl:pt-[21px] md:pt-[9px] md:w-[700px]  2xl:py-[60px] xl:py-[10px] lg:pt-[7px] lg:pb-[40px]  py-[40px] xs:py-[10px] mx-auto">
                <div className="filter_div_second">
                  <div className="select-divs flex gap-5">
                  <div className="select-1 alata">
                      <select
                        id="dietary"
                        className="2xl:w-[126px] third_select"
                        onChange={(e) => {
                          handleSearchDietary(e);
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
                    <div className="select-1">
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
                    <div className="select-1  ">
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
                  </div>

                  <button
                    className="bt-1 alata font-[400] 2xl:text-[16px] 2xl:w-[153px] third_select flex justify-center items-center gap-3 md:text-[12px] sm:text-[12px] md:pl-2 sm:pl-2"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    All Cuisines{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 sm:w-4 sm:h-4 md:w-4 md:h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  <dialog
                    id="my_modal_3"
                    className="modal relative bg-base-100  justify-center items-center xl:mt-52 2xl:mt-72 2xl:w-[1660px] xl:w-[1100px] lg:w-[850px] 2xl:h-[520px] xl:h-[350px] 2xl:px-[0px] 2xl:py-[75px] xl:px-[30px] xl:py-[40px] "
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
                      <button>
                        <div className="dropbox all_cuisines">
                          <Image
                            src={allCuisines}
                            className="bt-1 rounded-[5px] 2xl:w-[74px] 2xl:h-[74px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]"
                          />
                          <h4>All Cuisines</h4>
                        </div>
                      </button>

                      {Array.isArray(getAllCuisines) &&
                        getAllCuisines.map((item) => (
                          <button
                            key={item._id}
                            onClick={() => handleSearchCuisines(item._id)}
                          >
                            <div className="dropbox">
                              <img
                                src={item.ProfileImage}
                                className="rounded-[5px] 2xl:w-[74px] 2xl:h-[74px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]  "
                              />
                              <h4 className="capitalize">{item.title}</h4>
                            </div>
                          </button>
                        ))}

                      {/* ================= Dietary=========== */}
                    </div>
                  </dialog>
                  {/* =================Cuisines========================== */}

                  {/* =================Dietary========================== */}
                  <button
                    className="bt-1 2xl:w-[153px] alata font-[400] 2xl:text-[16px] third_select flex justify-center items-center gap-2 md:text-[12px] sm:text-[12px] md:pl-2 sm:pl-2"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    All Dietary
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 sm:w-4 sm:h-4 md:w-4 md:h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  <dialog
                    id="my_modal_4"
                    className="modal relative bg-base-100 flex justify-center items-center xl:mt-52 2xl:mt-72 2xl:w-[1660px] xl:w-[1100px] lg:w-[850px] 2xl:h-[520px] xl:h-[350px] 2xl:px-[0px] 2xl:py-[75px] xl:px-[30px] xl:py-[40px] "
                  >
                    <form method="dialog" className="modal-backdrop ">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_4").close()
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
                      {/* ================= Dietary=========== */}
                      {/*
                      <div className=" flex flex-wrap gap-[20px]  2xl:w-[1602px] h-auto mx-auto">
                        {Array.isArray(getAllDietary) &&
                          getAllDietary.map((item) => (
                            <div key={item._id} className="dropbox">
                              <img
                                src={item.ProfileImage}
                                className="rounded-[5px] 2xl:w-[35px] 2xl:h-[35px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]  "
                              />
                              <h4>{item.title}</h4>
                            </div>
                          ))}
                      </div> */}
                      {Array.isArray(getAllDietary) &&
                        getAllDietary.map((item) => (
                          <button
                            key={item._id}
                            onClick={() => handleSearchDietary(item._id)}
                          >
                            <div className="dropbox">
                              <img
                                src={item.ProfileImage}
                                className="rounded-[5px] 2xl:w-[35px] 2xl:h-[35px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]  "
                              />
                              <h4 className="capitalize">{item.title}</h4>
                            </div>
                          </button>
                        ))}
                      {/* ================= Dish Type =========== */}
                    </div>
                  </dialog>

                  {/* =================More Filter========================== */}
                  <button
                    className="bt-1 2xl:w-[153px] third_select alata font-[400] 2xl:text-[16px] flex justify-center items-center gap-2 md:text-[12px] sm:text-[12px] md:pl-2 sm:pl-2"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    More filters{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 sm:w-4 sm:h-4 md:w-4 md:h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  <dialog
                    id="my_modal_5"
                    className="modal relative bg-base-100 flex justify-center items-center xl:mt-52 2xl:mt-72 2xl:w-[1660px] xl:w-[1100px] lg:w-[850px] 2xl:h-[520px] xl:h-[350px] 2xl:px-[0px] 2xl:py-[75px] xl:px-[30px] xl:py-[40px] "
                  >
                    <form method="dialog" className="modal-backdrop ">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_5").close()
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
                      {/* ================= Dish Type =========== */}

                      <div className="flex justify-between 2xl:w-[1602px] h-auto mx-auto">
                        <div>
                          <h4 className="alata font-[400] 2xl:text-[20px] xl:text-[14px] lg:text-[10px] sm:text-[] text-[] my-1 ">
                            Dish Type
                          </h4>
                          <div className=" flex flex-wrap gap-[20px]  ">
                            {/* {Array.isArray(getAllDishtype) &&
                              getAllDishtype.map((item) => (
                                <div key={item._id} className="dropbox3">
                                  <h4>{item.title}</h4>
                                </div>
                              ))} */}

                            {Array.isArray(getAllDishtype) &&
                              getAllDishtype.map((item) => (
                                <button
                                  key={item._id}
                                  onClick={() =>
                                    handleSearchMoreFilter(item._id)
                                  }
                                >
                                  <div className="dropbox3 gap-3">
                                    <img
                                      src={item.ProfileImage}
                                      className="rounded-[5px] 2xl:w-[25px] 2xl:h-[25px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]  "
                                    />
                                    <h4 className="capitalize">{item.title}</h4>
                                  </div>
                                </button>
                              ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="alata font-[400] 2xl:text-[20px] xl:text-[14px] lg:text-[10px] sm:text-[] text-[] my-1 ">
                            Spice Level
                          </h4>
                          <div className=" flex flex-wrap gap-[20px] ">
                            {/* {Array.isArray(getAllSpiceL) &&
                              getAllSpiceL.map((item) => (
                                <div key={item._id} className="dropbox3">
                                  <h4>{item.title}</h4>
                                </div>
                              ))} */}

                            {Array.isArray(getAllSpiceL) &&
                              getAllSpiceL.map((item) => (
                                <button
                                  key={item._id}
                                  onClick={() =>
                                    handleSearchMoreFilter(item._id)
                                  }
                                >
                                  <div className="dropbox3 gap-3">
                                    <img
                                      src={item.ProfileImage}
                                      className="rounded-[5px] 2xl:w-[25px] 2xl:h-[25px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]  "
                                    />
                                    <h4 className="capitalize">{item.title}</h4>
                                  </div>
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </dialog>

                  <div className="more_filter bt-1">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-[13px] h-[13px] absolute 2xl:right-3 2xl:top-[16px] xl:right-3 xl:top-[10px] lg:right-3 lg:top-[5px] lg:text-[8px] md:mt-1.5 sm:mt-1.5 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg> */}

                    <input
                      type="search"
                      name="search"
                      onChange={handleSearch}
                      placeholder="Search"
                      className="md:pl-4 sm:pl-4  third_input text-[#F38181] md:text-[13px] sm:text-[13px] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-center my-10 mx-6 sm:my-6 sm:{} ">
              <div class="carousel gap-4 sm:gap-6 xs:gap-4  grid sm:grid-cols-4  xs:grid-cols-4  md:grid-cols-4 lg:grid-cols-7">
                <div class="">
                  <Image
                    className="rounded-[5px] w-[100%]  h-auto mcusinimg"
                    src={cuisineindia}
                    alt="cuisine-india"
                  />
                  <h4 class="alata font-[400] sm:text-[11px] text-center text-[#000] text-sm mt-3">
                    Indian
                  </h4>
                </div>
                <div class="">
                  <Image
                    alt="cuisine-american"
                    className="rounded-[5px] w-[100%] h-auto mcusinimg"
                    src={cuisineamerican}
                  />
                  <h4 class="alata font-[400] sm:text-[11px] text-center text-[#000] text-sm mt-3">
                    American
                  </h4>
                </div>
                <div class="">
                  <Image
                    alt="cuisine-mexican"
                    className="rounded-[5px] w-[100%] h-auto mcusinimg"
                    src={cuisinemexican}
                  />
                  <h4 class="alata font-[400] sm:text-[11px] text-center text-[#000] text-sm mt-3">
                    Mexican
                  </h4>
                </div>
                <div class="">
                  <Image
                    alt="cuisine-mediterranean"
                    className="rounded-[5px] w-[100%]   h-auto mcusinimg"
                    src={cuisinemediterranean}
                  />
                  <h4 class="alata font-[400] sm:text-[11px] text-center text-[#000] text-sm mt-3">
                    Mediterranean
                  </h4>
                </div>
                <div class="">
                  <Image
                    alt="cuisine-italian"
                    className="rounded-[5px] w-[100%] h-auto mcusinimg"
                    src={cuisineitalian}
                  />
                  <h4 class="alata font-[400] sm:text-[11px] text-center text-[#000] text-sm mt-3">
                    Italian
                  </h4>
                </div>
                <div class="">
                  <Image
                    alt="cuisine-middleEastern"
                    className="rounded-[5px] w-[100%] h-auto mcusinimg"
                    src={cuisinemiddleEastern}
                  />
                  <h4 class="alata font-[400] sm:text-[11px] text-center text-[#000] text-sm mt-3">
                    Middle Eastern
                  </h4>
                </div>
                <div class="">
                  <Image
                    alt="cuisine-middleEastern"
                    className="rounded-[5px] w-[100%] h-auto mcusinimg"
                    src={cuisinesoutheast}
                  />
                  <h4 class="alata font-[400] sm:text-[11px] text-center text-[#000] text-sm mt-3">
                    Southeast Asian
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Dishes */}

        <div className="sm:col-2">
          <div className="2xl:my-[20px] xl:my-[20px] my-[50px] bg-[#F9F2F2]">
            <div className="mnavbar 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]  2xl:py-[60px] xl:py-[60px] py-[40px] mx-auto">
              <div className="flex justify-center">
                <div class="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-3 xs:text-center">
                  <h4 class="third_head text-center text-3xl sm:text-4xl md:text-55px">
                    Explore Dishes
                  </h4>
                  <p class="seven_p mt-4 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-lg">
                    Browse the world of authentic homemade dishes by our
                    independent chef community. More chefs and dishes added
                    every week.
                  </p>
                </div>
              </div>

              <div className=" flex flex-wrap gap-[20px] xl:gap-[25px] 2xl:gap-[70px] w-full px-10 md:px-0 mx-auto ">
                {Array.isArray(getAllDish) &&
                  getAllDish.map((item) => (
                    <div
                      key={item.id}
                      className="  my-5 2xl:w-[345px] 2xl:h-[560px] lg:w-[23%] sm:w-[48%] md:w-[48%] w-[100%]  relative  rounded-[9.8px] mexploreD "
                    >
                      <button className="" onClick={() => openModal(item._id)}>
                        <img
                          src={item.ProfileImage}
                          alt={item.title}
                          width={345}
                          height={278}
                          className="w-full 2xl:w-[365.5px] 2xl:h-[278px] xl:w-[280px] xl:h-[200px] lg:w-[220px] lg:h-[160px] rounded-[10px] mexplorimg"
                        />
                      </button>
                      <div className="">
                        <h4 className="alata capitalize font-[400] text-[#DB5353] 2xl:my-4 xl:my-3 my-2 2xl:text-[20px] 2xl:leading-[20px]  xl:text-[14px] xl:leading-[18px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                          {item.name}
                        </h4>

                        {/* ===============Chef ============= */}
                        <Link
                          href={`/pages/chef-details/${item?.chef_id?._id}`}
                        >
                          <div className="flex items-center 2xl:gap-3 xl:gap-2 lg:gap-2  gap-2 xl:my-3 lg:my-2 my-2">
                            <img
                              alt="image"
                              src={item?.chef_id?.images}
                              className="four_img2 "
                            />
                            <div>
                              <h4 className="fourth_name ">
                                {item?.chef_id?.name}
                              </h4>
                              <p className="fourth_p text-[#6765EB]">
                                {item?.Cuisines_id?.title}
                              </p>
                            </div>
                          </div>
                        </Link>

                        <div className="flex flex-wrap gap-5 2xl:my-[20px] xl:my-[15px] my-[12px]">
                          {item?.Dietary_id.map((dietary) => (
                            <button className="four_btn" key={dietary._id}>
                              <img
                                src={dietary.ProfileImage}
                                className="2xl:[18px] xl:w-[14px] w-[12px]"
                                alt={dietary.title}
                              />
                              <p className="fourth_day">{dietary.title}</p>
                            </button>
                          ))}
                          <button className="four_btn">
                            <p className="fourth_day">
                              {item?.Nutrition_id?.Nutritional}
                            </p>
                          </button>
                        </div>
                        <div className="flex items-center gap-5  2xl:my-[20px] xl:my-[15px] my-[12px]">
                          <h4 className="fourth_p">Spice level</h4>
                          <button className="four_btn">
                            <img
                              alt="image"
                              src={item.spice_level_id.ProfileImage}
                              className="2xl:w-[13px] 2xl:h-[13px] lg:w-[10px] lg:h-[10px] w-[10px] h-auto"
                            />
                            <p className="fourth_day">
                              {item.spice_level_id.title}
                            </p>
                          </button>
                        </div>

                        <div className=" w-full bottom-0 flex justify-between items-center  2xl:my-[22px] xl:my-[18px] my-[15px]">
                          <p className="alata font-[400] text-[#000] 2xl:text-[20px] 2xl:leading-[24px] xl:text-[14px] xl:leading-[18px] lg:text-[12px] lg:leading-[16px] text-[12px] leading-[16px] ">
                            Serves 1 ({item?.weight}g){" "}
                            <span className="text-[#DB5353]">
                              £{item?.price}
                            </span>
                          </p>
                          {/* <button
                            onClick={() => {
                              defaultADish(item?._id);
                            }}
                          >
                            <div className="drawer-content">
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
                          </button> */}
                          {token ? (
                            <button
                              onClick={() => {
                                setItemId(item?._id);
                                handleAddCart(item?._id);
                              }}
                            >
                              <div className="drawer-content">
                                <label
                                  htmlFor="my-drawer-4"
                                  className="drawer-button"
                                >
                                  <Image
                                    src={addCart}
                                    alt={item.title}
                                    className="2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] lg:w-[25px] lg:h-[25px] w-[25px] h-[25px]"
                                  />
                                </label>
                              </div>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                defaultADish(item?._id);
                              }}
                            >
                              <div className="drawer-content">
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
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:my-14 xl:my-28 my-10">
          <div className="mnavbar 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]">
            <h4 className="nine_head">Testimonials</h4>
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

      {/* ===============Right drawer=============== */}
      <div className="z-50 drawer drawer-end">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={() => {}}
        />

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={handleDrawerClose}
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content 2xl:w-[505px] xl:w-[350px] lg:w-[290px] bg-white 2xl:mt-[116px] xl:mt-[80px] lg:mt-[50px] sm:mt-[45px] mt-12">
            <div className="bg-white hidden lg:block rounded-s-[15px]">
              <div>
                <div className="">
                  <button
                    onClick={handleDrawerClose}
                    className="border rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </button>
                  <h4 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[22px] text-[22px] 2xl:leading-[32px] xl:text-[18px] xl:leading-[24px] lg:text-[14px] lg:leading-[20px]">
                    My Basket
                  </h4>
                </div>

                {cart?.length === 0 && getCartItems?.length === 0 ? (
                  <div>
                    <div className="2xl:mt-40"></div>
                    <h4 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[25px] 2xl:leading-[35px] xl:text-[20px] xl:leading-[28px] lg:text-[16px] lg:leading-[24px] text-center 2xl:mt-24">
                      Explore a World of Deliciousness
                    </h4>
                    <p className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[16px] 2xl:leading-[26px] xl:text-[14px] xl:leading-[20px] lg:text-[12px] lg:leading-[18px] text-center">
                      Add dishes to your cart now.
                    </p>
                    <div className="flex 2xl:mt-12 xl:mt-6 lg:mt-5 mt-4">
                      <button
                        className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[221px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] xl:px-6 xl:py-[10px] lg:px-3 lg:py-1 px-3 py-1"
                        onClick={handleDrawerClose}
                      >
                        Explore Dishes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-end mt-10 md:mr-5">
                      <button
                        className="alata font-[400] rounded-[5px] p-2 text-[20px] bg-[#DB5353] text-white 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] lg:text-[10px]"
                        onClick={() => {
                          handleClearCart();
                          handleCartClear();
                        }}
                      >
                        All Clear
                      </button>
                    </div>
                    <div>
                      {cart?.map((item, index) => {
                        const { data } = item;
                        return (
                          <div
                            key={index}
                            className="my-5 flex w-full border rounded-md"
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div>
                                <img
                                  src={data.ProfileImage}
                                  alt={item.name}
                                  className="w-[90px] h-auto rounded-[5.8px]"
                                />
                              </div>
                              <div>
                                <h4 className="alata font-[400] text-[#111] my-0 text-[18px] leading-[28px]">
                                  {data.name}
                                </h4>
                                <h4 className="alata font-[400] text-[#111] my-0 text-[16px] leading-[22px]">
                                  Price:£{data.price}
                                </h4>
                                <h4 className="alata font-[400] text-[#111] my-0 text-[16px] leading-[22px]">
                                  Quantity:1
                                </h4>
                              </div>
                            </div>
                            <button
                              className="px-4 text-[13px] border rounded h-[25px] text-red hover:bg-[#efb3b38a]"
                              onClick={() => handleRemoveItem(data._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        );
                      })}

                      {Array.isArray(getCartItems) &&
                        getCartItems.map((item, index) => (
                          <div
                            key={index}
                            className="my-5 flex w-full border rounded-md"
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div>
                                <img
                                  src={item.menuItem.ProfileImage}
                                  alt={item.menuItem.name}
                                  className="w-[90px] h-auto rounded-[5.8px]"
                                />
                              </div>
                              <div>
                                <h4 className="alata font-[400] text-[#111] my-0 text-[18px] leading-[28px]">
                                  {item.menuItem.name}
                                </h4>
                                <h4 className="alata font-[400] text-[#111] my-0 text-[16px] leading-[22px]">
                                  Price: £{item.menuItem.price}
                                </h4>
                                <h4 className="alata font-[400] text-[#111] my-0 text-[16px] leading-[22px]">
                                  Quantity: {item.quantity}
                                </h4>
                              </div>
                            </div>
                            <button
                              className="px-4 text-[13px] border rounded h-[25px] text-red hover:bg-[#efb3b38a]"
                              onClick={() =>
                                handleItemRemove(item.menuItem._id)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}

                      <div className="flex justify-between items-center mt-20">
                        <div>
                          <h4 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]"></h4>
                        </div>
                        <div>
                        <Link href="/checkout">
                          <button
                            onClick={() => {
                              handleAddCart();
                            }}
                            className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[164px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] lg:text-[10px] xl:px-6 xl:py-[10px] lg:px-3 lg:py-1 px-3 py-1"
                          >
                            Checkout
                          </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div>
      </div>
      {/* ===============PopUp=============== */}
      <dialog
        id="my_modal_10"
        className="2xl:w-[1000px] 2xl:h-[939px] xl:w-[720px] w-[600px] h-auto mx-auto rounded-[10px]  my-auto 2xl:px-[40px] 2xl:py-[45px] xl:px-[25px] xl:py-[30px] px-[15px] py-[20px]"
      >
        <button
          onClick={() => document.getElementById("my_modal_10").close()}
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
                  <h4 className="pop-head">Chicken kabab</h4>
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
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
                  <p className="fourth_p ">Dish contains i.e Celery, Egg</p>
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center p-4 text-center h-screen">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="2xl:w-[1000px] z-50 xl:w-[720px] w-[600px]  mx-auto rounded-[10px]  my-auto 2xl:px-[40px] 2xl:py-[45px] xl:px-[25px] xl:py-[30px] px-[15px] py-[20px] transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all 2xl:mt-[125px] xl:mt-[85px] lg:mt-[55px] sm:mt-[50px] mt-14 ">
                  <Dialog.Title
                    as="h3"
                    onClick={closeModal}
                    className="cursor-pointer custom_heading_text font-semibold leading-6 text-gray-900 mt lg:mt-0 absolute right-5 text-[30px]"
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </Dialog.Title>
                  <DishDetails dishID={dishID} closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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