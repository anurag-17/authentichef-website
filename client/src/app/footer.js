"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import fb from "../../public/images/fb.svg";
import insta from "../../public/images/insta.svg";
import tiktok from "../../public/images/tiktok.svg";
import google from "./assets/google.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const Footer = () => {
  const name = JSON.parse(localStorage.getItem("user_name"));
  const token = JSON.parse(localStorage.getItem("user_token"));

  // localStorage.removeItem("admin_token");
  // const [isLoader, setLoader] = useState(false);
  const router = useRouter();
  const [isRefresh, setRefresh] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const InputHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const refreshData = () => {
    setRefresh(!isRefresh);
  };
  // ==========Handle login==========

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoader(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        loginDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login Response:", res);
      if (res.data.success) {
        toast.success("Login successful!");
        handleClose();
        refreshData();
        localStorage.setItem("user_token", JSON.stringify(res?.data?.token));
        localStorage.setItem(
          "user_name",
          JSON.stringify(res?.data?.user?.firstname)
        );

        // router.push("/user/user-dashboard");
      } else {
        toast.error("Login failed, please try again later!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Server error!");
        // dispatch(removeToken());
      }
    } finally {
      // setLoader(false);
    }
  };

  // ==========Handle logout==========

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/logout", {
        headers: {
          authorization: token,
        },
      });
      if (res.status >= 200 && res.status < 300) {
        toast.success("Logout successfully");
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_name");
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
    const modal = document.getElementById("my_modal_1" );
    modal.close();
  };

  useEffect(() => {
    // Check if user token exists in local storage
    const userToken = localStorage.getItem("user_token");
    setIsLoggedIn(!!userToken); // Set isLoggedIn to true if user token exists
  }, [!isRefresh]);

  const handleLoginClick = () => {
    document.getElementById("my_modal_2").showModal();
  };

  const handleSignUpClick = () => {
    document.getElementById("my_modal_1").showModal();
  };
  return (
    <>
      <footer className="bg-[#F6F6F6] flex justify-center">
        <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]  2xl:mt-[100px] xl:mt-[50px] lg:mt-[35px] sm:mt-[30px] mt-[20px] mnavbar">
          <div className="flex  md:justify-between flex-wrap">
            <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
              <div className="lg:text-start text-center">
                <h1 className="footer_heading">Quick Links</h1>
                <Link href="/about-us">
                  <p className="footer_text">About us</p>
                </Link>
                <Link href="/explore-dishes">
                  <p className="footer_text">Explore Dishes</p>
                </Link>
                <Link href="/global-cuisines">
                  <p className="footer_text">Global Cuisines</p>
                </Link>
                <Link href="/FAQs">
                  <p className="footer_text">FAQs  </p>
                </Link>
              </div>
            </div>
            <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
              <div className="lg:text-start text-center">
                <h1 className="footer_heading">Resources</h1>
                <Link href="/become-chef">
                  <p className="footer_text">Become a chef</p>
                </Link>
                <Link href="/food-safety">
                  <p className="footer_text">Food Safety</p>
                </Link>
                <Link href="/contact-us">
                  <p className="footer_text">Contact us</p>
                </Link>
                <Link href="/chef-radha">
                  <p className="footer_text">Chef Dishes</p>
                </Link>
              </div>
            </div>
            <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
              <div className="lg:text-start text-center">
                <h1 className="footer_heading">Other Links</h1>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                  className="nav_login1"
                >
                  <p className="footer_text">Log In</p>
                </button>
                <br />
                <button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="nav_login1"
                >
                  <p className="footer_text">Sign Up</p>
                </button>
                <Link href="/privacy-policy">
                  <p className="footer_text">Privacy Policy</p>
                </Link>
                <Link href="/term-condition">
                  <p className="footer_text">Terms of Service</p>
                </Link>
              </div>
            </div>
            <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-4 lg:my-0">
              <div className="lg:text-start text-center">
                <h1 className="footer_heading">Connect with us</h1>
                <div className="flex gap-2 justify-center lg:justify-start">
                  <div>
                    <Link
                      href="https://www.facebook.com/profile.php?id=61553576243338"
                      target="_blank"
                    >
                      <Image
                        alt="image"
                        src={fb}
                        className="2xl:w-[30px] 2xl:h-[30px] h-auto w-auto"
                      />
                    </Link>
                  </div>

                  <div>
                    <Link
                      href="https://www.instagram.com/authentichef"
                      target="_blank"
                    >
                      <Image
                        alt="image"
                        src={insta}
                        className="2xl:w-[30px] 2xl:h-[30px] h-auto w-auto"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://www.tiktok.com/@authentichef"
                      target="_blank"
                    >
                      <Image
                        alt="image"
                        src={tiktok}
                        className="2xl:w-[30px] 2xl:h-[30px] h-auto w-auto"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="2xl:mt-[56px] xl:mt-[25px] lg:mt-[15px] first-letter sm:mt-[15px] mt-[10px]" />
          <div>
            <div className="flex justify-center 2xl:my-5 xl:my-3 lg:my-2 sm:my-2">
              <h1 className="footer_text_b ">
                © 2024 Authentichef | All Rights Reserved.
              </h1>
            </div>
          </div>
        </div>
      </footer>

      {/* =======Signup popup======= */}

      <div className="">
        <dialog
          id="my_modal_1"
          className="modal rounded-[10px] 2xl:w-[1000px] 2xl:h-[665px] xl:w-[620px] xl:h-[480px] lg:w-[480px] h-[400px] 2xl:mt-40 xl:mt-24 mt-14 p-0"
        >
          <form method="dialog" className=" w-full h-full mt-0">
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
              <h1 className="fourth_p">Sign up</h1>
            </div>
            <div className=" my-3 px-[40px]">
              <div className="flex flex-wrap justify-between 2xl:w-[775px] xl:w-[480px] mx-auto ">
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-[190px]">
                  <input
                    type="email"
                    name="email"
                    placeholder="First Name"
                    className="alata font-[400] login-inputad  w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    // onChange={InputHandler}
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-[190px]">
                  <input
                    type="email"
                    name="email"
                    placeholder="Last Name"
                    className="alata font-[400] login-inputad  w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    // onChange={InputHandler}
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-[190px]">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="alata font-[400] login-inputad  w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    // onChange={InputHandler}
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-[190px]">
                  <input
                    type="email"
                    name="email"
                    placeholder="Password"
                    className="alata font-[400] login-inputad  w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    // onChange={InputHandler}
                  />
                </div>
              </div>
              <div className="flex">
                <button className="w-full mx-auto alata text-white 2xl:text-[20px] 2xl:w-[368px] xl:w-[230px] lg:w-[190px] xl:text-[16px] text-[12px] rounded-[5px] 2xl:mt-[20px] xl:mt-[15px] mt-[10px] 2xl:h-[60px] xl:h-[40px] lg:h-[32px] text-center bg-[#DB5353]">
                  Create Account
                </button>
              </div>
              <div>
                <h1 className="alata font-[400] 2xl:my-[20px] xl:my-[10px] text-[14px] leading-[26px] text-center">
                  or
                </h1>
              </div>
              <div className="flex 2xl:mt-[20px]">
                <div className="mx-auto  2xl:w-[368px] xl:w-[230px]">
                  <Link
                    href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dmy-activity%26utm_medium%3Dhome%26utm_campaign%26hl%3Den_GB%26pli%3D1&ec=GAlAwAE&hl=en_GB&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-1476156200%3A1712751508637500&theme=mn&ddm=0"
                    target="_blank"
                  >
                    <div className=" social_div ">
                      <div className="flex social_btn ">
                        <Image className=" social_img " src={google} />
                        <h1 className="checkoutlable">Continue with Google</h1>
                      </div>
                    </div>
                  </Link>
                  <Link href="https://www.facebook.com/login/" target="_blank">
                    <div className="my-[12px] social_div">
                      <div className="social_btn">
                        <Image className="social_img " src={fb} />
                        <h1 className="checkoutlable">
                          Continue with Facebook
                        </h1>
                      </div>
                    </div>{" "}
                  </Link>
                </div>
              </div>
              <div className="my-[30px]">
                <h1 className="text-[#555555] alata font-[400] text-[14px] leading-[26px] text-center">
                  Browse as Guest
                </h1>
              </div>
            </div>
          </form>
        </dialog>
      </div>

      {/* =======Login======= */}

      <div className="">
        <dialog
          id="my_modal_2"
          className="modal rounded-[10px] 2xl:w-[1000px] 2xl:h-[632px] xl:w-[620px] xl:h-[450px] lg:w-[480px] h-[400px] 2xl:mt-40 xl:mt-24 mt-14 p-0"
        >
          <form method="dialog" className=" mt-0" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
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
                <h1 className="fourth_p">Login</h1>
              </div>
              <div className="2xl:w-[368px] xl:w-[280px] lg:w-[220px] sm:w-[] w-[]">
                <div className="2xl:mt-[35px] mt-[25px]">
                  <input
                    type="email"
                    name="email"
                    onChange={InputHandler}
                    placeholder="Enter your mail id"
                    className="alata font-[400] login-inputad  w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px]">
                  <input
                    type="password"
                    name="password"
                    onChange={InputHandler}
                    placeholder="Enter your Password"
                    className="alata font-[400] login-inputad  w-full"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                  />
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="w-full mx-auto alata text-white 2xl:text-[20px] 2xl:w-[368px] xl:w-[280px] lg:w-[220px] xl:text-[16px] text-[12px] rounded-[5px] 2xl:mt-[20px] xl:mt-[15px] mt-[15px] 2xl:h-[60px] xl:h-[40px] lg:h-[32px] text-center bg-[#DB5353]"
                  >
                    Login
                  </button>
                </div>
                <div>
                  <h1 className="alata font-[400] 2xl:my-[20px] xl:my-[10px] text-[14px] leading-[26px] text-center">
                    or
                  </h1>
                </div>

                <div className="my-[30px] flex justify-center">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="nav_login1"
                  >
                    <h1 className="text-[#DB5353] alata font-[400] text-[14px] leading-[26px] text-center mx-auto">
                      Sign Up
                    </h1>
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

export default Footer;
