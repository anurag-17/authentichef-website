"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import banner1 from "./assets/chef-banner1.png";
import banner2 from "./assets/chef-banner2.png";
import banner3 from "./assets/chef-banner3.png";
import boss from "./assets/own-boss.svg";
import dishmenu from "./assets/dishes-menu.svg";
import cook from "./assets/cook.svg";
import Footer from "../footer";
import Navbar from "../navbar";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

const BecomeChef = () => {
  const { token } = useSelector((state) => state?.auth);
  const formRef = useRef(null);

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [first, setFirst] = useState({
    FirstName: "",
    Surname: "",
    Phone: "",
    Email: "",
    Postcode: "",
    Status: "Pending",
  });

  const inputHandler = (e) => {
    setFirst({
      ...first,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.baseURL}/api/chefProfile`,
        first,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Your form has been submitted.");
        setFirst({
          FirstName: "",
          Surname: "",
          Phone: "",
          Email: "",
          Postcode: "",
        });
      } else {
        toast.error("Failed to submit the form. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <Navbar />
      <div className="w-full">
        <div className="flex justify-center">
          <div className="flex justify-center text-center sm:text-[20px] 2xl:mt-[76px] mx-auto">
            <div className="custom_container px-4 xl:pt-[130px] pt-[90px]">
              <h1 className="font-alata alata  text-[#111111] text-4xl font-[400] md:text-5xl lg:text-[2.7rem] lg:text-6xl xl:text-[45px] 2xl:text-[55px] leading-[1.3] md:leading-[1.2] xl:leading-[55px] 2xl:leading-[85px] mb-[10px]">
                Our Chef Community
              </h1>
              <div className="2xl:max-w-[1098px] alata xl:max-w-[700px] lg:max-w-[600px] mx-auto text-[#111111] mb-[25px] ">
                <p className="font-alata  text-base md:text-lg 2xl:mt-[16px] lg:text-xl font-[400] xl:text-[16px]  2xl:text-[25px] leading-[1.5] md:leading-[1.4] xl:leading-[30px] 2xl:leading-[50px] mb-[3px]">
                  Our diverse chef community is at the heart of the food we
                  serve.
                </p>
                <p className="font-alata alata  text-base md:text-lg lg:text-xl 2xl:mt-[12px] font-[400] xl:text-[16px] 2xl:text-[25px] leading-[1.5] md:leading-[1.4] xl:leading-[22px] 2xl:leading-[35px]">
                  We help new and established chefs start and grow their food
                  business and showcase their passion for creating culinary
                  experiences.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleButtonClick}
                  className="font-alata  xs:w-[50%] font-medium bg-[#DB5353] text-white rounded-[5px] w-[130px] xl:w-[160px] 2xl:w-[240px] py-1 xl:py-[12px] lg:py-[10px] px-3 lg:px-2 xl:px-2 2xl:px-4  mt-[20px] xs:py-[12px] xs:mx-auto text-[10px] lg:text-[10px] xl:text-[14px] 2xl:text-[20px]"
                >
                  Join the Waiting List
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f7bda6] w-full  md:mt-[50px] 2xl:mt-[70px] mt-[20px]">
          <div className="custom_container pb-10 lg:pb-20 2xl:pb-[55px] mnavbar">
            <div className="flex flex-col xs:px-[20px]  lg:flex-row items-center justify-between py-[30px] lg:py-[50px] xl:py-[60px]">
              <div className="xl:w-[70%]    lg:w-[70%] mb-5 2xl:w-[76%] lg:mb-0">
                <Image
                  src={banner1}
                  width={920}
                  height={507}
                  className="rounded-[15px] w-full lg:w-[100%] 2xl:h-[507px] 2xl:w-[920px]"
                  alt="Banner Image"
                />
              </div>
              <div className="w-full lg:w-[57%] sm:px-[30px] md:px-[30px] xl:w-[52%] 2xl:w-[47%] xl:pl-[80px] lg:pl-[60px] xl:mr-[20px] flex flex-col justify-center text-center lg:text-left lg:mx-0 mx-auto">
                <p className="text-[#111111] alata mb-4 text-sm sm:text-base 2xl:leading-[2.2rem]  xl:text-[16px] lg:text-[15px] 2xl:text-[25px] font-[400] xl:mb-[4px] 2xl:mb-[25px] lg:mb-[4px]">
                  We believe that every chef has a story worth sharing and a
                  talent worth celebrating.
                </p>
                <p className="text-[#111111] mb-4 alata text-sm sm:text-base  2xl:leading-[2.2rem] xl:text-[16px] xl:py-[10px] xl:leading-[26px] lg:text-[15px] 2xl:text-[25px] font-[400] xl:mb-[4px] 2xl:mb-[25px] lg:mb-[4px]">
                  By joining authentichef, you not only gain a platform to
                  showcase your unique culinary creations, but also become part
                  of a growing and vibrant community of like-minded individuals
                  passionate about food and culture.
                </p>
                <p className="text-[#111111] mb-4 alata text-sm sm:text-base 2xl:leading-[2.2rem] xl:text-[16px] lg:text-[15px] 2xl:text-[25px] font-[400] xl:mb-[4px] 2xl:mb-[25px] lg:mb-[4px]">
                  With our dedicated support, you can turn your love for cooking
                  into a growing food business, all while sharing your delicious
                  dishes with people across the UK.
                </p>
              </div>
            </div>
            <div className="flex flex-col xs:px-[20px] lg:flex-row gap-6 mt-10 md:mt-[-0.5rem] sm:mt-[-0.5rem] xs:mt-[-0.5rem] mb-5">
              <div className="flex-1 2xl:flex-[2.0] lg:flex-[2.6] xl:flex-[1.4] text-center lg:text-left">
                <Image
                  src={boss}
                  width={94}
                  height={94}
                  className="mx-auto lg:mx-0 mb-2 w-[45px] h-[45px] lg:w-[80px] lg:h-[80px]"
                  alt="Boss Image"
                />
                <h2 className="text-lg alata  2xl:text-2xl lg:text-[17px] xl:text-[20px] text-[#111111] mb-2 mt-4">
                  Be your own boss
                </h2>
                <p className="text-sm lg:text-base alata xl:text-[17px] lg:text-[14px] 2xl:text-lg text-[#111111] mt-2 2xl:max-w-[84%]">
                  Grow your own food business with little to no start-up costs
                </p>
              </div>

              <div className="flex-1 2xl:flex-[2.5] lg:flex-[3.6] xl:flex-[2.3] text-center lg:text-left">
                <Image
                  src={dishmenu}
                  width={73}
                  height={94}
                  className="mx-auto lg:mx-0 mb-2 w-[45px] h-[45px] lg:w-[80px] lg:h-[80px]"
                  alt="Dish Menu Image"
                />
                <h2 className="text-lg  alata 2xl:text-2xl lg:text-[17px] xl:text-[20px] text-[#111111] mb-2 mt-4">
                  Create a menu of high quality dishes
                </h2>
                <p className="text-sm lg:text-base alata xl:text-[17px] lg:text-[14px] 2xl:text-lg text-[#111111] mt-2">
                  Embrace tradition, cultural value, and authenticity in your
                  creations
                </p>
              </div>
              <div className="flex-1 2xl:flex-[3] sm:px-[30px] lg:flex-[3.1] xl:flex-[2] text-center lg:text-left">
                <Image
                  src={cook}
                  width={94}
                  height={94}
                  className="mx-auto lg:mx-0 mb-2 w-[45px] h-[45px] lg:w-[80px] lg:h-[80px]"
                  alt="Cook Image"
                />
                <h2 className="text-lg  alata 2xl:text-2xl lg:text-[17px] xl:text-[20px] text-[#111111] mb-2 mt-4 lg:w-[120%] xl:w-[100%] 2xl:w-[100%]">
                  Cook when you want and how often
                </h2>
                <p className="text-sm lg:text-base alata 2xl:text-lg xl:text-[17px] lg:text-[14px] text-[#111111] mt-2 xl:w-[125%] 2xl:w-[92%] lg:w-[131%]">
                  You make the dishes available, we pick up and deliver them{" "}
                  nationwide, safely to your customers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mx-auto">
          <div className="custom_container py-[30px] lg:py-[50px] xl:py-[60px] mnavbar ">
            <div className="flex flex-col md:flex-row justify-between items-stretch mx-auto xs:px-[20px]">
              <div className="w-full md:w-3/5 lg:mr-4 xl:w-[47%] 2xl:w-[52%] flex flex-col justify-between">
                <h2 className="font-alata alata text-[#111111] text-2xl  sm:mt-[30px] 2xl:mt-[0px] font-[400] leading-8 lg:text-3xl xs:mt-[20px] lg:mt-[0px] lg:leading-10 xl:text-[35px] xl:leading-[45px] 2xl:text-[45px] 2xl:leading-[75px]">
                  Are you considering starting your own food business from home?
                </h2>
                <p className="font-alata alata text-[#111111] mt-4 text-lg font-[400] leading-6 lg:text-xl lg:leading-8 xl:text-2xl xl:leading-[35px] 2xl:text-[36px] 2xl:leading-[55px]">
                  Our Services to get you started and growing!
                </p>
                <div className="mt-6  space-y-6 xl:space-y-4 2xl:space-y-6">
                  <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                    <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                      <div>
                        <h2 className="become-no alata pt-1">01</h2>
                      </div>
                      <div>
                        <h2 className="become-head alata text-[#111111]">
                          Registration Assistance
                        </h2>
                        <p className="become-para mt-2 alata xl:mt-2 2xl:mt-3 text-[#111111]">
                          We expertly guide you through the registration process
                          with your local council, ensuring a smooth start for
                          your food business.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                    <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                      <div>
                        <h2 className="become-no alata pt-1">02</h2>
                      </div>
                      <div>
                        <h2 className="become-head text-[#111111]">
                          Food Safety and Hygiene Certification
                        </h2>
                        <p className="become-para mt-2 xl:mt-2 2xl:mt-3 text-[#111111]">
                          We’ll assist you in obtaining the necessary
                          certifications to comply with UK Food Safety and
                          Hygiene Laws. Our guidance will help you achieve the
                          highest food rating score, ensuring full compliance.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                    <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                      <div>
                        <h2 className="become-no alata pt-1 ">03</h2>
                      </div>
                      <div>
                        <h2 className="become-head text-[#111111]">
                          Chef Onboarding Support
                        </h2>
                        <p className="become-para mt-2 xl:mt-2 2xl:mt-3 text-[#111111]">
                          We’re here to support passionate chefs like you in
                          sharing your cultural heritage through your dishes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                    <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                      <div>
                        <h2 className="become-no alata pt-1 ">04</h2>
                      </div>
                      <div>
                        <h2 className="become-head text-[#111111]">
                          UK Nationwide Delivery
                        </h2>
                        <p className="become-para mt-2 xl:mt-2 2xl:mt-3 text-[#111111]">
                          Leave the logistics to us! We’ll handle the delivery
                          of your dishes to customers all across the UK.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                    <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                      <div>
                        <h2 className="become-no alata pt-1 ">05</h2>
                      </div>
                      <div>
                        <h2 className="become-head alata text-[#111111]">
                          Ongoing Support
                        </h2>
                        <p className="become-para mt-2 alata xl:mt-2 2xl:mt-3 text-[#111111]">
                          Our commitment doesn’t end with delivery. We provide
                          continuous sales and marketing promotion to fuel the
                          long-term growth of your business.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/5 xl:w-[470px] 2xl:w-[712px] flex items-stretch mt-12 xs:mt md:mt-0 md:ml-6 order-first md:order-last">
                <Image
                  src={banner2}
                  className="rounded-[15px] w-full object-cover"
                  alt="Banner Image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full ">
          <div className="bg-[#FFE2E2] py-24 lg:py-16 xl:py-20 xs:py-[2rem] w-full xs:px-[20px] md:py-[4rem] ">
            <div
              ref={formRef}
              className="custom_containertext-center text-center mnavbar"
            >
              {/* <div
              ref={formRef}
              className="2xl:max-w-[1600px] xl:max-w-[1100px] lg:max-w-[850px] md:max-w-[800px] mx-auto text-center mnavbar"
            > */}

              <h2 className="font-alata font-medium text-[#111111] text-2xl leading-8 sm:text-3xl sm:leading-9 md:text-[30px] md:leading-10 xl:text-[35px] xl:leading-[45px] 2xl:text-[45px] 2xl:leading-[75px]">
                Ready to Get Started?
              </h2>
              <p className="font-alata font-medium text-[#111111] mt-6 sm:mt-4 text-sm leading-5 sm:text-base sm:leading-6 md:text-lg md:leading-7 xl:text-xl xl:leading-8 2xl:text-2xl 2xl:leading-10">
                Contact us today to turn your passion for cooking into a
                thriving business!
              </p>
            </div>
          </div>
        </div>

        <div className="2xl:w-[1600px] mnavbar xs:px-[20px] md:px-[0px] sm:px-[20px] lg:w-[850px] md:w-[745px] w-full mx-auto flex flex-col sm:flex-row justify-between items-center  px-4 xl:w-[77%] h-full  py-[30px] lg:py-[50px] xl:py-[60px]">
          <div className="2xl:w-[45%] xl:w-[42%] md:w-[50%] sm:w-[50%] mb-8 sm:mb-0 h-full">
            <Image
              src={banner3}
              className="rounded-[15px] w-full h-full object-cover max-w-[686px] sm:max-w-[465px] lg:max-w-[313px] xl:max-w-[428px] 2xl:max-w-[686px]"
              alt="Chef Banner"
            />
          </div>
          <div className="w-full sm:w-[44%] lg:w-[57%] xl:w-[50%] 2xl:w-[46%] max-w-[720px] md:ml-[20px] h-full flex flex-col justify-center">
            <h3 className="font-alata text-[#111111] font-[500] xl:text-[2.5rem] text-2xl sm:text-[22px] md:text-[30px] leading-8 text-center sm:text-left sm:text-3xl sm:leading-9 md:text-[30px] md:leading-10 xl:text-[35px] xl:leading-[45px] 2xl:text-[45px] 2xl:leading-[75px] mb-6">
              Join the Chef Waiting List
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col alata gap-4 md:gap-5 xs:gap-5"
            >
              <div className="flex flex-col sm:flex-row gap-4 xs:gap-5">
                <input
                  name="FirstName"
                  placeholder="First Name"
                  className="profile_input w-full sm:w-1/2"
                  value={first.FirstName}
                  onChange={inputHandler}
                />
                <input
                  name="Surname"
                  placeholder="Surname"
                  className="profile_input w-full sm:w-1/2"
                  value={first.Surname}
                  onChange={inputHandler}
                />
              </div>
              <input
                name="Phone"
                placeholder="Phone"
                type="number"
                className="profile_input w-full"
                value={first.Phone}
                onChange={inputHandler}
              />
              <input
                name="Email"
                placeholder="Email"
                type="email"
                className="profile_input w-full"
                value={first.Email}
                onChange={inputHandler}
              />
              <input
                name="Postcode"
                placeholder="Post Code"
                className="profile_input w-full"
                value={first.Postcode}
                onChange={inputHandler}
              />
              <button className="font-alata font-medium bg-[#DB5353] text-white rounded-5 py-2 mt-4 hover:bg-[#7e2727] w-auto h-auto lg:w-30 lg:h-14 xl:w-30 xl:h-14 2xl:w-30 2xl:h-14">
                Submit
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BecomeChef;
