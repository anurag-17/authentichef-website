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
import config from "@/config";
import DishDetails from "@/app/explore-dishes/dish-details/page";
import { Dialog, Transition } from "@headlessui/react";

const ChefDetails = ({ params }) => {
  const [getAChef, setGetAChef] = useState({});
  const [chefItems, setChefItems] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [dishID, setDishID] = useState("");
  const closeModal = () => setOpen(false);

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
      url: `http://13.43.174.21:4000/api/chef/chefs/${params.slug}`,
    };

    axios
      .request(option)
      .then((response) => {
        console.log(response.data); // Log the response to inspect its structure
        console.log(response?.data?.chef_id?.bannerImage, "bannerImage");
        setGetAChef(response?.data);
        setChefItems(response?.data?.menuItems);
        // Add the banner image URL to the state
        setBannerImage(response?.data?.bannerImage);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  console.log(params.slug, "jasjdkasj");

  return (
    <>
      <section>
        <Navbar />
        <div className=" ">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px] 2xl:pt-[220px] xl:pt-[140px] pt-[100px] 2xl:py-[100px] xl:py-[50px] py-[40px] mx-auto mnavbar">
            <div
              className="chefDishes-bg rounded-[15px] relative 2xl:h-[529px] xl:h-[360px] h-[280px] 2xl:pt-[295px] xl:pt-[200px] pt-[155px]"
              style={{ backgroundImage: `url(${bannerImage})` }}
            >
              <div className=" flex gap-5 2xl:w-[1414px] xl:w-[970px] w-[750px]  rounded-[15px] bg-white mx-auto 2xl:p-[50px] xl:p-[20px] p-[15px] chefdishWB">
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
                  <h1 className="alata font-[400] 2xl:text-[35px] 2xl:leading-[45px] xl:text-[20px] xl:leading-[35px] lg:text-[16px] lg:leading-[24px]">
                    Chef {getAChef?.name} Menu
                  </h1>
                  <p className="fourth_p text-[#555555]">
                    {/* Punjabi · North Indian · South Indian · Indian · Vegetarian */}
                  </p>
                  <div className="flex gap-3 2xl:my-[20px] xl:my-[15px] my-[10px]">
                    {/* <div className="2xl:w-[197px] 2xl:h-[37px] xl:w-[140px] xl:h-[30px] w-[130px]  h-[25px] bg-[#F3F3F3] flex justify-around items-center">
                      <Image src={cook} className="w-[17px]" />
                      <p className="fourth_day">1.1k+</p>
                      <p className=" fourth_day text-[#838383]">
                        Meals prepared
                      </p>
                    </div> */}
                    <div className="2xl:w-[197px] 2xl:h-[37px] xl:w-[140px] xl:h-[30px] w-[130px]  h-[25px bg-[#F3F3F3] flex justify-around items-center">
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
                        Lorem Ipsum is simply dummy
                      </h2>
                      <p className="fourth_day 2xl:my-[12px] xl:my-[8px] my-[6px]">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industrys
                        standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it
                        to make a type specimen book.
                      </p>
                    </div> */}
                  </div>
                  {/* <div className="2xl:my-[30px] ">
                    <h2 className="fourth_p text-[#555555]">
                      Lorem Ipsum is simply dummy
                    </h2>
                    <p className="fourth_day 2xl:my-[12px] xl:my-[8px] my-[6px] 2xl:w-[869px] xl:w-[600px] w-[540px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industrys
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="2xl:mt-[250px] xl:mt-[200px] mt-[180px] ">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]  2xl:pt-[120px] xl:pt-[60px] pt-[40px] mx-auto mnavbar">
            <div className="">
              <div>
                <h1 className="third_head">Popular Dishes</h1>
              </div>
            </div>
            <div className=" flex flex-wrap gap-[20px] xl:gap-[25px] 2xl:gap-[70px] w-full px-10 md:px-0 mx-auto">
              {Array.isArray(chefItems) &&
                chefItems.map((item) => (
                  <div
                    key={item.id}
                    className="  my-5 2xl:w-[345px] 2xl:h-[560px] lg:w-[23%]  md:w-[31%] w-[45%]  relative  rounded-[9.8px] "
                  >
                    <button className="" onClick={() => openModal(item._id)}>
                      <img
                        src={item.ProfileImage[0]}
                        alt={item.title}
                        width={345}
                        height={278}
                        className="w-full h-auto 2xl:w-[365.5px] 2xl:h-[278px] rounded-[10px]"
                      />
                    </button>
                    <div className="">
                      <h1 className="alata font-[400] text-[#DB5353] 2xl:my-4 xl:my-3 my-2 2xl:text-[20px] 2xl:leading-[20px]  xl:text-[14px] xl:leading-[18px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                        {item?.name}
                      </h1>
                      <div className="flex items-center 2xl:gap-3 xl:gap-2 lg:gap-2  gap-2 xl:my-3 lg:my-2 my-2">
                        <img
                          alt="image"
                          src={item?.chef_id?.images}
                          className="four_img2 "
                        />
                        <div>
                          <h1 className="fourth_name ">
                            {" "}
                            {item?.chef_id?.name}
                          </h1>
                          <p className="fourth_p text-[#6765EB]">
                            {item?.Cuisines_id?.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-5 2xl:my-[20px] xl:my-[15px] my-[12px]">
                        <button className="four_btn">
                          <img
                            alt="image"
                            src={vegetarian}
                            className="2xl:w-[13px] 2xl:h-[13px] lg:w-[10px] lg:h-[10px] w-[10px] h-auto"
                          />
                          <p className="fourth_day">Vegetarian</p>
                        </button>
                        <button className="four_btn">
                          <img
                            alt="image"
                            src={item?.Dietary_id?.ProfileImage}
                            className="2xl:w-[13px] 2xl:h-[13px] lg:w-[10px] lg:h-[10px] w-[10px] h-auto"
                          />
                          <p className="fourth_day">
                            {item?.Dietary_id?.title}
                          </p>
                        </button>
                      </div>
                      <div className="flex items-center gap-5  2xl:my-[20px] xl:my-[15px] my-[12px]">
                        <h1 className="fourth_p">Spice Level</h1>
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

                      <div className=" w-full bottom-0 flex justify-between items-center  2xl:my-[22px] xl:my-[18px] my-[15px]">
                        <p className="alata font-[400] text-[#000] 2xl:text-[20px] 2xl:leading-[24px] xl:text-[14px] xl:leading-[18px] lg:text-[12px] lg:leading-[16px] text-[12px] leading-[16px] ">
                          Serves 1 (500g){" "}
                          <span className="text-[#DB5353]">£8.50</span>
                        </p>
                        <button
                        // onClick={() => {
                        //   addToCart(item);
                        //   alert("Product Added");
                        // }}
                        >
                          <Image
                            src={addCart}
                            alt={item.title}
                            className=" mr-8 2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] lg:w-[25px] lg:h-[25px] w-[25px] h-[25px]"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <Footer />
      </section>
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
                <Dialog.Panel className="2xl:w-[1000px]  xl:w-[720px] w-[600px]  mx-auto rounded-[10px]  my-auto 2xl:px-[40px] 2xl:py-[45px] xl:px-[25px] xl:py-[30px] px-[15px] py-[20px] transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="h3"
                    onClick={closeModal}
                    className="custom_heading_text font-semibold leading-6 text-gray-900 mt lg:mt-0 absolute right-5 text-[30px]"
                  >
                    {" "}
                    X
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
