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
import cook2 from "./assets/fi_4718655.svg";
import addCart from "../../../../../public/images/addCart.svg";
import DishDetails from "@/app/explore-dishes/dish-details/page";
import { Dialog, Transition } from "@headlessui/react";
import config from "@/config";
import {
  addItemToCart,
  clearCart,
  handleClearCart,
  handleRemoveItem,
} from "@/app/redux/dishSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
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
  cart.forEach((item, index) => {
    const { data } = item;
    console.log(data, `data from item ${index + 1}`);
  });
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

  const handleLoginClick = () => {
    document.getElementById("my_modal_2").showModal();
  };
  return (
    <>
      <ToastContainer autoClose={1000} />
      <section>
        <Navbar />
        <div className=" ">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] 2xl:pt-[220px] xl:pt-[140px] pt-[100px] 2xl:py-[100px] xl:py-[50px] py-[40px] mx-auto mnavbar">
            <div
              className="chefDishes-bg rounded-[15px] relative 2xl:h-[529px] xl:h-[360px] h-[280px] 2xl:pt-[295px] xl:pt-[200px] pt-[155px]"
              style={{ backgroundImage: `url(${bannerImage})` }}
            >
              <div className=" border flex gap-5 2xl:w-[1414px] xl:w-[970px] w-[750px] rounded-[15px] bg-white mx-auto 2xl:p-[50px] xl:p-[20px] p-[15px] chefdishWB">
                <div className="2xl:w-[154px] xl:w-[80px] w-[60px]">
                  <div>
                    <img src={getAChef?.images} className="w-full" />
                  </div>
                  <div className="flex justify-center 2xl:gap-5 xl:gap-2 gap-1 2xl:my-[20px] xl:my-[10px] my-[5px]">
                    <a href={getAChef?.Facebook_Link} target="_blank">
                      <Image src={fb} className="xl:w-[22px] w-[15px]" />
                    </a>
                    <a href={getAChef?.Instagram_Link} target="_blank">
                      <Image src={insta} className="xl:w-[22px] w-[15px]" />
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="alata font-[400] 2xl:text-[35px] 2xl:leading-[45px] xl:text-[20px] xl:leading-[35px] lg:text-[16px] lg:leading-[24px]">
                    Chef {getAChef?.name} Menu
                  </h4>
                  <p className="fourth_p text-[#555555]">
                    {/* Punjabi · North Indian · South Indian · Indian · Vegetarian */}
                  </p>
                  <div className="flex gap-3 2xl:my-[20px] xl:my-[15px] my-[10px]">
                    {/* <div className="2xl:w-[197px] 2xl:h-[37px] xl:w-[140px] xl:h-[30px] w-[130px] h-[25px] bg-[#F3F3F3] flex justify-around items-center">
<Image src={cook} className="w-[17px]" />
<p className="fourth_day">1.1k+</p>
<p className=" fourth_day text-[#838383]">
Meals prepared
</p>
</div> */}
                    <div className="2xl:w-[197px] 2xl:h-[37px] xl:w-[140px] xl:h-[30px] w-[130px] h-[25px bg-[#F3F3F3] flex justify-around items-center">
                      <Image src={cook2} className="w-[17px]" />
                      <p className="fourth_day">Certified</p>
                      <p className="fourth_day text-[#838383]">Food safety</p>
                    </div>
                  </div>
                  <div className="flex gap-[50px] 2xl:my-[30px] xl:my-[20px] my-[10px]">
                    <div className=" ">
                      <h2 className="fourth_p text-[#555555]">
                        {getAChef?.bio}
                      </h2>
                      <p className="fourth_day 2xl:my-[12px] xl:my-[8px] my-[6px]"></p>
                    </div>
                    {/* <div className="2xl:w-[404px] xl:w-[280px] w-[204px] ">
<h2 className="fourth_p text-[#555555]">
Lorem Ipsum is simply dummy
</h2>
<p className="fourth_day 2xl:my-[12px] xl:my-[8px] my-[6px]">
Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industrys
standard dummy text ever since the 1500s, when an
unknown printer took a galley of type and scrambled it
to make a type specimen book.
</p>
</div> */}
                  </div>
                  {/* <div className="2xl:my-[30px] ">
<h2 className="fourth_p text-[#555555]">
Lorem Ipsum is simply dummy
</h2>
<p className="fourth_day 2xl:my-[12px] xl:my-[8px] my-[6px] 2xl:w-[869px] xl:w-[600px] w-[540px]">
Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industrys
standard dummy text ever since the 1500s, when an unknown
printer took a galley of type and scrambled it to make a
type specimen book.
</p>
</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:my-[50px] xl:my-[30px] my-[20px] ">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] mx-auto mnavbar">
            <div className="">
              <div>
                <h4 className="third_head">Chef Dishes</h4>
              </div>
            </div>
            <div className=" flex flex-wrap gap-[20px] xl:gap-[25px] 2xl:gap-[70px] w-full px-10 md:px-0 mx-auto">
              {Array.isArray(chefItems) &&
                chefItems.map((item) => (
                  <div
                    key={item.id}
                    className=" my-5 2xl:w-[345px] 2xl:h-[560px] lg:w-[23%] md:w-[31%] w-[45%] relative rounded-[9.8px] "
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
                      <h4 className="alata font-[400] text-[#DB5353] 2xl:my-4 xl:my-3 my-2 2xl:text-[20px] 2xl:leading-[20px] xl:text-[14px] xl:leading-[18px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                        {item?.name}
                      </h4>
                      <div className="flex items-center 2xl:gap-3 xl:gap-2 lg:gap-2 gap-2 xl:my-3 lg:my-2 my-2">
                        <img
                          alt="image"
                          src={item?.chef_id?.images}
                          className="four_img2 "
                        />
                        <div>
                          <h4 className="fourth_name ">
                            {" "}
                            {item?.chef_id?.name}
                          </h4>
                          <p className="fourth_p text-[#6765EB]">
                            {item?.Cuisines_id?.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-5 2xl:my-[20px] xl:my-[15px] my-[12px]">
                        {/* <button className="four_btn">
<img
alt="image"
src={vegetarian}
className="2xl:w-[13px] 2xl:h-[13px] lg:w-[10px] lg:h-[10px] w-[10px] h-auto"
/>
<p className="fourth_day">Vegetarian</p>
</button> */}
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
                      <div className="flex items-center gap-5 2xl:my-[20px] xl:my-[15px] my-[12px]">
                        <h4 className="fourth_p">Spice Level</h4>
                        <button className="four_btn">
                          <img
                            alt="image"
                            src={item?.spice_level_id?.ProfileImage}
                            className="2xl:w-[13px] 2xl:h-[13px] lg:w-[10px] lg:h-[10px] w-[10px] h-auto"
                          />
                          <p className="fourth_day">
                            {item?.spice_level_id?.title}
                          </p>
                        </button>
                      </div>
                      <div className=" w-full bottom-0 flex justify-between items-center 2xl:my-[22px] xl:my-[18px] my-[15px]">
                        <p className="alata font-[400] text-[#000] 2xl:text-[20px] 2xl:leading-[24px] xl:text-[14px] xl:leading-[18px] lg:text-[12px] lg:leading-[16px] text-[12px] leading-[16px] ">
                          Serves {item?.portion_Size} || {item?.weight}g{" "}
                          <span className="text-[#DB5353]">£{item?.price}</span>
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
                      class="w-10 h-10"
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
                {/*
{cart.length === 0 ? (
<div>
<div className="2xl:mt-40">

</div>
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
<div className="">
<div className="flex justify-end mt-10 md:mr-5">
<button
className="alata font-[400] rounded-[5px] p-2 text-[20px] bg-[#DB5353] text-white 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] lg:text-[10px]"
onClick={handleClearCart}
>
All Clear
</button>
</div>
<div className="">
{cart.map((item, index) => {
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
<div className="">
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
className="px-4 text-[13px] border rounded h-[25px] text-red hover:bg-[#efb3b38a] "
onClick={() => handleRemoveItem(data._id)}
>
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
class="w-6 h-6"
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
<div className="flex justify-between items-center mt-20">
<div>
<h4 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">

</h4>
</div>
<div>
<Link href="/checkout">
<button className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[164px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] lg:text-[10px] xl:px-6 xl:py-[10px] lg:px-3 lg:py-1 px-3 py-1">
Checkout
</button>
</Link>
</div>
</div>
</div>
</div>
)} */}
                {/* {getCartItems.length === 0 ? (
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
) : ( */}
                <>
                  <div className="">
                    <div className="flex justify-end mt-10 md:mr-5">
                      <button
                        className="alata font-[400] rounded-[5px] p-2 text-[20px] bg-[#DB5353] text-white 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] lg:text-[10px]"
                        onClick={handleCartClear}
                      >
                        All Clear
                      </button>
                    </div>
                    <div className="">
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
                          {token ? (
                            <Link href="/checkout">
                              <button className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[164px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] lg:text-[10px] xl:px-6 xl:py-[10px] lg:px-3 lg:py-1 px-3 py-1">
                                Checkout
                              </button>
                            </Link>
                          ) : (
                            <button
                              onClick={handleLoginClick}
                              className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[164px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] lg:text-[10px] xl:px-6 xl:py-[10px] lg:px-3 lg:py-1 px-3 py-1"
                            >
                              Checkout
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                {/* )} */}
              </div>
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
                <Dialog.Panel className="2xl:w-[1000px] xl:w-[720px] w-[600px] mx-auto rounded-[10px] my-auto 2xl:px-[40px] 2xl:py-[45px] xl:px-[25px] xl:py-[30px] px-[15px] py-[20px] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all 2xl:mt-[125px] xl:mt-[85px] lg:mt-[55px] sm:mt-[50px] mt-14 ">
                  <Dialog.Title
                    as="h3"
                    onClick={closeModal}
                    className="cursor-pointer custom_heading_text font-semibold leading-6 text-gray-900 mt lg:mt-0 absolute right-5 text-[30px]"
                  >
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
export default ChefDetails;
