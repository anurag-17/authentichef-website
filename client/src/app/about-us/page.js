import React from "react";
import Image from "next/image";
import Footer from "../footer";
import aboutCheff from "./assets/aboutUs-f.png";
import aboutDishes from "./assets/aboutUs-s.png";
import aboutChef from "./assets/aboutUs-t.png";
import Navbar from "../navbar";

const AboutUs = () => {
  return (
    <>
      <section>
        <Navbar />

        <div className="2xl:pt-[116px] xl:pt pt-[50px] aboutusmain">
          <div className="aboutUsBanner h-screen ">
            <div className=" 2xl:w-[905px] xl:w-[500px] lg:w-[330px] sm:w-[] w-[] text-center mx-auto ">
              <h1 className="faqhead text-white 2xl:pt-[165px] xl:pt-[110px] pt-[80px] aboutusmaintext">
                At authentichef, we see homemade meals as more than just food;
                theyre <span className="text-[#F38181]">journeys</span>
              </h1>
              <div className=" 2xl:w-[635px] xl:w-[380px] lg:w-[] sm:w-[] w-[] text-center mx-auto 2xl:mt-[30px] xl:mt-[15px] mt-[8px] xl:mt-[15px] mt-[10px] xl:pt-[20px] pt-[10px]">
                <p className="pop-head text-white  ">
                  A journey that takes us from the comforts of our childhood
                  memories to the excitement of exploring new flavours from
                  around the world.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFE8E8] 2xl:h-[937px] flex justify-center  2xl:py-[115px] xl:py-[60px] py-[50px]">
            <div className="text-center 2xl:w-[1293px] xl:w-[870px] lg:w-[600px] sm:w-[] w-[]  mx-auto">
              <h1 className="aboutHead">The Ever-Growing Problem</h1>
              <p className="aboutPara 2xl:mt-[50px] xl:mt-[30px] mt-[15px]">
                We get it. Daily life can be hectic, making it tough to cook
                healthy and tasty homemade meals and catering to individual food
                choices and specific dietary requirements.
              </p>
              <p className="aboutPara 2xl:mt-[30px]  xl:mt-[15px] mt-[8px] 2xl:w-[1063px] xl:w-[670px] lg:w-[520px] sm:w-[] w-[] mx-auto">
                Busy schedules, hard-to-find ingredients and cooking from
                scratch can all stand in the way. But spending hours in the
                kitchen isn’t the only option.
              </p>

              <h1 className="aboutHead 2xl:mt-[90px] xl:mt-[45px] mt-[25px]">
                Our Purpose
              </h1>

              <p className="aboutPara 2xl:mt-[50px] xl:mt-[30px] mt-[15px] 2xl:w-[1103px] xl:w-[680px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                Our journey began with a simple yet profound vision – to bring
                authentic, homemade dishes inspired by flavours from around the
                world - delivered straight to your home.
              </p>
              <p className="aboutPara 2xl:mt-[30px]  xl:mt-[15px] mt-[8px] 2xl:w-[1259px] xl:w-[800px] lg:w-[600px] sm:w-[] w-[] mx-auto">
                With a wide range of dishes catering to individual dietary
                preferences across various global cuisines, you can now sit back
                and enjoy a unique culinary experience without the hassle of
                cooking from scratch.
              </p>
              <p className="aboutPara 2xl:mt-[30px]  xl:mt-[15px] mt-[8px] 2xl:w-[723px] xl:w-[450px] lg:w-[350px] sm:w-[] w-[] mx-auto">
                Each chef and dish tells a story of tradition, love, and care,
                fostering a deep sense of connection with food.
              </p>
            </div>
          </div>

          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  2xl:py-[140px] xl:py-[80px] py-[40px]  md:w-[700px] flex justify-between mx-auto  mnavbar">
            <div>
              <div className="2xl:w-[1031px] xl:w-[680px] lg:w-[520px]">
                <Image
                  src={aboutCheff}
                  className=" 2xl:h-[617px] h-auto rounded-[15px] "
                />
              </div>
            </div>
          </div>



          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px] flex justify-between mx-auto  mnavbar">
            <div className="flex justify-between w-full 2xl:mb-[140px] xl:mb-[100px] mb-[60px] ">
              <div className="2xl:w-[760px] xl:w-[500px] lg:w-[380px] sm:w-[] w-[] aboutusbox ">
                <Image
                  src={aboutDishes}
                  className=" 2xl:h-[507px] h-auto rounded-[15px] aboutusimg"
                />
                <p className="2xl:w-[704px] xl:w-[420px] lg:w-[300px] sm:w-[] w-[] 2xl:mt-[40px] xl:mt-[20px] mt-[10px] aboutPara">
                  Each dish has a story that spans generations, rooted in
                  culture, tradition, and a love for distinct flavours, serving
                  people from all walks of life.
                </p>
              </div>
              <div className="2xl:w-[760px] xl:w-[500px] lg:w-[380px] sm:w-[] w-[] aboutusbox">
                <Image
                  src={aboutChef}
                  className=" 2xl:h-[507px] h-auto rounded-[15px] aboutusimg"
                />
                <p className="2xl:w-[704px] xl:w-[490px] lg:w-[380px] sm:w-[] w-[] 2xl:mt-[40px] xl:mt-[20px] mt-[10px] aboutPara">
                  Our chef-community believe that everyone deserves homemade
                  cooked food, no matter where they are. When served, they
                  strive to bring feelings of comfort, joy and a sense of
                  adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default AboutUs;
