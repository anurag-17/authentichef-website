"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import sidemanu from "../../../public/images/side-menu.svg";
import logo from "../../../public/images/logo.svg";
import fb from "../../../public/images/fb.svg";
import insta from "../../../public/images/insta.svg";
import tiktok from "../../../public/images/tiktok.svg";
import foodPoster from "../assets/cartPoster.webp";
import chef from "../../../public/images/chef.svg";
import img1 from "../../../public/images/fi_4767107.svg";
import img2 from "../../../public/images/fi_4718655.svg";
import img3 from "../../../public/images/fi_11493268.svg";
// import img4 from "../../../public/images/Group.svg";
import Link from "next/link";
import Rectangle1 from "../assets/populardishes-spaghetti.png";
import Rectangle2 from "../assets/populardishes-cheesesandwich.png";
import Rectangle3 from "../assets/populardishes-chickenkabab.png";
import Rectangle4 from "../assets/populardishes-paneerbuttermasala.png";
import addCart from "../../../public/images/addCart.svg";
import group from "../../../public/images/Group211.svg";
import thumsUp from "../../../public/images/thumsUp.svg";
import Rectangle5 from "../assets/main-items-bhindisabjhi.png";
import Rectangle6 from "../assets/main-items-alloosabhji.png";
import Rectangle7 from "../assets/main-items-vegpulav.png";
import Rectangle8 from "../assets/main-item-palakpaneer.png";
import Rectangle9 from "../assets/main-items-paneer-butter-masala.png";
import Rectangle10 from "../assets/main-items-alloosabhji2nd.png";
import emptyCart from "../../../public/images/emptyCart.svg";
import { useCart } from "../create-context/cart-context";
import { CartProvider } from "../create-context/cart-context";
import plus from "../../../public/images/plus.svg";
import minus from "../../../public/images/minus.svg";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../navbar";

const data = [
  {
    id: "1",
    image: Rectangle1,
    title: "Spaghetti",
    percentage: "95% (23)",
    price: "8.50",
    image2: addCart,
  },
  {
    id: "2",
    image: Rectangle2,
    title: "Cheese, honey, omelette sandwich",
    percentage: "93% (45)",
    price: "8.50",
    image2: addCart,
  },
  {
    id: "3",
    image: Rectangle3,
    title: "Chicken kabab",
    percentage: "95% (23)",
    price: "10.50",
    image2: group,
  },
  {
    id: "4",
    image: Rectangle4,
    title: "Paneer butter masala",
    percentage: "95% (23)",
    price: "8.50 ",
    image2: addCart,
  },
  {
    id: "5",
    image: Rectangle4,
    title: "Salad",
    percentage: "95% (23)",
    price: "8.50",
    image2: addCart,
  },
];
const data2 = [
  {
    id: "1",
    image: Rectangle5,
    title: "Bhindi Sabjhi",
    percentage: "95% (23)",
    price: "£8.50",
    image2: addCart,
  },
  {
    id: "2",
    image: Rectangle6,
    title: "Alloo Sabhji",
    percentage: "93% (45)",
    price: "£8.50",
    image2: addCart,
  },
  {
    id: "3",
    image: Rectangle7,
    title: "Veg Pulav",
    percentage: "95% (23)",
    price: "£8.50",
    image2: addCart,
  },
  {
    id: "4",
    image: Rectangle8,
    title: "Palak Paneer",
    percentage: "95% (23)",
    price: "£8.50 ",
    image2: addCart,
  },
  {
    id: "5",
    image: Rectangle9,
    title: "Paneer butter masala",
    percentage: "95% (23)",
    price: "£8.50",
    image2: addCart,
  },
  {
    id: "5",
    image: Rectangle10,
    title: "Alloo Sabhji",
    percentage: "95% (23)",
    price: "£8.50",
    image2: addCart,
  },
];

const Products = ({ item }) => {
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

  return (
    <>
      <section className="bg-[#EFEFEF]">
      <Navbar/>

        {/* ===================First================== */}
        <div className="w-full 2xl:h-[149px] xl:h-[75px] lg:h-[60px] h-[60px] flex justify-center items-center bg-[#F5F5F5]">
          <div className="">
            <h1 className="fourth_title text-center">Chef Dishes</h1>
            <p className="alata font-[400] text-[#828282] 2xl:text-[16px] 2xl:leading-[30px] xl:text-[12px] xl:leading-[22px] lg:text-[12px] lg:leading-[18px] text-[12px] leading-[18px] text-center mt-1 2xl:mt-2 ">
              Home - Chef Dishes
            </p>
          </div>
        </div>

        <div className="bg-[#EFEFEF] flex justify-center lg:justify-between">
          <div>
            {/* ===================second================== */}

            <div className="2xl:ml-[160px] xl:ml-[130px] lg:ml-[95px] flex justify-between">
              <div className="2xl:w-[1170px]  xl:w-[800px] lg:w-[600px] md:w-[700px] w-full px-10 md:px-0 mx-auto ">
                <Image
                  src={foodPoster}
                  alt="foodPoster"
                  className="2xl:w-[1167px] 2xl:h-[482px]"
                />
                <div className="flex 2xl:my-12 2xl:gap-8 lg:gap-3 ">
                  <div className="xl:mt-5 lg:mt-6 mt-6">
                    <Image
                      src={chef}
                      alt="chef"
                      className="2xl:w-[154px] 2xl:h-[154px] mx-auto xl:w-[80px] xl:h-[80px] lg:w-[70px] lg:h-[70px] w-[70px] h-[70px]"
                    />
                  </div>
                  <div className="">
                    <h1 className=" alata font-[400] 2xl:text-[35px] 2xl:leading-[45px] 2xl:my-1 xl:text-[20px] xl:leading-[30px] xl:my-0 xl:mt-5 lg:text-[16px] lg:leading-[25px] lg:mt-6 mt-4 sm:text-[18px] sm:leading-[30px] my-1 text-[14px] leading-[30px]">
                      Shef Radha’s Menu
                    </h1>
                    <p className="alata font-[400] text-[#555555] 2xl:text-[16px] 2xl:leading-[24px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                      Punjabi · North Indian · South Indian · Indian ·
                      Vegetarian
                    </p>
                    <div className="flex gap-2 2xl:my-5 my-3">
                      <div className="flex gap-1  justify-around items-center bg-[#F3F3F3] 2xl:w-[197px] 2xl:h-[37px] xl:h-[30px] xl:w-[180px] lg:h-[25px] lg:w-[150px] h-[25px] w-[130px] text-[10px]">
                        <Image
                          src={img1}
                          className="2xl:w-[17px] 2xl:h-[17px] w-[15px] h-[15px]"
                        />
                        <p className="alata font-[400] text-[#000000] 2xl:text-[16px] 2xl:leading-[24px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                          1.1k+
                        </p>
                        <p className="alata font-[400] text-[#838383] 2xl:text-[16px] 2xl:leading-[24px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                          Meals prepared
                        </p>
                      </div>
                      <div className="flex justify-around items-center bg-[#F3F3F3] 2xl:w-[197px] 2xl:h-[37px] xl:h-[30px] xl:w-[180px] lg:h-[25px] lg:w-[150px] h-[25px] w-[130px]">
                        <Image
                          src={img2}
                          className="2xl:w-[17px] 2xl:h-[17px]"
                        />
                        <p className="alata font-[400] text-[#000000] 2xl:text-[16px] 2xl:leading-[24px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                          Certified
                        </p>
                        <p className="alata font-[400] text-[#838383] 2xl:text-[16px] 2xl:leading-[24px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                          Food safety
                        </p>
                      </div>
                    </div>
                    <p className=" alata font-[400] text-[#000000] 2xl:text-[14px] 2xl:leading-[24px] 2xl:w-[870px] xl:w-[600px] lg:w-[500px] w-[490px] xl:text-[10px] xl:leading-[20px] lg:text-[8px] lg:leading-[16px] text-[8px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry s
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================Third================== */}
            <div className="2xl:ml-[160px] xl:ml-[130px] lg:ml-[95px] my-10">
              <h1 className="alata font-[400] text-[#000] 2xl:text-[14px] 2xl:leading-[24px] xl:text-[10px] xl:leading-[20px] lg:text-[8px] lg:leading-[16px] text-[8px]">
                Browse By Meal Type
              </h1>
              <div className="flex gap-5 2xl:my-5">
                <div className=" bg-[#F3F3F3] rounded-[6px] 2xl:w-[166px] 2xl:h-[97px] xl:w-[100px] xl:h-[55px]  lg:w-[90px] lg:h-[50px] w-[90px] h-[50px] flex justify-center items-center">
                  <div>
                    {/* <Image
                      src={img4}
                      className="2xl:w-[18px] 2xl:h-[17.18px] xl:w-[14px] xl:h-[13.18px] mx-auto"
                    /> */}
                    <h1 className="2xl:mt-3 alata font-[400] text-[#000] 2xl:text-[16px] 2xl:leading-[24px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                      Popular
                    </h1>
                  </div>
                </div>
                <div className=" bg-[#F3F3F3] rounded-[6px] 2xl:w-[166px] 2xl:h-[97px] xl:w-[100px] xl:h-[55px]  lg:w-[90px] lg:h-[50px] w-[90px] h-[50px] flex justify-center items-center">
                  <div>
                    <Image
                      src={img3}
                      className="2xl:w-[18px] 2xl:h-[17.18px] xl:w-[14px] xl:h-[13.18px] mx-auto"
                    />
                    <h1 className="2xl:mt-3 alata font-[400] text-[#000] 2xl:text-[16px] 2xl:leading-[24px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                      Mains
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            {/* ===================Fourth================== */}

            <div className="2xl:ml-[160px] xl:ml-[130px] lg:ml-[95px] 2xl:my-20 xl:my-12 my-8">
              <h1 className="alata font-[400] text-[#111] 2xl:my-10 xl:my-5 my-4 2xl:text-[45px] 2xl:leading-[55px]  xl:text-[28px] xl:leading-[40px] lg:text-[22px] text-[22px] lg:leading-[30px]">
                Popular Dishes
              </h1>

              <div className="flex justify-between 2xl:w-[1170px]  xl:w-[800px] lg:w-[600px] md:w-[700px] w-full px-10 md:px-0 mx-auto">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white 2xl:w-[216px] 2xl:h-[341px] xl:h-[250px] w-[18%] lg:h-[200px] h-[240px] relative  rounded-[5.8px] "
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="rounded-[5px]"
                    />
                    <div className="p-2">
                      <h1 className="alata font-[400] text-[#000000] xl:my-1 2xl:text-[16px] 2xl:leading-[20px]  xl:text-[12px] xl:leading-[18px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                        {item.title}
                      </h1>
                      <div className="flex justify-center 2xl:my-3 bg-[#FFE7E7] rounded-[4px] gap-1 items-center 2xl:w-[89px] 2xl:h-[26px] xl:w-[60px] xl:h-[22px] w-[60%] my-2 h-[20px] ">
                        <Image
                          src={thumsUp}
                          className="2xl:w-[14px] 2xl:h-[14px] xl:w-[10px] xl:h-[10px] w-[10px] h-[10px]"
                        />
                        <p className="alata font-[400] text-[#464646] 2xl:text-[12px] 2xl:leading-[20px] xl:text-[8px] xl:leading-[18px] lg:text-[7px] lg:leading-[16px] text-[7px]">
                          {item.percentage}
                        </p>
                      </div>
                      <div className="absolute w-full bottom-0 flex justify-between items-center mb-2 ">
                        <p className="alata font-[400] text-[#000] 2xl:text-[16px] 2xl:leading-[24px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                          £{item.price}
                        </p>
                        <button
                          onClick={() => {
                            addToCart(item);
                            alert("Product Added");
                          }}
                        >
                          <Image
                            src={item.image2}
                            alt={item.title}
                            className="mr-4  2xl:w-[30px] 2xl:h-[30px] xl:w-[22px] xl:h-[22px] lg:w-[18px] lg:h-[18px] w-[18px] h-[18px]"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===================Five================== */}

            <div className="2xl:ml-[160px] xl:ml-[130px] lg:ml-[95px] lg:my-20 my-8">
              <h1 className="alata font-[400] text-[#111] 2xl:my-5 2xl:text-[45px] 2xl:leading-[55px]  xl:text-[28px] xl:leading-[40px] lg:text-[20px] lg:leading-[30px]">
                Wednesday’s Main Items
              </h1>
              <div className="bg-[#EFEFEF] flex flex-wrap justify-between 2xl:w-[1170px]  xl:w-[800px] lg:w-[600px] md:w-[700px] w-full px-10 md:px-0 mx-auto">
                {data2.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white  my-5 2xl:w-[365.5px] 2xl:h-[503px] xl:w-[31%] xl:h-[360px] md:w-[31%] lg:h-[300px] h-[300px] relative  rounded-[9.8px] "
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="2xl:w-[365.5px] 2xl:h-[293.97px] rounded-[10px]"
                    />
                    <div className="p-4">
                      <h1 className="alata font-[400] text-[#000000] xl:my-1 2xl:text-[20px] 2xl:leading-[20px]  xl:text-[14px] xl:leading-[18px] lg:text-[10px] lg:leading-[16px] text-[10px]">
                        {item.title}
                      </h1>
                      <div className="flex justify-center 2xl:my-3 bg-[#FFE7E7] rounded-[4px] gap-1 items-center 2xl:w-[105px] 2xl:h-[34px] xl:w-[80px] xl:h-[25px] w-[40%]  my-2">
                        <Image
                          src={thumsUp}
                          className="2xl:w-[18.27px] 2xl:h-[18.27px] xl:w-[12px] xl:h-[12px] w-[12px] h-[12px]"
                        />
                        <p className="alata font-[400] text-[#464646] 2xl:text-[13px] 2xl:leading-[20px] xl:text-[8px] xl:leading-[18px] lg:text-[7px] lg:leading-[16px] text-[7px]">
                          {item.percentage}
                        </p>
                      </div>
                      <hr className="border-[1.69px] 2xl:mt-12 xl:mt-9 lg:mt-10 mt-6" />
                      <div className="absolute w-full bottom-0 flex justify-between items-center mb-4">
                        <p className="alata font-[400] text-[#000] 2xl:text-[20px] 2xl:leading-[30px] xl:text-[14px] xl:leading-[18px] lg:text-[12px] lg:leading-[16px]">
                          {item.price}
                        </p>
                        <button
                          onClick={() => {
                            addToCart(item);
                            alert("Product Added");
                          }}
                        >
                          <Image
                            src={item.image2}
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

          <div className="bg-white hidden lg:block 2xl:w-[505px] xl:w-[350px] lg:w-[290px]  rounded-s-[15px]">
            <div className="p-5">
              <h1 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[22px] text-[22px] 2xl:leading-[32px]  xl:text-[18px] xl:leading-[24px] lg:text-[14px] lg:leading-[20px]">
                My cart
              </h1>
              {cart.length === 0 ? (
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
                  {cart.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-center 2xl:my-6 my-2">
                        <div className="flex items-center gap-2 2xl:gap-4 xl:h-[70px]">
                          <Image
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
        </div>

        {/* ===================Footer================== */}
        <footer className="bg-[#F6F6F6] flex justify-center pt-5 lg:pt-8 2xl:pt-14">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] w-full px-10 md:px-0 mx-auto  2xl:mt-[100px] xl:mt-[50px] lg:mt-[35px]">
            <div className="flex justify-between">
              <div className="">
                <div>
                  <h1 className="footer_heading">Quick Links</h1>
                  <p className="footer_text">Our Story</p>
                  <p className="footer_text">Food Safety</p>
                  <p className="footer_text">Help Center</p>
                  <p className="footer_text">Global Cuisines</p>
                </div>
              </div>
              <div className="">
                <div>
                  <h1 className="footer_heading">Resources</h1>
                  <p className="footer_text">
                    Become a chef
                    <p className="footer_text">Browse more chef</p>
                    <p className="footer_text">Homemade food delivery</p>
                  </p>
                </div>
              </div>
              <div className="">
                <div>
                  <h1 className="footer_heading">Other Links</h1>
                  <p className="footer_text">Log In</p>
                  <p className="footer_text">Sign Up</p>
                  <p className="footer_text">Privacy Policy</p>
                  <p className="footer_text">Terms of Service</p>
                </div>
              </div>
              <div className="">
                <div>
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
            <hr className="2xl:mt-[56px] xl:mt-[25px] lg:mt-[15px] mt-2" />
            <div>
              <div className="flex justify-center 2xl:my-5 xl:my-3 lg:my-2">
                <h1 className="footer_text_b">
                  © 2024 Authentichef | All Rights Reserved
                </h1>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      {" "}
      {/* Wrapping the component tree with CartProvider */}
      <Products />
    </CartProvider>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
