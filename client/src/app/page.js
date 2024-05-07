import React from "react";
import LandingPage from "./user/page";
import Navbar from "./navbar";
import Footer from "./footer";

const Page = () => {
  return (
    <>
      <section>
        <div>
          <Navbar />
          <section className="soonbg h-screen flex items-center">
            <div className="alata font-[400]  2xl:text-[95px] 2xl:leading-[125px] xl:text-[60px] xl:leading-[70px] lg:text-[45px] lg:leading-[50px] text-[12px] leading-[18px] 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px] w-full mx-auto">
              <h1 className="2xl:w-[800px] xl:w-[550px] w-[400px]">
                Unveiling a World of Flavor
              </h1>
              <h2 className="mt-[20px]">(Coming Soon!)</h2>
            </div>
          </section>
          <Footer />
          {/* <LandingPage /> */}
        </div>
      </section>
    </>
  );
};

export default Page;
