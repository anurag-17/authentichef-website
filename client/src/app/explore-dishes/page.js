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
import cheficon from "../assets/Chef-icon.webp";
import Loader from "../admin-module/components/admin/loader/Index";

const ExploreDishes = () => {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [dishID, setDishID] = useState("");
  const closeModal = () => setOpen(false);
  const [getADish, setGetADish] = useState("");
  const dispatch = useDispatch();
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { token } = useSelector((state) => state?.auth);
  const { cart } = useSelector((state) => state?.userCart);
  const [cartId, setCartId] = useState("");
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [isLoading, setLoading] = useState(false);

  // const price = item?.price?.toFixed(2);

  // const data = dish?.data;

  cart.forEach((item, index) => {
    const { data } = item;
    console.log(data, `data from item ${index + 1}`);
  });

  const handleRemoveItem = (_id) => {
    console.log(_id, "iggg");
    dispatch(removeItemFromCart({ _id }));
  };
  const handleLoginClick = () => {
    document.getElementById("my_modal_2").showModal();
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    router.push("/explore-dishes");
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
    setLoading(true);
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
        setLoading(false);
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
    setLoading(true);
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
            setLoading(false);
          } else {
            setLoading(false);
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // ========= Filter By Dietary =======
  const [dietaryFilter, setDietaryFilter] = useState("");
  const handleSearchDietary = (_id) => {
    setLoading(true);
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

            setLoading(false);
          } else {
            setLoading(false);
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
        });
    } catch {
      console.error(error);
      setLoading(false);
    }
  };

  // ========= Filter By MoreFilter =======

  const [moreFilters, setMoreFilters] = useState("");

  const handleSearchMoreFilter = (_id) => {
    setLoading(true);
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

            setLoading(false);
          } else {
            setLoading(false);
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
        });
    } catch {
      console.error(error);
      setLoading(false);
    }
  };

  // ========= Add to Cart =======

  // const handleAddToCart = async (id) => {
  //    setLoading(true);
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
  //        setLoading(false);
  //     } else {
  //       // toast.error("Failed. Something went wrong!");
  //        setLoading(false);
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
    setLoading(true);

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
      setLoading(false);
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
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleAddCart = async (id) => {
    try {
      // Ensure id is an array
      let ids = Array.isArray(id) ? id : [id];

      // Create the payload with menuItems and default quantity
      let payload = {
        items: ids.map((id) => ({
          menuItem: id,
          quantity: 1, // Default quantity is set to 1
        })),
      };
      if (!token) {
        toast.error("You need to be logged in to add items to the cart.");
        return;
      }
      const response = await axios.post(
        `${config.baseURL}/api/Orders/AddtoCart`,
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("Items added to cart successfully");
        handleDrawerOpen();
        refreshData();
      } else {
        toast.error("Failed to add items to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding items to cart:", error);
    }
  };

  const [getCartItems, setGetCartItems] = useState({});
  useEffect(() => {
    if (token) {
      defaultCartItems();
    }
  }, [token, isRefresh]);

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
        router.push("/explore-dishes");
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
        setLoading(false);
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

  // useEffect(() => {
  //   const loadCartFromLocalStorage = () => {
  //     const savedCart = localStorage.getItem('cart');
  //     if (savedCart) {
  //       setGetCartItems(JSON.parse(savedCart));
  //     }
  //   };

  //   if (token) {
  //     defaultCartItems();
  //   } else {
  //     loadCartFromLocalStorage();
  //   }
  // }, [token, isRefresh]);

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
      .then(async (response) => {
        const userCart = response?.data?.userCart;
        const cartItems = userCart?.items.map((item) => ({
          ...item,
          totalPrice: item.menuItem.price * item.quantity,
        }));
        console.log("User cart is -------------->>>>>>>>>>>>>", userCart._id);
        setGetCartItems(cartItems);
        setUpdatedCartItems(cartItems); // Initializing updatedCartItems with fetched data
        setSubtotalPrice(
          cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
        );
        setShippingCost(userCart.Shipping_cost ?? 0); // Set the shipping cost
        setCartId(userCart._id); // Set the cart ID inside the .then callback

        // Update quantities for default cart items
        for (const item of cartItems) {
          await updateCartItemQuantity(
            userCart._id,
            item.menuItem._id,
            item.quantity
          );
        }
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  // const [cart, setCart] = useState([]);
  // const [count, setCount] = useState(1);

  // Function to handle decrement
  const handleIncrement = (itemId) => {
    setGetCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.menuItem.price * (item.quantity + 1),
            }
          : item
      );
      setUpdatedCartItems(updatedCartItems);
      return updatedCartItems;
    });

    setShouldRefresh(true);
  };

  const updateCartItemQuantity = async (cartId, menuId, quantity) => {
    try {
      const response = await axios.put(
        `${config.baseURL}/api/Orders/updateItem/${menuId}`,
        { quantity },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("Cart item updated successfully");
      } else {
        console.log("Failed to update cart item", response.data.message);
      }
    } catch (error) {
      console.log("Error updating cart item:", error);
    }
  };

  const handleDecrement = (itemId) => {
    setGetCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.menuItem.price * (item.quantity - 1),
            }
          : item
      );
      setUpdatedCartItems(updatedCartItems);
      return updatedCartItems;
    });

    setShouldRefresh(true);
  };

  useEffect(() => {
    if (shouldRefresh) {
      getCartItems.forEach((item) => {
        updateCartItemQuantity(cartId, item.menuItem._id, item.quantity);
      });

      // Recalculate the subtotal price after updating quantities
      const newSubtotalPrice = getCartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      setSubtotalPrice(newSubtotalPrice);

      setShouldRefresh(false);
    }
  }, [shouldRefresh, cartId, getCartItems]);

  useEffect(() => {
    console.log("Updated Cart Items:", updatedCartItems);
  }, [updatedCartItems]);

  return (
    <>
      <ToastContainer className="mt-24" autoClose={1000} />
      {isLoading && <Loader />}
      <section>
        <Navbar />

        <div class="2xl:pt-[130px] xl:pt-[90px] pt-[60px] ">
          <div class="main_section 2xl:w-[1600px] xl:w-[1200px] md:w-[811px]  m-auto mt-auto mnavbar 2xl:py-[40px] xl:py-[30px] lg:py-[20px]">
            <div class="flex justify-between flex-col md:flex-row   ">
              <div class=" lg:mb-0 mb-4 lg  lg:text-[2.25rem]  md:w-[30%] xs:text-[1.875rem] sm:text-[2.25rem] md:text-[29px]">
                <h1 className="third_head mb-4 alata font-[400] 2xl:text-[40px] lg:text-left  text-center SelectCuisine">

                  Select Cuisine
                </h1>
              </div>


              <div className="mnavbar sm:pt-[12px] sm:pb-[4px] 2xl:pt-[21px] md:pt-[9px] md:w-[820px]   ">
                {/* 2xl:py-[60px] xl:py-[10px] lg:pt-[7px] lg:pb-[40px]  py-[40px] xs:py-[10px] */}

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
                  {/* =================Cuisines========================== */}
                  <button
                    onClick={defaultDish}
                    className=" bt-1 alata font-[400] 2xl:text-[16px] 2xl:w-[153px] third_select flex justify-center items-center gap-3 md:text-[12px] sm:text-[12px] md:pl-2 sm:pl-2 flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    Reset
                  </button>
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
                    className="filtermodale modal relative bg-base-100  justify-center items-center xl:mt-52 2xl:mt-72 2xl:w-[1660px] xl:w-[1200px] lg:w-[850px] 2xl:h-[520px] xl:h-[350px] 2xl:px-[0px] 2xl:py-[75px] xl:px-[30px] xl:py-[40px] "
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
                    <div className=" flex flex-wrap gap-[20px]  2xl:w-[1602px] xl:w-[1050px] h-auto mx-[0px] optionDiv">
                      {/* ================= Cuisines =========== */}
                      <button>
                        <div className="dropbox all_cuisines">
                          <Image
                            src={allCuisines}
                            className="optionimg bt-1 rounded-[5px] 2xl:w-[74px] 2xl:h-[74px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]"
                          />
                          <h4>All Cuisines</h4>
                        </div>
                      </button>

                      {Array.isArray(getAllCuisines) &&
                        getAllCuisines.map((item) => (
                          <button
                            key={item._id}
                            onClick={() => handleSearchCuisines(item._id)}
                            className=""
                          >
                            <div className="dropbox">
                              <img
                                src={item.ProfileImage}
                                className="optionimg rounded-[5px] 2xl:w-[74px] 2xl:h-[74px] h-auto xl:w-[50px] lg:w-[] sm:w-[] w-[]  "
                              />
                              <h4 className="capitalize">{item.title}</h4>
                            </div>
                          </button>
                        ))}

                      {/* ================= Dietary=========== */}
                    </div>
                  </dialog>

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
                    className="filtermodal2 modal relative bg-base-100 flex justify-center items-center xl:mt-52 2xl:mt-72 2xl:w-[1660px] xl:w-[1200px] lg:w-[850px] 2xl:h-[420px] xl:h-[350px] 2xl:px-[0px] 2xl:py-[75px] xl:px-[30px] xl:py-[40px] "
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
                    <div className=" flex flex-wrap gap-[20px]  2xl:w-[1602px] xl:w-[1050px] h-auto mx-[0px] optionDiv">
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
                              <div className="flex items-center optionimgs border bg-[#EEEEEE] rounded-[5px] 2xl:w-[56px] 2xl:h-[56px]  xl:w-[40px] xl:h-[40px] lg:w-[] sm:w-[]">
                                <img
                                  src={item.ProfileImage}
                                  className=" mx-auto "
                                />
                              </div>
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
                    className="filtermodal3 modal relative bg-base-100 flex justify-center items-center xl:mt-52 2xl:mt-72 2xl:w-[1660px] xl:w-[1200px] lg:w-[850px] 2xl:h-[300px] xl:h-[350px] 2xl:px-[0px] 2xl:py-[75px] xl:px-[30px] xl:py-[40px] "
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
                    <div className=" flex flex-wrap gap-[20px]  2xl:w-[1602px] xl:w-[1050px] h-auto mx-[0px] optionDiv">
                      {/* ================= Dish Type =========== */}

                      <div className="flex justify-around 2xl:w-[1602px] w-full h-auto mx-auto">
                        <div>
                          <h4 className="alata font-[400] 2xl:text-[20px] xl:text-[14px] lg:text-[10px] sm:text-[] text-[] my-1 2xl:my-2 ">
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
                                    <div className="flex items-center optionimgs border bg-[#EEEEEE] rounded-[5px] 2xl:w-[56px] 2xl:h-[56px]  xl:w-[40px] xl:h-[40px] lg:w-[] sm:w-[]">
                                      <img
                                        src={item.ProfileImage}
                                        className=" mx-auto"
                                      />
                                    </div>
                                    <h4 className="capitalize">{item.title}</h4>
                                  </div>
                                </button>
                              ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="alata font-[400] 2xl:text-[20px] xl:text-[14px] lg:text-[10px] sm:text-[] text-[] my-1 2xl:my-2 ">
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
                                    <div className="flex items-center optionimgs border bg-[#EEEEEE] rounded-[5px] 2xl:w-[56px] 2xl:h-[56px]  xl:w-[40px] xl:h-[40px] lg:w-[] sm:w-[]">
                                      <img
                                        src={item.ProfileImage}
                                        className="mx-auto  "
                                      />
                                    </div>
                                    <h4 className="capitalize">{item.title}</h4>
                                  </div>
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </dialog>

                  <div className="more_filter bt-1 relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-[13px] h-[13px] absolute 2xl:right-3 2xl:top-[16px] xl:right-3 xl:top-[10px] lg:right-3 lg:top-[5px] lg:text-[8px] md:mt-1.5 sm:mt-1.5"
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
                      className="relative md:pl-4 sm:pl-4  third_input text-[#F38181] md:text-[16px] sm:text-[13px] rounded-lg outline-[#F38181]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="  flex flex-col sm:flex-row justify-center lg:justify-between  ">
              {/* gap-[5px] xl:gap-[10px] 2xl::gap-[21px] xs:gap-4 */}
              <div class=" flex flex-wrap gap-[10px] w-full justify-center md:justify-between my-5 lg:my-0 ">
                {Array.isArray(getAllCuisines) &&
                  getAllCuisines.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handleSearchCuisines(item._id)}
                      className="mcusinimgs buttonHov"
                    >
                      {" "}
                      <img
                        src={item.ProfileImage}
                        className="rounded-[5px] 2xl:w-[103px] 2xl:h-[103px] xl:w-[144px] xl:h-[144px] lg:w-[100px] lg:h-[100px] w-[65px] mcusinimg hover:opacity-[0.5] mx-auto md:mx-0"
                        alt="cuisine-india"
                      />
                      <h4 class="alata font-[400] sm:text-[11px] text-center text-[#000] text-[10px] 2xl:text-[15px] xl:text-[14px] md:text-[10px] mt-1 md:mt-3">
                        {item.title}
                      </h4>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Dishes */}

        <div className="sm:col-2">

          <div className=" ">
            {/* 2xl:py-[120px] xl:py-[20px] py-[50px] */}
            <div className="mnavbar 2xl:w-[1600px] xl:w-[1200px] lg:w-[850px]  md:w-[700px] w-[90%] mx-auto">
              {Array.isArray(getAllDish) && getAllDish.length > 0 ? (
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[25px] lg:gap-[20px] xl:gap-[45px] 2xl:gap-[20px] md:my-5 lg:my-0 md:px-5 lg:px-0 exploreDishesmain">
                  {getAllDish.map((item) => (
                    <div
                      key={item.id}
                      className=" col-span-1 mx-auto sm:mx-0 relative rounded-[9.8px] mexploreD p-2"

                    >
                      <button className="" onClick={() => openModal(item._id)}>
                        <img
                          src={item.ProfileImage}
                          alt={item.title}
                          width={345}
                          height={278}
                          className="2xl:w-[365.5px] 2xl:h-[278px] xl:w-[280px] xl:h-[200px] lg:w-[220px] lg:h-[160px] w-[366px] h-[260px] rounded-[10px] mexplorimg"
                        />
                      </button>
                      <div className="">
                        <button
                          className=""
                          onClick={() => openModal(item._id)}
                        >
                          <h4 className="alata capitalize font-[400] text-[#DB5353] 2xl:my-4 xl:my-3 my-2 2xl:text-[20px] 2xl:leading-[20px] xl:text-[14px] xl:leading-[18px] lg:text-[10px] lg:leading-[16px] text-[16px]">
                            {item.name}
                          </h4>
                        </button>
                        <Link
                          href={`/pages/chef-details/${item?.chef_id?._id}`}
                        >
                          <div className="flex items-center 2xl:gap-3 xl:gap-2 lg:gap-2 gap-2 xl:my-3 lg:my-2 my-2">
                            {item?.chef_id?.images ? (
                              <img
                                alt="image"
                                src={item.chef_id.images}
                                className="four_img2 border-[2px] border-[#DB5353]"
                              />
                            ) : (
                              <Image src={cheficon} className="four_img2" />
                            )}
                            <div>
                              <h4 className="fourth_name capitalize ">
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
                            <div className="four_btn" key={dietary._id}>
                              <img
                                src={dietary.ProfileImage}
                                className="2xl:h-[18px] 2xl:w-[18px] w-[16px] h-[16px]"
                                alt={dietary.title}
                              />
                              <p className="fourth_day capitalize">
                                {dietary.title}
                              </p>
                            </div>
                          ))}
                          {item?.Nutrition_id?.Nutritional ? (
                            <div className="four_btn">
                              <p className="fourth_day capitalize">
                                {item?.Nutrition_id?.Nutritional}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex items-center gap-5 2xl:my-[20px] xl:my-[15px] my-[12px]">
                          <h4 className="fourth_p">Spice level</h4>
                          <button className="four_btnn border">
                            <img
                              alt="image"
                              src={item.spice_level_id.ProfileImage}
                              className="w-[100%] h-auto"
                            />
                            <p className="fourth_day capitalize">
                              {item.spice_level_id.title}
                            </p>
                          </button>
                        </div>
                        <div className="w-full bottom-0 flex justify-between items-center 2xl:my-[22px] xl:my-[18px] my-[15px]">
                          <p className="alata font-[400] text-[#000] 2xl:text-[20px] leading-[24px] text-[14px]">
                            Serves {item?.portion_Size} | ({item?.weight}g) |
                            <span className="text-[#DB5353]">
                              {item?.price && `£${item.price.toFixed(2)}`}
                            </span>
                          </p>
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
                                    className="cursor-pointer 2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] lg:w-[25px] lg:h-[25px] w-[25px] h-[25px]"
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
                                    className="cursor-pointer 2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] lg:w-[25px] lg:h-[25px] w-[25px] h-[25px]"
                                  />
                                </label>
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center w-full"></div>
                </div>
              ) : (
                <div className="text-center my-5">
                  <h2 className="text-[40px] font-bold">No dishes found</h2>
                  <div className="flex justify-center"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center 2xl:py-[100px] xl:py-[50px] md:py-[50px] py-[30px]">
          <div className="mnavbar custom_container">
            <h4 className="nine_head">Testimonials</h4>
            <p className="nine_p text-center">
              All our chefs have fans raving about their food
            </p>

            <div className="lg:flex justify-around 2xl:my-10 xl:my-8 lg:my-6 my-3">
              <div className="md:w-2/4 sm:w-1/3 mx-auto my-5 lg:my-0 lg:mx-0 lg:w-auto">
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
                <div className="md:w-2/4 sm:w-1/3 mx-auto my-5 lg:my-0 lg:mx-0 lg:w-auto">
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
                <div className="md:w-2/4 sm:w-1/3 mx-auto my-5 lg:my-0 lg:mx-0 lg:w-auto">
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

                    <div className="flex justify-center 2xl:mt-12 xl:mt-6 lg:mt-5 mt-4 w-full">
                      <Link href="/explore-dishes">
                        <button className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[221px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] xl:px-6 xl:py-[10px] lg:px-3 lg:py-1 px-3 py-1">
                          Explore Dishes
                        </button>
                      </Link>
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
                                  alt={data.name}
                                  className="w-[90px] h-auto rounded-[5.8px]"
                                />
                              </div>
                              <div>
                                <h4 className="alata font-[400] text-[#111] my-0 text-[18px] leading-[28px]">
                                  {data.name}
                                </h4>
                                <h4 className="alata font-[400] text-[#111] my-0 text-[16px] leading-[22px]">
                                  Price: £{data.price}
                                </h4>
                                <div className="flex justify-center 2xl:w-[103px] 2xl:h-[39px] xl:w-[60px] xl:h-[22px] lg:w-[50px] lg:h-[20px] border rounded-[5px]">
                                  {token ? (
                                    <>
                                      <button
                                        className="text-[#DB5353] rounded-l w-1/3"
                                        onClick={() =>
                                          handleDecrement(item._id)
                                        }
                                      >
                                        <Image
                                          src={minus}
                                          className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w/[8px] lg:h/[8px] mx-auto"
                                          alt="decrement"
                                        />
                                      </button>
                                      <p className="flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px]">
                                        {item.quantity}
                                      </p>
                                      <button
                                        className="text-[#DB5353] rounded-r w-1/3"
                                        onClick={() =>
                                          handleIncrement(item._id)
                                        }
                                      >
                                        <Image
                                          src={plus}
                                          className="2xl:w-[15px] 2xl:h-[15px] xl:w/[10px] xl:h/[10px] lg:w/[8px] lg:h/[8px] mx-auto"
                                          alt="increment"
                                        />
                                      </button>
                                    </>
                                  ) : (
                                    <p className="flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px]">
                                      1
                                    </p>
                                  )}
                                </div>
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
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
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
                                  Price:{" "}
                                  {item?.menuItem?.price &&
                                    `£${item.menuItem.price.toFixed(2)}`}
                                </h4>
                                <div className="flex justify-center 2xl:w-[103px] 2xl:h-[39px] xl:w-[60px] xl:h-[22px] lg:w-[50px] lg:h-[20px] border rounded-[5px]">
                                  {token ? (
                                    <>
                                      <button
                                        className="text-[#DB5353] rounded-l w-1/3"
                                        onClick={() =>
                                          handleDecrement(item._id)
                                        }
                                      >
                                        <Image
                                          src={minus}
                                          className="2xl:w/[15px] 2xl:h/[15px] xl:w/[10px] xl:h/[10px] lg:w/[8px] lg:h/[8px] mx-auto"
                                          alt="decrement"
                                        />
                                      </button>
                                      <p className="flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px]">
                                        {item.quantity}
                                      </p>
                                      <button
                                        className="text-[#DB5353] rounded-r w-1/3"
                                        onClick={() =>
                                          handleIncrement(item._id)
                                        }
                                      >
                                        <Image
                                          src={plus}
                                          className="2xl:w/[15px] 2xl:h/[15px] xl:w/[10px] xl:h/[10px] lg:w/[8px] lg:h/[8px] mx-auto"
                                          alt="increment"
                                        />
                                      </button>
                                    </>
                                  ) : (
                                    <p className="flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px]">
                                      1
                                    </p>
                                  )}
                                </div>
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
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      <p className="font-[500] text-[16px]">
                        FREE delivery on orders over £55{" "}
                      </p>
                      <div className="flex justify-between mt-4">
                        <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                          Total :
                        </h4>
                        <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                          £{subtotalPrice.toFixed(2)}
                        </h4>
                      </div>
                      <div className="flex justify-between items-center mt-20">
                        <div>
                          <h4 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[12px] xl:leading/[20px] lg:text/[10px] lg:leading/[18px]"></h4>
                        </div>
                        <div>
                          {token ? (
                            <Link href="/checkout">
                              <button
                                onClick={() => {
                                  handleAddCart();
                                }}
                                className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[164px] 2xl:h-[56px] 2xl:text/[20px] 2xl:leading-[27.6px] xl:text/[12px] lg:text/[10px] xl:px-[6px] xl:py-[10px] lg:px-[3px] lg:py-[1px] px-[3px] py-[1px]"
                              >
                                Checkout
                              </button>
                            </Link>
                          ) : (
                            <div>
                              {/* {cart?.length === 0 &&
                              getCartItems?.length === 0 ? ( */}
                              <button
                                onClick={handleLoginClick}
                                className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w/[164px] 2xl:h/[56px] 2xl:text/[20px] 2xl:leading/[27.6px] xl:text/[12px] lg:text/[10px] xl:px-[6px] xl:py/[10px] lg:px/[3px] lg:py/[1px] px/[3px] py/[1px]"
                              >
                                Checkout
                              </button>
                              {/* ) : (
                                <button
                                  onClick={handleDrawerClose}
                                  className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w/[164px] 2xl:h/[56px] 2xl:text/[20px] 2xl:leading/[27.6px] xl:text/[12px] lg:text/[10px] xl:px-[6px] xl:py/[10px] lg:px/[3px] lg:py/[1px] px/[3px] py/[1px]"
                                >
                                  Checkout
                                </button>
                              )} */}
                            </div>
                          )}
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
                    onClick={() => handleDecrement(item._id)}
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
                    onClick={() => handleIncrement(item._id)}
                  >
                    <Image
                      src={plus}
                      className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                    />
                  </button>
                </div>
                <div>
                  <button className="pop-btn" onClick={updateCartItemQuantity}>
                    Add to basket
                  </button>
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
                <Dialog.Panel className="2xl:w-[1000px] z-50 xl:w-[720px] w-[600px]  mx-auto rounded-[20px]  my-auto 2xl:px-[40px] 2xl:py-[45px] xl:px-[25px] xl:py-[30px] px-[15px] py-[20px] transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all 2xl:mt-[125px] xl:mt-[85px] lg:mt-[55px] sm:mt-[50px] mt-14 ">
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
                  <DishDetails
                    defaultADish={defaultADish}
                    setItemId={setItemId}
                    handleAddCart={handleAddCart}
                    dishID={dishID}
                    closeModal={closeModal}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ExploreDishes;
