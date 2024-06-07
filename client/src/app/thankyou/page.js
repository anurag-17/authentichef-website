'use client';
import React from "react";
import thanku from "../assets/thankyou.svg";
import Image from "next/image";
import Navbar from "../navbar";
import Footer from "../footer";
import { useSelector } from "react-redux";


const ThankU = () => {
  const { token } = useSelector((state) => state?.auth);
  return (
    <>
      <section className="">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div>
            <Image src={thanku} className="2xl:w-[122px] xl:w-[70px] w-[40px] mx-auto" />
            <p className="alata font-[400] 2xl:text-[30px] 2xl:leading-[45px] xl:text-[20px] text-[16px] text-center">
              Thank you for your order! <br />A confirmation email has been sent
              to your inbox.
            </p>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default ThankU;
