import React from "react";
import LandingPage from "./user/page";
import Navbar from "./navbar";
import Footer from "./footer";
import logo from "./assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <section>
        <div>
          {/* <section>
            <nav className="z-50 flex justify-center bg-[#F38181] 2xl:h-[116px] xl:h-[80px] lg:h-[50px] sm:h-[45px] h-12 w-full mnavbar-h fixed">
              <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px] w-full px-10 md:px-0  flex justify-between items-center mnavbar">
                <div className="w-1/3 flex justify-center mx-auto">
                  <Image alt="logo" src={logo} className="nav_logo cursor-pointer" />
                </div>
              </div>
            </nav>
          </section>
          <section className="soonbg h-screen flex items-center">
            <div className="alata font-[400]  2xl:text-[95px] 2xl:leading-[125px] xl:text-[60px] xl:leading-[70px] lg:text-[45px] lg:leading-[50px] text-[12px] leading-[18px] 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px] w-full mx-auto">
              <h1 className="2xl:w-[800px] xl:w-[550px] w-[400px]">
                Unveiling a World of Flavor
              </h1>
              <h2 className="mt-[20px]">(Coming Soon!)</h2>
            </div>
          </section> */}

          <LandingPage />
        </div>
      </section>
    </>
  );
};

export default Page;
