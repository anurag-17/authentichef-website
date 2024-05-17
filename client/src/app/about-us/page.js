import React from "react";
import Image from "next/image";
import Footer from "../footer";
import aboutCheff from "./assets/aboutUs-f.png";
import aboutDishes from "./assets/aboutUs-s.png";
import aboutChef from "./assets/aboutUs-t.png";
import Navbar from "../navbar";
import dummy from "./assets/dummy.svg";
import timer from "./assets/timer.svg";
import profile from "./assets/profile.svg";
import hand2 from "./assets/hand2.svg";

const AboutUs = () => {
  return (
    <>
      <section>
        <Navbar />

        <div className="2xl:pt-[116px] xl:pt pt-[50px] aboutusmain">
          <div className="aboutUsBanner 2xl:h-[100%] xl:h-[100%] lg:h-[100%] md:h-[50%] sm:h-[50%] xs:h-[60%]  h-screen ">
            <div className=" 2xl:w-[905px] xl:w-[500px] lg:w-[330px] sm:w-[] w-[] xs:mx-[10px] text-center mx-auto ">
              <h1 className="faqhead text-white 2xl:pt-[165px] xl:pt-[110px] pt-[80px] aboutusmaintext">
                At authentichef, we see homemade meals as more than just food;
                theyre <span className="text-[#F38181]">journeys</span>
              </h1>
              <div className=" 2xl:w-[635px] xl:w-[380px] lg:w-[] sm:w-[] w-[] text-center mx-auto 2xl:mt-[30px]  xl:mt-[15px] mt-[10px] xl:pt-[20px] pt-[10px]">
                <p className="pop-head text-white  ">
                  A journey that takes us from the comforts of our childhood
                  memories to the excitement of exploring new flavours from
                  around the world.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFE8E8] 2xl:h-[937px] flex justify-center  2xl:py-[115px] xl:py-[60px] sm:mt-12 py-[50px] xs:mt-12 md:mt-12">
            <div className="text-center 2xl:w-[1293px] xl:w-[870px] lg:w-[600px] sm:w-[] w-[]  mx-auto xs:mx-[10px]">
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

          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] 2xl:py-[140px] xl:py-[80px] py-[40px] md:w-[700px] xs:w-[200px] sm:w-[500px]  flex justify-between mx-auto mnavbar relative">
            {/* Ensure the container is set to flex and justify-between */}
            <div>
              <div className="2xl:w-[1031px] xl:w-[680px] lg:w-[520px]">
                <Image
                  src={aboutCheff}
                  className="2xl:h-[617px] h-auto rounded-[15px]"
                />
              </div>
            </div>
            {/* Overlay Div */}
            {/* <div className="shadow-[0px_0px_110px_0px_rgba(0,0,0,0.08)] right-0 rounded-[15px] bg-[#FFFFFF]  2xl:m-[60px_160px_229px_800px] xl:m-[40px_140px_210px_600px] flex flex-col p-[61px_56px_61px_45px] 2xl:w-[800px] xl:w-[600px] xl:h-[50%] box-sizing-border absolute">
                <div className="m-[0_0_30px_0] flex flex-row justify-between self-start w-[552.6px] box-sizing-border">
                  <div className="flex flex-row box-sizing-border">
                    <div className="rounded-[30px] bg-[#FFE8E8] relative m-[0_27px_0_0] flex p-[15px_15px_15px_15px] w-[60px] h-[60px] box-sizing-border">
                      <div className="flex w-[30px] h-[30px] box-sizing-border">
                        <Image src={dummy} className="w-[30px] h-[30px]" />
                      </div>
                    </div>
                    <div className="m-[10px_0_10px_0] inline-block break-words font-['Alata'] font-normal text-[30px] leading-[1.333] text-[#000000]">
                      No Hassle
                    </div>
                  </div>
                  <div className="m-[13px_0_13px_0] inline-block break-words font-['Alata'] font-normal text-[24px] leading-[1.417] text-[#000000]">
                    no need to cook!
                  </div>
                </div>
                <div className="m-[0_0_36px_0] flex flex-row justify-between self-start w-[666.7px] box-sizing-border">
                  <div className="flex flex-row box-sizing-border">
                    <div className="rounded-[30px] bg-[#FFE8E8] relative m-[0_27px_0_0] flex p-[15px_15px_15px_15px] w-[60px] h-[60px] box-sizing-border">
                      <div className="flex w-[30px] h-[30px] box-sizing-border">
                        <Image src={profile} className="w-[30px] h-[30px]" />
                      </div>
                    </div>
                    <div className="m-[12px_0_8px_0] inline-block break-words font-['Alata'] font-normal text-[30px] leading-[1.333] text-[#000000]">
                      Personalisation
                    </div>
                  </div>
                  <div className="m-[15px_0_11px_0] inline-block break-words font-['Alata'] font-normal text-[24px] leading-[1.417] text-[#000000]">
                    mix and match your dishes
                  </div>
                </div>
                <div className="m-[0_0_30px_0] flex flex-row justify-between w-[699px] box-sizing-border">
                  <div className="flex flex-row box-sizing-border">
                    <div className="rounded-[30px] bg-[#FFE8E8] relative m-[0_27px_0_0] flex p-[15.5px_15.5px_15.5px_15.5px] w-[60px] h-[60px] box-sizing-border">
                      <div className="flex w-[29.1px] h-[29.1px] box-sizing-border">
                        <Image src={hand2} className="w-[29.1px] h-[29.1px]" />
                      </div>
                    </div>
                    <div className="m-[8px_0_12px_0] inline-block break-words font-['Alata'] font-normal text-[30px] leading-[1.333] text-[#000000]">
                      Convenient
                    </div>
                  </div>
                  <div className="m-[11px_0_15px_0] inline-block break-words font-['Alata'] font-normal text-[24px] leading-[1.417] text-[#000000]">
                    delivered directly to your door
                  </div>
                </div>
                <div className="m-[0_19px_0_0] flex flex-row justify-between w-[680px] box-sizing-border">
                  <div className="m-[0_0_21px_0] flex flex-row box-sizing-border">
                    <div className="rounded-[30px] bg-[#FFE8E8] relative m-[0_27px_0_0] flex p-[15px_15px_15px_15px] w-[60px] h-[60px] box-sizing-border">
                      <div className="flex w-[30px] h-[30px] box-sizing-border">
                        <Image src={timer} className="w-[30px] h-[30px]" />
                      </div>
                    </div>
                    <div className="m-[10px_0_10px_0] inline-block break-words font-['Alata'] font-normal text-[30px] leading-[1.333] text-[#000000]">
                      Time Saving
                    </div>
                  </div>
                  <div className="m-[13px_0_0_0] inline-block break-words font-['Alata'] font-normal text-[24px] leading-[1.417] text-[#000000]">
                    heat your homemade meals <br></br> within 20 minutes
                  </div>
                </div>
              </div> */}
          </div>

          <div class="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] xs:w-[200px] sm:w-[500px]   w-full flex justify-between mx-auto mnavbar">
            <div class="flex flex-col w-full md:flex-row md:justify-between 2xl:mb-[140px] xl:mb-[100px] mb-[60px] ">
              <div class="w-full md:w-[48%]">
                <Image
                  src={aboutDishes}
                  className="2xl:w-full h-auto rounded-[15px] aboutusimg"
                />
                <p class="2xl:w-[704px] xl:w-[420px] lg:w-[300px] sm:w-full w-full 2xl:mt-[40px] xl:mt-[20px] mt-[10px] aboutPara">
                  Each dish has a story that spans generations, rooted in
                  culture, tradition, and a love for distinct flavours, serving
                  people from all walks of life.
                </p>
              </div>
              <div class="w-full md:w-[48%] mt-8 md:mt-0">
                <Image
                  src={aboutChef}
                  className="2xl:w-full h-auto rounded-[15px] aboutusimg"
                />
                <p class="2xl:w-[704px] xl:w-[490px] lg:w-[380px] sm:w-full w-full 2xl:mt-[40px] xl:mt-[20px] mt-[10px] aboutPara">
                  Our chef-community believe that everyone deserves homemade
                  cooked food, no matter where they are. When served, they
                  strive to bring feelings of comfort, joy and a sense of
                  adventure.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#FFE8E8] 2xl:h-[937px] flex justify-center  2xl:py-[115px] xl:py-[60px] sm:mt-12 py-[50px] xs:mt-12 md:mt-12">
            <div className="text-center 2xl:w-[1293px] xl:w-[870px] lg:w-[600px] sm:w-[] w-[]  mx-auto xs:mx-[10px]">
              <h1 className="aboutHead font-[400] text-[45px]">Diversity, Equity and Inclusion</h1>
              <p className="aboutPara 2xl:mt-[50px] xl:mt-[30px] mt-[15px]">
                As a community-first company, we support chefs from diverse
                communities across the UK, by connecting their dishes and
                passion for food with customers looking to experience homemade
                dishes.
              </p>
              <p className="aboutPara 2xl:mt-[30px]  xl:mt-[15px] mt-[8px] 2xl:w-[1063px] xl:w-[670px] lg:w-[520px] sm:w-[] w-[] mx-auto">
                Diversity, Equity and Inclusion is at the heart of everything we
                do from onboarding and supporting our chefs, working with local
                community businesses and associations across the UK through to
                working with partners and suppliers who uphold similar values.
              </p>
              <p className="aboutPara 2xl:mt-[50px] xl:mt-[30px] mt-[15px]">
              Learn more about joining us…  
              </p>
              <button className="2xl:w-[240px] 2xl:h-[60px] bg-[#DB5353] text-[20px] text-white rounded-[5px]">
                Our Chef Community
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default AboutUs;
