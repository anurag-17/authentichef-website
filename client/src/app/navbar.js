// "nav"
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "./assets/logo.png";
import sidemanu from "../../public/images/side-menu.svg";
import google from "./assets/google.svg";
import fb from "./assets/fb.svg";
import profile from "./assets/profile.svg";
import sidelogo from "./assets/sidebar-logo.svg";
import aboutauthentichef from "./assets/about-authentichef.svg";
import beacomechef from "./assets/become-a-chef.svg";
import faq from "./assets/FAQ.svg";
import exploredish from "./assets/explore-dishes.svg";
import beg from "./assets/beg.svg";
import logout from "../app/assets/logout.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  setUser,
  removeUser,
  setToken,
  removeToken,
  setSuccess,
  removeSuccess,
} from "./redux/slice";
import { useDispatch, useSelector } from "react-redux";
import plus from "../../public/images/plus.svg";
import minus from "../../public/images/minus.svg";
import { removeItemFromCart, clearCart } from "./redux/dishSlice";
import config from "@/config";
const Navbar = () => {
  const [userDetail, setUserDetail] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state?.auth);
  const { user } = useSelector((state) => state?.auth);
  const { success } = useSelector((state) => state?.auth);
  const userDetails = user;
  // console.log(success, "success");
  const [isLoading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState("success");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const inputHandlers = (e) => {
    const { name, value } = e.target;
    setUserDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (success !== undefined) {
      setIsLoggedIn(success);
    }
  }, [success]);
  // ===================Signup===============
  const handleSubmits = async (e) => {
    e.preventDefault();
    try {
      // setLoader(true);
      const response = await axios.post(
        `${config.baseURL}/api/auth/register`,
        userDetail
      );
      if (response.status === 201) {
        toast.success("Registration Successful!");
        // router.push("/user/user-login");
        // setUserId(response?.data?.user);
        // handleSendOTP(response?.data?.user);
      } else {
        toast.error("Failed to Register. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while registering.");
    } finally {
      // setLoader(false);
    }
  };
  const InputHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const refreshData = () => {
    setRefresh(!isRefresh);
  };
  // ==========Handle login==========
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
  // ==========Handle logout==========
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${config.baseURL}/api/auth/logout`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status >= 200 && res.status < 300) {
        toast.success("Logout successfully");
        dispatch(removeToken());
        dispatch(removeUser());
        dispatch(removeSuccess());
        setIsLoggedIn(false);
        refreshData();
        // router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed");
    }
  };
  // ======handle localStorage and popup=====
  const handleClose = () => {
    const modal = document.getElementById("my_modal_2");
    modal.close();
  };
  const handleClosee = () => {
    const modal = document.getElementById("my_modal_1");
    modal.close();
  };
  // useEffect(() => {
  // // Check if user token exists in local storage
  // setIsLoggedIn(!!); // Set isLoggedIn to true if user token exists
  // }, [!isRefresh]);
  const handleLoginClick = () => {
    document.getElementById("my_modal_2").showModal();
  };
  const handleSignUpClick = () => {
    document.getElementById("my_modal_1").showModal();
  };
  const { cart } = useSelector((state) => state?.userCart);
  // const data = dish?.data;
  cart.forEach((item, index) => {
    const { data } = item;
    console.log(data, `data from item ${index + 1}`);
  });
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
  return (
    <>
      {/* <ToastContainer className="mt-24" autoClose={1000} /> */}
      <section>
        <nav className="z-50 flex justify-center bg-[#F38181] 2xl:h-[116px] xl:h-[80px] lg:h-[50px] sm:h-[45px] h-12 w-full mnavbar-h fixed">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[800px] w-full px-10 md:px-0 flex justify-between items-center mnavbar">
            <div className="w-1/3">
              {/* =======Side Drawer======= */}
              <div className="drawer">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle bg-transparent"
                />
                <div className="drawer-content bg-transparent">
                  {/* Page content here */}
                  <label htmlFor="my-drawer">
                    <Image
                      alt="image"
                      src={sidemanu}
                      className="2xl:w-[38.67px] 2xl:h-[32px] xl:w-[30px] h-auto w-[22px] menu-btn md:ml-6 lg:ml-0"
                    />
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu p-[3px] 2xl:px-[20px] xl:px-[20px] lg:px-[15px] sm:px-[5px] px-[3px] 2xl:w-[410px] xl:w-[320px] lg:w-[240px] sm:w-[200px] w-[180px] min-h-full bg-base-200 sidebar">
                    {/* Sidebar content here */}
                    <div>
                      <div className="flex justify-between items-center">
                        <Link href="/">
                          <Image
                            src={sidelogo}
                            className="2xl:w-[169px] 2xl:h-[43px] xl:w-[160px] lg:w-[150px] xs:w-[103px] md:w-[130px] sm:w-[70px] w-[60px]"
                          />
                        </Link>
                        <label
                          htmlFor="my-drawer"
                          aria-label="close sidebar"
                          className="drawer-overlay"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="2xl:w-8 2xl:h-8 w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                    <li className="2xl:mt-[90px] xl:mt-[50px] lg:mt-[40px] sm:mt-[30px] mt-[20px]">
                      <Link href="/setting">
                        <Image
                          src={profile}
                          className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] lg:w-[12px] sm:w-[10px] w-[8px]"
                        />
                        Profile
                      </Link>
                    </li>
                    <li className="2xl:mt-[5px] xl:mt-[2px] lg:mt-[0px] sm:mt-[8px] mt-[5px]">
                      <Link href="about-us">
                        <Image
                          src={aboutauthentichef}
                          className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] lg:w-[12px] sm:w-[10px] w-[8px]"
                        />
                        About Authentichef
                      </Link>
                    </li>
                    <li className="2xl:mt-[5px] xl:mt-[2px] lg:mt-[0px] sm:mt-[8px] mt-[5px]">
                      <Link href="/explore-dishes">
                        <Image
                          src={exploredish}
                          className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] lg:w-[12px] sm:w-[10px] w-[8px]"
                        />
                        Explore Dishes
                      </Link>
                    </li>
                    <li className="2xl:mt-[5px] xl:mt-[2px] lg:mt-[0px] sm:mt-[8px] mt-[5px]">
                      <Link href="/become-chef">
                        <Image
                          src={beacomechef}
                          className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] lg:w-[12px] sm:w-[10px] w-[8px]"
                        />
                        Become a Chef
                      </Link>
                    </li>
                    <li className="2xl:mt-[5px] xl:mt-[2px] lg:mt-[0px] sm:mt-[8px] mt-[5px]">
                      <a href="/FAQs">
                        <Image
                          src={faq}
                          className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] lg:w-[12px] sm:w-[10px] w-[8px]"
                        />
                        FAQs
                      </a>
                    </li>
                    <hr className="mx-auto 2xl:w-[345px] xl:w-[260px] lg:w-[180px] sm:w-[140px] w-[120px] 2xl:mt-[75px] xl:mt-[40px] lg:mt-[20px] sm:mt-[15px] mt-[10px]" />
                    <div className="text-center 2xl:mt-[35px] xl:mt-[15px] lg:mt-[10px] sm:mt-[8px] mt-[5px]">
                      <div className="flex justify-center md:gap-11 gap-2 md:ml-6 lg:ml-0">
                        {isLoggedIn === success ? (
                          <div>
                            <p className="text-[#555555] font-alata font-[400] 2xl:text-[14px] xl:text-[10px] lg:text-[9px] sm:text-[10px] text-[8px] 2xl:leading-[26px] xl:leading-[22px] lg:leading-[16px] sm:leading-[16px] leading-[14px]">
                              Welcome {userDetails?.firstname}
                            </p>
                            <div className="flex justify-center items-center gap-1">
                              <Image
                                src={logout}
                                className="2xl:w-[17px] 2xl:h-[17px] xl:w-[12px] lg:w-[10px] sm:w-[8px] w-[6px]"
                              />
                              <button
                                onClick={handleLogout}
                                className="text-[#DB5353] fourth_p"
                              >
                                Logout
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="md:gap-7 gap-2">
                            <p className="text-[#555555] font-alata font-[400] 2xl:text-[14px] xl:text-[10px] lg:text-[9px] sm:text-[10px] text-[8px] 2xl:leading-[26px] xl:leading-[22px] lg:leading-[16px] sm:leading-[16px] leading-[14px]">
                              Welcome
                            </p>
                            <button
                              onClick={handleLoginClick}
                              className="text-[#DB5353] fourth_p"
                            >
                              Log In
                            </button>
                            <br />
                            <button
                              onClick={handleSignUpClick}
                              className="fourth_p text-[#DB5353]"
                            >
                              Sign Up
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-1/3 flex justify-center ">
              <a href="/">
                <Image alt="logo" src={logo} className="nav_logo" />
              </a>
            </div>
            <div className="w-1/3 flex justify-end ">
              <div className="flex justify-end md:gap-0 gap-2 md:ml-6">
                {isLoggedIn === success ? (
                  <div className="flex justify-end md:gap-7 gap-2 w-1/3">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Search dishes, chefs, cuisine "
                        className="2xl:w-[258px] xl:w-[170px] 2xl:h-[44px] xl:h-[30px] w-[130px] h-[20px] bg-[#FF9C9C] text-[#AE6363] 2xl:px-[40px] xl:px-[30px] px-[20px] outline-none placeholder:text-[#AE6363] 2xl:text-[14px] xl:text-[12px] text-[9px]"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="absolute text-[#AE6363] 2xl:top-[10px] 2xl:left-[10px] xl:top-[8px] xl:left-[10px] top-[10px] left-[5px] 2xl:w-5 2xl:h-5 xl:w-4 xl:h-4 w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </div>
                    <div className="nav_login1 flex gap-2">
                      Welcome <p>{userDetails?.firstname}</p>
                    </div>
                    <button>
                      <Image
                        src={beg}
                        className="2xl:w-[28px] xl:w-[20px] w-[16px]"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end md:gap-7 gap-2 xs:hidden">
                    <button onClick={handleLoginClick} className="nav_login1">
                      Log In
                    </button>
                    <button onClick={handleSignUpClick} className="nav_signup">
                      Sign Up
                    </button>
                    <button>{/* Add your Image component here */}</button>
                  </div>
                )}
                <button onClick={handleDrawerOpen}>
                  <Image src={beg} className="2xl:w-10 2xl:h-10" />
                </button>
              </div>
            </div>
          </div>
        </nav>
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
      {/* =======Signup popup======= */}
      <div className="">
        <dialog
          id="my_modal_1"
          className="modal rounded-[10px] 2xl:w-[1000px] 2xl:h-[665px] xl:w-[620px] xl:h-[480px] lg:w-[480px] h-[400px] 2xl:mt-40 xl:mt-24 mt-14 p-0"
        >
          <form
            method="dialog"
            className=" w-full h-full mt-0"
            onSubmit={handleSubmits}
          >
            {/* if there is a button in form, it will close the modal */}
            <div className="flex justify-center items-center border w-full 2xl:h-[80px] xl:h-[55px] h-[40px]">
              <div className="absolute right-3" onClick={handleClosee}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="2xl:w-9 2xl:h-9 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h4 className="fourth_p">Sign up</h4>
            </div>
            <div className=" my-3 px-[40px]">
              <div className="flex flex-wrap justify-between 2xl:w-[775px] xl:w-[480px] mx-auto ">
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-[190px]">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="alata font-[400] login-inputad w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    onChange={inputHandlers}
                    value={userDetail.firstname}
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-[190px]">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="alata font-[400] login-inputad w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    onChange={inputHandlers}
                    value={userDetail.lastname}
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-[190px]">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="alata font-[400] login-inputad w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    onChange={inputHandlers}
                    value={userDetail.email}
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-[190px]">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="alata font-[400] login-inputad w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    onChange={inputHandlers}
                    value={userDetail.password}
                  />
                </div>
              </div>
              <div className="flex">
                <button className="w-full mx-auto alata text-white 2xl:text-[20px] 2xl:w-[368px] xl:w-[230px] lg:w-[190px] xl:text-[14px] text-[12px] rounded-[5px] 2xl:mt-[20px] xl:mt-[15px] mt-[10px] 2xl:h-[60px] xl:h-[40px] lg:h-[32px] text-center bg-[#DB5353]">
                  Create Account
                </button>
              </div>
              <div>
                <p className="alata font-[400] 2xl:my-[20px] xl:my-[10px] text-[14px] leading-[26px] text-center">
                  or
                </p>
              </div>
              <div className="flex 2xl:mt-[20px]">
                <div className="mx-auto 2xl:w-[368px] xl:w-[230px]">
                  <Link
                    href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dmy-activity%26utm_medium%3Dhome%26utm_campaign%26hl%3Den_GB%26pli%3D1&ec=GAlAwAE&hl=en_GB&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-1476156200%3A1712751508637500&theme=mn&ddm=0"
                    target="_blank"
                  >
                    <div className=" social_div ">
                      <div className="flex social_btn ">
                        <Image className=" social_img " src={google} />
                        <h3 className="checkoutlable">Continue with Google</h3>
                      </div>
                    </div>
                  </Link>
                  <Link href="https://www.facebook.com/login/" target="_blank">
                    <div className="my-[12px] social_div">
                      <div className="social_btn">
                        <Image className="social_img " src={fb} />
                        <h3 className="checkoutlable">
                          Continue with Facebook
                        </h3>
                      </div>
                    </div>{" "}
                  </Link>
                </div>
              </div>
              <div className="my-[30px]">
                <h4 className="text-[#555555] alata font-[400] text-[14px] leading-[26px] text-center">
                  Browse as Guest
                </h4>
              </div>
            </div>
          </form>
        </dialog>
      </div>
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
export default Navbar;
