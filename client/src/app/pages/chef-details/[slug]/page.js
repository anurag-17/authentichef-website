"use client";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import vegetarian from "./assets/vegetarian.svg";
import fb from "./assets/fb.svg";
import insta from "./assets/instagram.svg";
import cook from "./assets/fi_4767107.svg";
import cook2 from "./assets/certified-svgrepo-com.svg";
import addCart from "../../../../../public/images/addCart.svg";
import DishDetails from "@/app/explore-dishes/dish-details/page";
import { Dialog, Transition } from "@headlessui/react";
import config from "@/config";
import {
  addItemToCart,
  clearCart,
  decrementQuantity,
  handleClearCart,
  handleRemoveItem,
  incrementCartItemQuantity,
  removeItemFromCart,
} from "@/app/redux/dishSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import cheficon from "../../../assets/Chef-icon.webp";
import CloseIcon from "@/app/user/svg/CloseIcon";
import { MinusIcon } from "@/app/user/svg/MinusIcon";
import PlusIcon from "@/app/user/svg/PlusIcon";
import DeleteIcon from "@/app/user/svg/DeleteIcon";
const ChefDetails = ({ params }) => {
  const { token } = useSelector((state) => state?.auth);
  const [isRefresh, setRefresh] = useState(false);
  const [itemId, setItemId] = useState("");
  const [getAChef, setGetAChef] = useState({});
  const [chefItems, setChefItems] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [dishID, setDishID] = useState("");
  const closeModal = () => setOpen(false);
  const [getADish, setGetADish] = useState("");
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state?.userCart);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  console.log(getAChef, "getAChef");
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
  useEffect(() => {
    defaultChef();
  }, []);
  console.log(chefItems, "abc");
  const [bannerImage, setBannerImage] = useState("");
  const defaultChef = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/chef/chefs/${params.slug}`,
    };
    axios
      .request(option)
      .then((response) => {
        setGetAChef(response?.data);
        setBannerImage(response?.data?.bannerImage);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  useEffect(() => {
    defaultChefMenu();
  }, []);
  const defaultChefMenu = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/menu/menuItems/chef/${params.slug}`,
    };
    axios
      .request(option)
      .then((response) => {
        setChefItems(response?.data);
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
        handleDrawerOpen();
        refreshData();
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
        refreshData();
        const userCart = response?.data?.userCart;
        const cartItems = userCart?.items.map((item) => ({
          ...item,
          totalPrice: item.menuItem.price * item.quantity,
        }));
        setSubtotalPrice(
          cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
        );
        setGetCartItems(cartItems);
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

  const handleLoginClick = () => {
    document.getElementById("my_modal_2").showModal();
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
  const handleClose = () => {
    const modal = document.getElementById("my_modal_2");
    modal.close();
  };
  const InputHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
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
  return (
    <>
      <ToastContainer autoClose={1000} />
      <section>
        <Navbar />
        <div className=" ">
          <div className="2xl:w-[1600px] xl:w-[1200px] lg:w-[850px] md:w-[750px] w-[90%] sm:px-0 mnavbar 2xl:pt-[220px] xl:pt-[140px] pt-[60px] 2xl:py-[100px] xl:py-[50px] py-[40px] mx-auto ">
            <div
              className="chefDishes-bg rounded-[15px] relative 2xl:h-[529px] xl:h-[360px] h-[280px] 2xl:pt-[295px] xl:pt-[200px] lg:pt-[155px] pt-[120px]"
              style={{ backgroundImage: `url(${bannerImage})` }}
            >
              <div className=" border sm:flex gap-5 2xl:w-[1414px] xl:w-[1000px] lg:w-[750px] w-[100%]  rounded-[15px] bg-white mx-auto 2xl:p-[50px] xl:p-[20px] p-[10px] chefdishWB">
                <div className="2xl:w-[154px] xl:w-[80px] w-[100px] mx-auto">
                  <div className="2xl:w-[154px] xl:w-[80px] w-[100px]">
                    <img
                      src={getAChef?.images}
                      className="w-full rounded-full 2xl:w-[154px] 2xl:h-[154px] object-cover"
                    />
                  </div>
                  <div className="flex justify-center 2xl:gap-5 xl:gap-2 gap-3 2xl:my-[20px] xl:my-[10px] my-[5px]">
                    <a href={getAChef?.Facebook_Link} target="_blank">
                      <Image
                        src={fb}
                        className="2xl:w-[35px] xl:w-[30px] w-[30px]"
                      />
                    </a>
                    <a href={getAChef?.Instagram_Link} target="_blank">
                      <Image
                        src={insta}
                        className="2xl:w-[35px] xl:w-[30px] w-[30px]"
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="alata font-[400] 2xl:text-[35px] 2xl:leading-[45px] xl:text-[20px] xl:leading-[35px] lg:text-[16px] lg:leading-[24px] text-center sm:text-start text-[18px]">
                    Chef {getAChef?.name}
                  </h4>
                  <p className="fourth_p text-[#555555] text-center sm:text-start">
                    {/* Punjabi · North Indian · South Indian · Indian · Vegetarian */}
                    {getAChef?.nationality}
                  </p>
                  <div className="flex justify-center sm:justify-start gap-3 2xl:my-[20px] xl:my-[15px] my-[10px]">
                    {/* <div className="2xl:w-[130px] 2xl:h-[37px] xl:w-[115px] xl:h-[30px] w-[90px] h-[25px] bg-[#F3F3F3] flex justify-around items-center">
<Image src={cook} className="w-[17px]" />

<p className=" fourth_day capitalize">
Food Safety
</p>
</div> */}

                    <div className="2xl:w-[200px] 2xl:h-[37px] xl:w-[200px] xl:h-[30px] w-[160px] h-[30px] bg-[#F3F3F3] flex justify-center gap-1 xl:gap-2 items-center py-1 ">
                      <Image src={cook2} className="w-[17px]" />
                      <p className="fourth_day">Food Safety Certified</p>
                      {/* <p className="fourth_day text-[#838383]">Food safety</p> */}
                    </div>
                  </div>
                  <div className="flex gap-[50px] 2xl:my-[30px] xl:my-[20px] my-[10px]">
                    <div className=" ">
                      <div className="checkoutlable text-[#555555] text-center sm:text-start">
                        <h2
                          dangerouslySetInnerHTML={{ __html: getAChef?.bio }}
                        />
                      </div>
                      <p className="fourth_day 2xl:my-[12px] xl:my-[8px] my-[6px]"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:py-[140px] xl:py-[100px] md:py-[50px] py-[100px] mt-[140px] sm:mt-0 ">
          <div className="2xl:w-[1600px] xl:w-[1200px] lg:w-[850px] md:w-[750px] w-[90%] mx-auto mnavbar">
            <div className="">
              <div>
                <h4 className="third_head px-5 sm:px-0">Chef Dishes</h4>
              </div>
            </div>
            <div className=" flex flex-wrap gap-[20px] xl:gap-[25px] 2xl:gap-[70px] w-full px-5 sm:px-0 mx-auto">
              {Array.isArray(chefItems) &&
                chefItems.map((item) => (
                  <div
                    key={item.id}
                    className=" my-5 2xl:w-[345px] 2xl:h-[560px] lg:w-[23%] md:w-[31%] sm:w-[45%] mx-auto sm:mx-0 relative rounded-[9.8px] w-[80%]"
                  >
                    <button className="" onClick={() => openModal(item._id)}>
                      <img
                        src={item.ProfileImage[0]}
                        alt={item.title}
                        width={345}
                        height={278}
                        className="w-full 2xl:w-[365.5px] 2xl:h-[278px] xl:w-[280px] xl:h-[200px] lg:w-[220px] lg:h-[160px] rounded-[10px]"
                      />
                    </button>
                    <div className="">
                      <h4 className="alata cursor-pointer capitalize font-[400] text-[#DB5353] 2xl:my-4 xl:my-3 my-2 2xl:text-[20px] 2xl:leading-[20px]  xl:text-[14px] xl:leading-[18px] lg:text-[10px] lg:leading-[16px] text-[18px]">
                        {item?.name}
                      </h4>
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
                          <h4 className="fourth_name  flex text-start	">
                            {" "}
                            {item?.chef_id?.name}
                          </h4>
                          <p className="fourth_p text-[#6765EB]">
                            {item?.chef_id?.nationality}
                          </p>
                        </div>
                      </div>
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
                      </div>

                      <div className="flex items-center gap-5  2xl:my-[20px] xl:my-[15px] my-[12px]">
                        {/* <h4 className="fourth_title">Spice level</h4> */}
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
                        <p className=" font-[400] text-[#000] 2xl:text-[20px] 2xl:leading-[24px] xl:text-[14px] xl:leading-[18px] lg:text-[12px] lg:leading-[16px] text-[16px] leading-[16px] ">
                          <span className="text-[#DB5353] font-400 alata">
                            {item?.price && ` £${item.price.toFixed(2)}`}
                          </span>{" "}
                          <span className="font-400 alata">
                            | {item?.weight}g | Serves{" "}
                          </span>
                          <span className="text-500">{item?.portion_Size}</span>
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
                              handleLoginClick();
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
                        {/* <button
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
                          </button> */}
                      </div>
                    </div>
                  </div>
                ))}
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
          <ul className="min-h-full text-base-content max-w-[310px] sm:max-w-[350px] md:w-[400px] md:max-w-[400px] 2xl:w-[450px] 2xl:max-w-[450px] bg-white">
            <div className="flex flex-col justify-center items-center p-[15px] md:p-[20px] h-[100vh]">
              { getCartItems.length === 0 ? (
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
                                        token
                                          ? handleDecrement(item._id)
                                          : handleQuantityDecrement(
                                              item.data._id
                                            )
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
                                        token
                                          ? handleIncrement(item._id)
                                          : handleQuantityIncrement(
                                              item.data._id
                                            )
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
                                    ? handleItemRemove(item.menuItem._id)
                                    : handleItemRemove1(item.data._id)
                                }
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
                        <p className="font-[500] text-[16px] py-[5px]">
                          Minimum order value must be £30 or more.
                        </p>
                        <p className="font-[500] text-[16px] py-[5px]">
                          Minimum order value must be £30 or more.
                        </p>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="flex justify-between">
                          <h4 className="alata font-[400] 2xl:my-0 xl:text-[18px] 2xl:leading-[28px] text-[16px] lg:leading-[24px]">
                            Subtotal:
                          </h4>
                          <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                            £{subtotalPrice.toFixed(2)}
                          </h4>
                        </div>
                        <button
                          onClick={handleLoginClick}
                          className="alata font-[400] bg-[#DB5353] text-white mx-auto 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[15px] text-[14px] w-full py-2 lg:h-[47px] flex flex-col items-center justify-center"
                        >
                          Checkout
                        </button>
                        <p className="font-[500] text-[16px] py-[5px]">
                          Minimum order value must be £30 or more.
                        </p>
                        <p className="font-[500] text-[16px] py-[5px]">
                          FREE delivery on orders over £55
                        </p>
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
                <Dialog.Panel className="2xl:w-[1000px] xl:w-[720px] w-[600px] mx-auto rounded-[10px] my-auto  transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all 2xl:mt-[125px] xl:mt-[85px] lg:mt-[55px] sm:mt-[50px] mt-14 ">
                  <Dialog.Title
                    as="h3"
                    onClick={closeModal}
                    className="cursor-pointer custom_heading_text font-semibold leading-6 text-gray-900 mt lg:mt-0 absolute right-5 text-[30px]"
                  ></Dialog.Title>

                  <DishDetails
                    defaultADish={defaultADish}
                    dishID={dishID}
                    closeModal={closeModal}
                    setItemId={setItemId}
                    handleAddCart={handleAddCart}
                    // dishID={dishID}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* =======Login======= */}
      <div className="">
        <dialog
          id="my_modal_2"
          className="modal rounded-[10px] 2xl:w-[1000px] 2xl:h-[501px] xl:w-[620px] xl:h-[350px] lg:w-[480px] h-[350px] 2xl:mt-40 xl:mt-24 mt-14 p-0"
        >
          <form method="dialog" className=" mt-0" onSubmit={handleSubmit}>
            <div className=" ">
              <div className="flex justify-center items-center w-full ">
                <div className="absolute right-3" onClick={handleClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="2xl:w-7 2xl:h-7 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h4 className="fourth_p">Login</h4>
              </div>
              <div className="2xl:w-[368px] xl:w-[280px] lg:w-[220px] sm:w-[] w-[]">
                <div className="2xl:mt-[35px] mt-[25px]">
                  <input
                    type="email"
                    name="email"
                    onChange={InputHandler}
                    placeholder="Enter your mail id"
                    className="alata font-[400] login-inputad w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[20px]">
                  <input
                    type="password"
                    name="password"
                    onChange={InputHandler}
                    placeholder="Enter your Password"
                    className="alata font-[400] login-inputad w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                  />
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="w-full mx-auto alata text-white 2xl:text-[20px] 2xl:w-[368px] xl:w-[280px] lg:w-[220px] xl:text-[16px] text-[12px] rounded-[5px] 2xl:mt-[40px] xl:mt-[25px] mt-[20px] 2xl:h-[60px] xl:h-[40px] lg:h-[32px] text-center bg-[#DB5353]"
                  >
                    Login
                  </button>
                </div>
                <div>
                  <p className="alata font-[400] 2xl:my-[20px] xl:my-[10px] text-[14px] leading-[26px] text-center">
                    or
                  </p>
                </div>
                <div className="my-[30px] flex justify-center">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="nav_login1"
                  >
                    <h4 className="text-[#DB5353] alata font-[400] text-[14px] leading-[26px] text-center mx-auto">
                      Sign Up
                    </h4>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </dialog>
      </div>
    </>
  );
};
export default ChefDetails;
