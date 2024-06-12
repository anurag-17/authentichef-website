"use client";
import dynamic from "next/dynamic";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import maggie from "../assets/maggie.png";
import calen from "../assets/calender.png";
import microweb from "../assets/microweb.png";
import eightPoster from "../assets/food-safety.png";
import plate1 from "../assets/ourcommitment-1st.png";
import plate2 from "../assets/ourcommitment-2nd.png";
import plate3 from "../assets/ourcommitment-3rd.png";
import plate4 from "../assets/ourcommitment-4rt.png";
import "@splidejs/react-splide/css/core";
import Link from "next/link";
import Navbar from "../navbar";
import offer from "../assets/offer.svg";
import howworkbanner from "../assets/how-it-works-banner.png";
import Footer from "../footer";
import axios from "axios";
import addCart from "../../../public/images/addCart.svg";
import DishDetails from "../explore-dishes/dish-details/page";
import { Dialog, Transition } from "@headlessui/react";
import {
  addItemToCart,
  clearCart,
  decrementQuantity,
  incrementCartItemQuantity,
  removeItemFromCart,
} from "../redux/dishSlice";
import { useDispatch, useSelector } from "react-redux";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";
import cheficon from "../assets/Chef-icon.webp";
import CloseIcon from "./svg/CloseIcon";
import { MinusIcon } from "./svg/MinusIcon";
import PlusIcon from "./svg/PlusIcon";
import DeleteIcon from "./svg/DeleteIcon";

const LandingPage = () => {
  const { token } = useSelector((state) => state?.auth);
  const [isRefresh, setRefresh] = useState(false);
  const [itemId, setItemId] = useState("");

  const [getAllDish, setGetAllDish] = useState({});
  console.log(getAllDish, "dis");
  const [isOpen, setOpen] = useState(false);
  const [getADish, setGetADish] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dishID, setDishID] = useState("");
  const closeModal = () => setOpen(false);
  const dispatch = useDispatch();
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { cart } = useSelector((state) => state?.userCart);
  const cartData = cart[0]?.data?._id;
  const quantity = cart[0]?.quantity;
  cart.forEach((item, index) => {
    const { data } = item;
    console.log(data, `data from item ${index + 1}`);
  });

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
  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/api/Orders/deleteCartItem/${itemId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Item Removed From Cart");

        // Update the local state only if the backend confirms the deletion
        setGetCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.menuItem._id !== itemId)
        );
        setShouldRefresh(true); // Trigger any necessary refresh actions
      } else {
        alert("Failed to remove item");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Server error");
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  function openModal(id) {
    setDishID(id);
    setOpen(true);
  }

  useEffect(() => {
    defaultDish();
  }, []);
  const defaultDish = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/menu/menuItems/popular`,
      // params: {
      //   Cuisines_id: cuisinesFilter,
      //   Dietary_id: dietaryFilter,
      //   Dishtype_id: moreFilters,
      // },
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllDish(response?.data);
        console.log(response?.data, "dish");
        // console.log(response?.data, "DATA");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

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

        // console.log(response?.data, "haryy");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
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
        refreshData();
        handleDrawerOpen();
      } else {
        toast.error("Failed to add items to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding items to cart:", error);
      toast.error(
        "An error occurred while adding items to cart. Please try again."
      );
    }
  };
  const [getCartItems, setGetCartItems] = useState({});
  useEffect(() => {
    defaultCartItems();
  }, [!isRefresh]);

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

  const [getAllChef, setGetAllChef] = useState("");
  useEffect(() => {
    defaultChef();
  }, []);
  const defaultChef = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/chef/chefs`,

      headers: {
        authorization: token,
      },
    };
    axios.request(option).then((response) => {
      setGetAllChef(response?.data?.chefs);
      // console.log(response?.data?.chefs, "chef");
    });
  };
  const handleLoginClick = () => {
    document.getElementById("my_modal_2").showModal();
  };
  const handleQuantityIncrement = (id) => {
    dispatch(incrementCartItemQuantity(id));
  };
  const handleQuantityDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
  const handleItemRemove1 = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success("Item Removed From Cart");
  };
  const [testimonials, setTestimonials] = useState("");
  useEffect(() => {
    defaultTestimonial();
  }, []);
  const defaultTestimonial = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/Testimonial/testimonals`,
    };
    axios
      .request(option)
      .then((response) => {
        setTestimonials(response?.data);
        console.log(response?.data, "testi");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <Navbar />
      <section className="">
        {/* ===================Second================== */}

        <div className="hidden lg:block 2xl:h-screen">
          <div className="poster-bg flex justify-center ">
            <div className="">
              <h1 className="alata font-[400] text-white 2xl:text-[65px] 2xl:leading-[70px] xl:text-[46px] xl:leading-[55px] 2xl:pt-[54%] xl:pt-[45%] lg:text-[35px] lg:leading-[30px] md:text-[35px] lg:pt-[50%] pt-[50%] mx-auto mdestination">
                Where’s your next food destination?
              </h1>
              <div className="flex justify-center 2xl:mt-12 xl:mt-6 lg:mt-5 mt-4">
                <Link href="/explore-dishes">
                  <button className=" alata font-[400] bg-[#DB5353] text-white rounded-[5px] 2xl:w-[218px] 2xl:h-[60px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[14px] xl:w-[150px] xl:py-[10px] lg:px-5 lg:py-2 md:px-5 py-[10px] hover:bg-[#7e2727]  ">
                    Explore Dishes
                  </button>
                </Link>
              </div>
              {/* <div className="flex 2xl:mt-14 xl:mt-8 lg:mt-5 mt-4">
                <h4
                  className="alata font-[400] mx-auto text-white 2xl:text-[40px] 2xl:leading-[20px] xl:text-[25px] xl:leading-[20px]
              lg:text-[20px] lg:leading-[20px]  "
                >
                  Save 30% on your first order
                </h4>
              </div> */}
            </div>
          </div>
        </div>
        <div className="lg:hidden block pt-[70px] pb-[20px]">
          <div className=" pb-[25px] px-[20px]">
            <h4 className="alata font-[400] text-black mx-auto text-[30px] leading-[40px] text-center">
              Where’s your next food destination?
            </h4>
            <div className="flex justify-center mt-4">
              <Link href="/explore-dishes">
                <button className=" alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] px-4 py-2 border border-white">
                  Explore Dishes
                </button>
              </Link>
            </div>
            {/* <div className="flex mt-4">
                <h4 className="alata font-[400] mx-auto text-white">
                Save 30% on your first order
                </h4>
              </div> */}
          </div>

          <div className=" ">
            <Image
              src="/images/mobile _image.png"
              height="400"
              width="500"
              objectFit="cover"
              alt="background"
              className="w-full"
            />
          </div>

          {/* <div className=" Fv  h-screen flex justify-center "> */}
        </div>
        <div className="offer-bg flex justify-center items-center 2xl:gap-[30px] xl:gap-[10px] gap-[8px] 2xl:h-[150px] xl:h-[100px] md:h-[60px] h-[40px] moffers">
          <Image
            src={offer}
            className="2xl:w-[48px] 2xl:h-[48px] 2xl:w-[30px] 2xl:h-[30px] md:w-[25px] md:h-[25px]  w-[20px] sm:h-[20px]"
          />
          <h3 className="alata font-[400] 2xl:text-[40px] 2xl:leading-[50px] xl:text-[25px] leading-[35px] md:text-[20px] text-[14px] sm:text-[14px]">
            30% off on your first order ‘WELCOME30’
          </h3>
        </div>

        {/* ===================Third================== */}

        {/* ===================Four================== */}

      
        <div className="flex justify-center 2xl:py-[100px] xl:py-[70px]  lg:py-10 py-10 bg-[#F9F2F2]">
          <div className="custom_container mnavbar">
            <div className="flex">
              <h2 className="four_head nine_head">Popular Dishes</h2>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap md:gap-[25px] lg:gap-[21px] xl:gap-[32px] 2xl:gap-[35px] md:my-5 lg:my-0  sm:px-0  exploreDishesmain ">
              {Array.isArray(getAllDish) &&
                getAllDish.map((item, index) => (
                  <div
                    key={item.id}
                    className=" mt-5 2xl:w-[371px] 2xl:h-[560px] lg:w-[23%] sm:w-[45%] md:w-[48%] w-full relative rounded-[9.8px] mexploreD  "
                  >
                    {console.log("ssss", item?.chef_id?.images)}
                    <div className="w-full flex justify-center">
                      <button
                        className="w-full"
                        onClick={() => openModal(item._id)}
                      >
                        <img
                          alt="spaghetti"
                          src={item?.ProfileImage[0]}
                          className="2xl:w-[365.5px] 2xl:h-[278px] xl:w-[280px] xl:h-[200px] lg:w-[220px] lg:h-[160px] w-[100%] h-[283px] object-cover rounded-[10px] mexplorimg"
                        />
                      </button>
                    </div>
                    <div className="">
                      <button className="" onClick={() => openModal(item._id)}>
                        <h4 className="alata cursor-pointer capitalize font-[400] text-[#DB5353] 2xl:my-4 xl:my-3 my-2 2xl:text-[20px] 2xl:leading-[20px]  xl:text-[14px] xl:leading-[18px] lg:text-[10px] lg:leading-[16px] text-[18px]">
                          {item.name}
                        </h4>
                      </button>

                      {/* ===============Chef ============= */}
                      <Link href={`/pages/chef-details/${item?.chef_id?._id}`}>
                        <div className="flex items-center 2xl:gap-3 xl:gap-2 lg:gap-2  gap-2 xl:my-3 lg:my-2 my-2">
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
                            <p className="capitalize text-[#6765EB] alata font-[400] 2xl:text-[16px] 2xl:leading-[20px] xl:text-[14px] xl:leading-[18px] lg:text-[12px] lg:leading-[18px] md:text-[14px] md:leading-[22px] text-[12px] leading-[18px]">
                              {item?.chef_id?.nationality}
                            </p>
                          </div>
                        </div>
                      </Link>

                      <div className="flex gap-5 2xl:my-[20px] xl:my-[15px] my-[12px]">
                        <button className="four_btn">
                          <img
                            alt="image"
                            src={item?.Dietary_id[0]?.ProfileImage}
                            className="2xl:w-[13px] 2xl:h-[13px] lg:w-[10px] lg:h-[10px] w-[10px] h-auto"
                          />
                          <p className="fourth_title capitalize">
                            {item?.Dietary_id[0]?.title}
                          </p>
                        </button>
                        {item?.Nutrition_id?.Nutritional ? (
                          <div className="four_btn">
                            <p className="fourth_title capitalize">
                              {item?.Nutrition_id?.Nutritional}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex items-center gap-5  2xl:my-[20px] xl:my-[15px] my-[12px]">
                        <h4 className="fourth_title">Spice level</h4>
                        <button className="four_btnn border">
                          <img
                            alt="image"
                            src={item.spice_level_id.ProfileImage}
                            className=" w-[100%] h-auto"
                          />
                          <p className="fourth_title capitalize">
                            {item.spice_level_id.title}
                          </p>
                        </button>
                      </div>

                      <div className=" w-full bottom-0 flex justify-between items-center  2xl:my-[22px] xl:my-[18px] my-[15px]">
                        <p className="alata font-[400] text-[#000] 2xl:text-[20px] 2xl:leading-[24px] xl:text-[14px] xl:leading-[18px] lg:text-[12px] lg:leading-[16px] text-[16px] leading-[16px] ">
                          Serves {item?.portion_Size} |({item?.weight}g) |
                          <span className="text-[#DB5353]">
                            {item?.price && `£${item.price.toFixed(2)}`}
                          </span>
                        </p>
                        {token ? (
                          <button
                            className="cursor-pointer"
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
                                  className="cursor-pointer flex justify-center 2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] lg:w-[25px] lg:h-[25px] w-[25px] h-[25px]"
                                />
                              </label>
                            </div>
                          </button>
                        ) : (
                          <button
                            className="cursor-pointer"
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
                                  className=" cursor-pointer flex justify-center 2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] lg:w-[25px] lg:h-[25px] w-[25px] h-[25px]"
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


        {/* ===================Five================== */}

        <div className=" flex justify-center bg-white 2xl:py-[100px] xl:py-[70px]  lg:py-10 py-10">
          <div className="custom_container w-[95%]  mx-auto mnavbar">
            <div className=" flex justify-center ">
              <div className="">
                <div className="mx-auto">
                  <h2 className=" nine_head">How it Works?</h2>
                  <p className="five_p 2xl:pt-[35px] xl:pt-2 lg:pt-2 pt-2">
                    We understand the demands of busy lives without compromising
                    on the quality of personalised meal choices on a daily
                    basis.
                  </p>
                  <p className="five_p 2xl:pt-[25px] xl:pt-2 lg:pt-2 pt-2">
                    Say goodbye to meal prep hassles and hello to truly
                    authentic, chef-crafted meals that take you on a culinary
                    journey around the globe - delivered directly to you.
                  </p>
                </div>
                <div>
                  <Image
                    src={howworkbanner}
                    className="2xl:h-[400px] h-auto 2xl:my-[60px] xl:my-[45px] my-[30px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-around ">
              <div className="2xl:w-[425px] lg:w-[350px] sm:w-1/2 w-2/3 mx-auto lg:mx-0 my-5 ">
                <div>
                  <div>
                    <Image
                      alt="image"
                      src={maggie}
                      className="mx-auto 2xl:w-[77.89px] 2xl:h-[94px] xl:w-[50px] xl:h-auto lg:w-auto lg:h-[50px] sm:w-[40px] sm:h-[50px] w-[35px] h-[35px]"
                    />
                  </div>
                  <h4 className="five_head2 2xl:w-auto xl:w-[302px] lg:w-[250px]">
                    Select dishes based on your dietary preferences
                  </h4>
                  <p className="five_ps text-center  mx-auto lg:mx-0 ">
                    Mix and match from a range of global dishes
                  </p>
                </div>
              </div>
              <div className="2xl:w-[425px] lg:w-[350px] sm:w-1/2 mx-auto lg:mx-0 my-5 ">
                <div>
                  <div>
                    <Image
                      alt="image"
                      src={calen}
                      className="mx-auto 2xl:w-[89.2px] 2xl:h-[94px] xl:w-[50px] xl:h-auto lg:w-[40px] lg:h-auto sm:w-[40px] sm:h-[50px] w-[35px] h-[35px]"
                    />
                  </div>
                  <h4 className="five_head2">
                    Choose your preferred delivery date
                  </h4>
                  <p className="five_ps text-center  mx-auto">
                    We deliver all your dishes in sustainable recyclable
                    packaging, without compromising on dish quality
                  </p>
                </div>
              </div>
              <div className="2xl:w-[425px]  lg:w-[350px] sm:w-1/2 mx-auto lg:mx-0 my-5 ">
                <div>
                  <div>
                    <Image
                      alt="image"
                      src={microweb}
                      className="mx-auto 2xl:w-[94px] 2xl:h-[calculated_height_2xl] xl:w-[50px] xl:h-[calculated_height_xl] lg:w-[40px] lg:h-[calculated_height_lg] sm:w-[40px] sm:h-[calculated_height_sm] w-[35px] h-[calculated_height_default];
"
                    />
                  </div>
                  <h4 className="five_head2">Heat and enjoy the experience</h4>
                  <p className="five_ps text-center  mx-auto 2xl:w-[392px] xl:w-[302px] lg:w-[260px]">
                    Dishes delivered frozen ready to heat and eat, or store in
                    your freezer, whenever you need
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/about-us">
                <button className=" 2xl:w-[218px] alata font-[400] hover:bg-[#7e2727] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:h-[60px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:w-[160px] xl:h-[40px] xl:text-[14px] xl:leading-[25px] lg:w-[160px] w-[120px]  h-[35px] lg:h-[30px] lg:text-[10px] lg:leading-[25px] 2xl:mt-[50px] xl:mt-[30px] mt-[20px] px-3 p-1">
                  About Us
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ===================Six================== */}

        <div className="flex justify-center 2xl:py-[100px] xl:py-[70px] px-[15px] lg:py-10 py-10 bg-[#F9F2F2]">
          <div className="custom_container flex flex-wrap  mnavbar">
            <div className=" sm:mx-auto">
              <div className="flex justify-center lg:justify-start">
                <h2 className="six_head  mx-auto mb-2">Our Commitment</h2>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-center md:justify-around lg:justify-between flex-wrap">
                {" "}
                <div className="md:w-1/2 flex 2xl:mt-[30px] xl:mt-[15px] mt-[10px] ">
                  <div className=" lg:flex items-center ">
                    <Image
                      alt="ourcommitmentimg"
                      src={plate1}
                      className="six_img"
                    />

                    <p className="six_p">
                      Authentic homemade food made by independent chefs from
                      their cultural background
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex 2xl:mt-[30px] xl:mt-[15px] mt-[10px] ">
                  <div className=" lg:flex items-center ">
                    <Image
                      alt="ourcommitmentimg"
                      src={plate2}
                      className="six_img"
                    />

                    <p className="six_p">
                      No dish will be made in a factory or in a large-scale
                      production kitchen
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex 2xl:mt-[30px] xl:mt-[15px] mt-[10px] ">
                  <div className=" lg:flex items-center ">
                    <Image
                      alt="ourcommitmentimg"
                      src={plate3}
                      className="six_img"
                    />

                    <p className="six_p">
                      Small batch cooking to ensure the highest quality dish,
                      every time
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex 2xl:mt-[30px] xl:mt-[15px] mt-[10px] ">
                  <div className=" lg:flex items-center ">
                    <Image
                      alt="ourcommitmentimg"
                      src={plate4}
                      className="six_img"
                    />

                    <p className="six_p">
                      Use vegan packaging materials ensuring food safety
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================Seven================== */}

        <div className="yellow-bg  md:w-full lg:flex justify-center 2xl:py-[100px] xl:py-[70px]  lg:py-10 py-10 hidden lg:block">
          <div className="custom_container mnavbar ">
            <h2 className="seven_head nine_head">Our Chef Community</h2>
            <p className="seven_p">
              Our independent chefs, create dishes born from their passion for
              wholesome homemade meals. Made with love and care to give you a
              global culinary experience, wherever you are
            </p>

            <div className="flex justify-between">
              {Array.isArray(getAllChef) &&
                getAllChef.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between md:mt-5 lg:mt-10"
                  >
                    <div className="w-[160px] 2xl:w-[286px] xl:w-[200px]">
                      <Link href={`/pages/chef-details/${item?._id}`}>
                        <img
                          alt="person1"
                          src={item?.images}
                          className="rounded-full 2xl:w-[180px] 2xl:h-[180px] xl:w-[120px] xl:h-[120px] lg:w-[100px] lg:h-[100px] object-cover mx-auto"
                        />
                      </Link>
                      <Link href={`/pages/chef-details/${item?._id}`}>
                        <h2 className="seven_name">Chef {item?.name}</h2>
                        <p
                          className="seven_p2 h-[30px] overflow-hidden"
                          dangerouslySetInnerHTML={{ __html: item?.bio }}
                        />

                        <span className="text-[#DB5353]">...more</span>
                      </Link>
                      <h3 className="seven_h2 text-[#DB5353] 2xl:mt-[20px] xl:mt-[10px] lg:mt-[8px]">
                        {item?.nationality}
                      </h3>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-center">
              <Link href="/become-chef">
                <button className=" seven_btn">Join the Chef Community</button>
              </Link>
            </div>
          </div>
        </div>

        {/* ===================Eight================== */}

        <div className="flex justify-center 2xl:py-[100px] xl:py-[70px]  lg:py-10 py-10 border-b-[1px] border-[#B1B1B1]">
          <div className="custom_container flex flex-col-reverse md:flex-row mnavbar">
            <div className="sm:mx-10 sm:w-1/2 sm:mx-auto lg:mx-0">
              <h2 className=" eight_head ">Food Safety</h2>
              <p className="eight_p">
                Our chef community takes great care and affection in preparing
                their food, prioritising the highest standards of food safety
                and hygiene.
              </p>
              <p className="eight_p 2xl:mt-[25px] xl:mt-[15px]">
                Each chef holds a food hygiene rating scorecard approved by
                their local councils, providing you with an additional layer of
                assurance and peace of mind.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link href="/food-safety">
                  <button className=" eight_btn ">Food Safety</button>
                </Link>
              </div>
            </div>
            <div className="lg:mx-10 sm:w-1/2 flex sm:mx-auto my-5 lg:my-0 lg:flex-none">
              <Image
                alt="image"
                src={eightPoster}
                className="2xl:w-[724px] 2xl:h-[507px] w-auto md:w-[80%] h-auto mx-auto rounded-[15px] meightPoster"
              />{" "}
            </div>
          </div>
        </div>

        {/* ===================Nine================== */}

        <div className="flex justify-center 2xl:py-[100px] xl:py-[70px]  lg:py-10 py-10">
          <div className="custom_container mnavbar">
            <h2 className="nine_head">Testimonials</h2>
            <p className="nine_p text-center">
              All our chefs have fans raving about their food
            </p>

            <div className="lg:flex justify-around 2xl:mt-10 xl:mt-8 lg:mt-6 mt-3">
              {Array.isArray(testimonials) &&
                testimonials.map((item, index) => (
                  <div
                    key={index}
                    className="w-[90%] sm:w-[60%] mx-auto my-5 lg:my-0 lg:mx-0 lg:w-auto"
                  >
                    <div>
                      <div>
                        <img
                          alt="chef-mayank"
                          src={item?.Profile_Image}
                          className=" testi-img"
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

                      <p
                        className="nine_p2"
                        dangerouslySetInnerHTML={{ __html: item?.Description }}
                      />

                      <p className="nine_name">{item?.Name}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* ===================Footer================== */}
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
          <ul className="min-h-full text-base-content max-w-[310px] sm:max-w-[350px] md:w-[400px] md:max-w-[400px] 2xl:w-[450px] 2xl:max-w-[450px] bg-white">
            <div className="flex flex-col justify-center items-center p-[15px] md:p-[20px] h-[100vh]">
              {!cart || getCartItems.length === 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <h4 className="alata font-[400] text-[#111] text-[24px] mb-[1rem]">
                    Your Basket is empty!
                  </h4>
                  <h4 className="alata font-[400] text-[#111] lg:text-[18px]">
                    Explore a World of Deliciousness
                  </h4>
                  <p className="alata font-[400] text-[#111] lg:text-[16px] text-[15px] text-center">
                    Add dishes to your cart now.
                  </p>
                  <div className="flex 2xl:mt-12 xl:mt-6 lg:mt-5 mt-4">
                    <Link href="/explore-dishes">
                      <button
                        onClick={handleDrawerClose}
                        className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[221px] 2xl:h-[56px] xl:text-[20px] md:text-[16px] text-[15px] px-6 py-3"
                      >
                        Explore Dishes
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full flex justify-between items-center">
                    <h4 className="alata font-[500] text-[#111111] 2xl:text-[25px] sm:text-[20px] text-[18px] 2xl:leading-[32px] md:text-[25px] leading-[24px] ">
                      My Basket
                    </h4>
                    <div onClick={handleDrawerClose} className="cursor-pointer">
                      <CloseIcon />
                    </div>
                  </div>

                  <div className="pt-[2rem] flex-1 overflow-auto w-full">
                    <div className="flex justify-between">
                      <h4 className="alata font-[400] text-[#111] my-0 md:text-[18px] text-[16px] leading-[25px]">
                        Items
                      </h4>
                      <h4 className="alata font-[400] text-[#111] my-0 md:text-[18px] text-[16px] leading-[25px]">
                        Total
                      </h4>
                    </div>
                    <div className="pt-[1rem]">
                      {cart?.map((item, index) => {
                        const { data } = item;
                        const itemSubtotal = data.price * item.quantity;
                        return (
                          <div
                            key={index}
                            className="my-5 flex w-full border rounded-md"
                          >
                            <div className="flex gap-2 md:gap-4 w-full">
                              <div className="w-[45%] md:w-auto">
                                <img
                                  src={data.ProfileImage}
                                  alt={data.name}
                                  className="md:w-[100px] h-[97px] object-cover w-[100%]"
                                />
                              </div>

                              <div className="flex flex-col justify-between">
                                <div className="flex flex-col">
                                  <p className="alata font-[400] text-[#111111] my-0 text-[13px] sm:text-[14px] xl:text-[15px] leading-[22px] text-ellipsis whitespace-nowrap overflow-hidden max-w-[100px]">
                                    {data.name}
                                  </p>
                                  <p className="alata font-[400] text-[#111111] my-0 md:text-[14px] text-[13px] xl:text-[15px] leading-[20px]">
                                    Price: £{data.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="flex gap-1 md:gap-2 items-center">
                                  <div className="flex justify-center border-[#111111] border mt-1">
                                    <button
                                      className="text-[#111111] px-[10px] py-[5px]"
                                      onClick={() =>
                                        handleQuantityDecrement(item.data._id)
                                      }
                                    >
                                      <MinusIcon />
                                    </button>
                                    <p className="px-[5px] py-[5px] flex mx-auto items-center 2xl:text-[16px] md:text-[14px] text-[13px] 2xl:leading-[22px]">
                                      {item.quantity}
                                    </p>
                                    <button
                                      className="text-[#111111] px-[10px] py-[5px]"
                                      onClick={() =>
                                        handleQuantityIncrement(item.data._id)
                                      }
                                    >
                                      <PlusIcon />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between">
                              <p className="alata font-[600] 2xl:my-0 text-[13px] sm:text-[14px] xl:leading-[28px] text-right">
                                £{itemSubtotal.toFixed(2)}
                              </p>
                              <button
                                className="text-center mx-auto"
                                onClick={() => handleItemRemove1(item.data._id)}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {Array.isArray(getCartItems) &&
                        getCartItems.map((item, index) => {
                          const itemSubtotal =
                            item.menuItem.price * item.quantity;
                          return (
                            <div
                              key={index}
                              className="mt-3 md:mt-0 md:my-5 flex w-full gap-1 md:gap-6"
                            >
                              <div className="flex gap-2 md:gap-4 w-full">
                                <div className="w-[45%] md:w-auto">
                                  <img
                                    src={item.menuItem.ProfileImage}
                                    alt={item.menuItem.name}
                                    className="md:w-[100px] h-[97px] object-cover w-[100%]"
                                  />
                                </div>

                                <div className="flex flex-col justify-between">
                                  <div className="flex flex-col">
                                    <p className="alata font-[400] text-[#111111] my-0 text-[13px] sm:text-[14px] xl:text-[15px] leading-[22px] text-ellipsis whitespace-nowrap overflow-hidden max-w-[100px]">
                                      {item.menuItem.name}
                                    </p>
                                    <p className="alata font-[400] text-[#111111] my-0 md:text-[14px] text-[13px] xl:text-[15px] leading-[20px]">
                                      Price: £{item.menuItem.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="flex gap-1 md:gap-2 items-center">
                                    <div className="flex justify-center border-[#111111] border mt-1">
                                      <button
                                        className="text-[#111111] px-[10px] py-[5px]"
                                        onClick={() =>
                                          handleDecrement(item._id)
                                        }
                                      >
                                        <MinusIcon />
                                      </button>
                                      <p className="px-[5px] py-[5px] flex mx-auto items-center 2xl:text-[16px] md:text-[14px] text-[13px] 2xl:leading-[22px]">
                                        {item.quantity}
                                      </p>
                                      <button
                                        className="text-[#111111] px-[10px] py-[5px]"
                                        onClick={() =>
                                          handleIncrement(item._id)
                                        }
                                      >
                                        <PlusIcon />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col justify-between">
                                <p className="alata font-[600] 2xl:my-0 text-[13px] sm:text-[14px] xl:leading-[28px] text-right">
                                  £{itemSubtotal.toFixed(2)}
                                </p>
                                <button
                                  className="text-center mx-auto"
                                  onClick={() =>
                                    token
                                      ? handleRemoveItem(item.menuItem._id)
                                      : ""
                                  }
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-center w-full pt-[1.5rem]">
                    {token ? (
                      <div className="w-full">
                        <div className="flex justify-between">
                          <h4 className="alata font-[400] 2xl:my-0 xl:text-[18px] 2xl:leading-[28px] text-[16px] lg:leading-[24px]">
                            Subtotal:
                          </h4>
                          <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                            £{subtotalPrice.toFixed(2)}
                          </h4>
                        </div>
                        <Link href="/checkout">
                          <button
                            onClick={() => {
                              handleAddCart();
                            }}
                            className="alata font-[400] bg-[#DB5353] text-white mx-auto 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[15px] lg:text-[14px] w-full py-2 lg:h-[47px] h-[42px] flex flex-col items-center justify-center"
                          >
                            Checkout
                          </button>
                        </Link>
                        <p className="font-[500] text-[16px] py-[1rem]">
                          FREE delivery on orders over £55
                        </p>
                      </div>
                    ) : (
                      <div className="w-full">
                        <button
                          onClick={handleLoginClick}
                          className="alata font-[400] bg-[#DB5353] text-white mx-auto 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[15px] text-[14px] w-full py-2 lg:h-[47px] flex flex-col items-center justify-center"
                        >
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
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
                <Dialog.Panel className="2xl:w-[1000px] z-50 xl:w-[720px] w-[600px]  mx-auto rounded-[20px] px-[5px] my-auto transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all 2xl:mt-[125px] xl:mt-[85px] lg:mt-[55px] sm:mt-[50px] mt-14 ">
                  <Dialog.Title
                    as="h3"
                    onClick={closeModal}
                    className="cursor-pointer relative custom_heading_text font-semibold leading-6 text-gray-900 mt lg:mt-0  right-5 text-[30px]"
                  >
                 
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

export default dynamic(() => Promise.resolve(LandingPage), { ssr: false });
