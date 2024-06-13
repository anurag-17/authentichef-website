import React from "react";
import Image from "next/image";
import Link from "next/link";
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

        <div className="2xl:pt-[116px] xl:pt pt-[40px] aboutusmain">
          <div className="aboutUsBanner lg:h-[100%] md:h-[50%]  sm:h-[40%] xs:h-[400px] h-auto md:block flex flex-col justify-center items-center">
            <div className="2xl:w-[905px] xl:w-[540px] lg:w-[390px] md:w-[400px] w-[300px] text-center mx-auto">
              <h1 className="faqhead capitalize text-white 2xl:pt-[165px] xs:px-[20px] sm:px-[30px] xl:pt-[110px] lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xs:pt-[30px] pb-[10px] aboutusmaintext">
                At authentichef, we see homemade meals as more than just food;
                They’re <span className="text-[#F38181]">Journey’s</span>
              </h1>
              <div className="2xl:w-[635px] xl:w-[460px] xs:px-[10px] w-full  sm:px-[30px] text-center mx-auto 2xl:mt-[30px] xl:mt-[15px] mt-[10px] xl:pt-[20px] pt-[10px]">
                <p className="become-head  text-white  2xl:pb-[300px] md:pb-[80px] pb-[20px] 2xl:w-[635px] xl:w-[85%] mx-auto">
                  A journey that takes us from the comforts of our childhood
                  memories to the excitement of exploring new flavors from
                  around the world.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFE8E8] flex items-center justify-center 2xl:py-[100px] xl:py-[70px]  lg:py-10 py-10 ">
            <div className="text-center 2xl:w-[1293px] xl:w-[870px] lg:w-[600px] sm:w-[] w-[]  mx-auto md:px-[35px] lg:px-0 px-[20px]">
              <h4 className=" nine_head">The Ever-Growing Problem</h4>
              <p className="aboutPara 2xl:mt-[50px] xl:mt-[30px] mt-[15px] 2xl:w-[1063px] xl:w-[670px] lg:w-[520px] mx-auto">
                We get it. <br /> Hectic daily life makes it difficult to cook
                healthy, delicious homemade meals. Catering to individual tastes
                and dietary needs just add to the pressure.
              </p>
              <p className="aboutPara 2xl:mt-[30px]  xl:mt-[15px] mt-[8px] 2xl:w-[1063px] xl:w-[670px] lg:w-[520px] sm:w-[] w-[] mx-auto">
                Busy schedules, hard-to-find ingredients, and time-consuming
                recipes often stand in the way. While, ordering takeout can be
                tempting, it often leads to feelings of guilt.
              </p>
              <p className="aboutPara 2xl:mt-[30px]  xl:mt-[15px] mt-[8px] 2xl:w-[1063px] xl:w-[670px] lg:w-[520px] sm:w-[] w-[] mx-auto">
                But spending hours in the kitchen and ordering unhealthy takeout
                isn’t the only option.
              </p>

              <h4 className="nine_head 2xl:mt-[90px] xl:mt-[45px] mt-[25px]">
                Our Purpose
              </h4>

              <p className="aboutPara 2xl:mt-[50px] xl:mt-[30px] mt-[15px] 2xl:w-[1103px] xl:w-[680px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                Our journey began with a simple yet profound mission: to deliver
                delicious, authentic homemade dishes from around the world 
                <span style={{ color: "#F38181" }}>
                  straight to your doorstep.
                </span>
              </p>
              <p className="aboutPara 2xl:mt-[30px]  xl:mt-[15px] mt-[8px]  2xl:w-[1103px] xl:w-[680px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                With a wide range of dishes catering to different dietary needs,
                there’s something for everyone.
              </p>
              <p className="aboutPara 2xl:mt-[30px]  xl:mt-[15px] mt-[8px]  2xl:w-[1103px] xl:w-[680px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                Sit back and enjoy a unique culinary experience without spending
                hours in the kitchen.
              </p>
              <p className="aboutPara 2xl:mt-[30px]  xl:mt-[15px] mt-[8px]  2xl:w-[1103px] xl:w-[680px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                Explore our menu, where each chef and dish tells a story of
                tradition, love, and care, fostering a deep connection with
                food.
              </p>
            </div>
          </div>

          <div className="2xl:py-[100px] xl:py-[70px]  lg:py-10 py-10">
            <h4 className="nine_head 2xl:mb-[50px] xl:mb-[30px] mb-[20px]">
              Ready. Set. Feast!
            </h4>
            <div className="custom_container  flex justify-between mnavbar md:relative  items-center md:px-0 px-[20px] md:flex-row flex-col">
              {/* Ensure the container is set to flex and justify-between */}

              <div>
                <div className="2xl:w-[1031px] xl:w-[680px] lg:w-[520px]">
                  <Image
                    src={aboutCheff}
                    className="2xl:w-[1031px] 2xl:h-[617px] xl:w-[100%] h-auto rounded-[15px] "
                  />
                </div>
              </div>
              {/* Overlay Div */}
              <div className="overDive ">
                <div className="2xl:mb-[30px] xl:mb-[15px] lg:gap-[] md:gap-[20px] flex md:flex-row flex-col md:text-start text-center md:items-normal items-center md:self-start box-sizing-border justify-between">
                  <div className="flex items-center md:flex-row flex-col box-sizing-border  ">
                    <div className="overImgDiv">
                      <div className="flex justify-center items-center w-full box-sizing-border">
                        <Image src={dummy} className="overImg" />
                      </div>
                    </div>
                    <div className="overHead">No Hassle</div>
                  </div>
                  <div className=" overTitle">No need to cook!</div>
                </div>
                <div className="2xl:mb-[30px] xl:mb-[15px] lg:gap-[] md:gap-[20px] flex md:flex-row flex-col md:text-start text-center md:items-normal items-center md:self-start box-sizing-border justify-between">
                  <div className="flex items-center md:flex-row flex-col box-sizing-border  ">
                    <div className="overImgDiv">
                      <div className="flex justify-center items-center w-full box-sizing-border">
                        <Image src={profile} className="overImg" />
                      </div>
                    </div>
                    <div className="overHead">Personalisation</div>
                  </div>
                  <div className="overTitle">
                    Mix and match your favourite dishes
                  </div>
                </div>
                <div className="2xl:mb-[30px] xl:mb-[15px] lg:gap-[] md:gap-[20px] flex md:flex-row flex-col md:text-start text-center md:items-normal items-center md:self-start box-sizing-border justify-between ">
                  <div className="flex items-center md:flex-row flex-col box-sizing-border  ">
                    <div className="overImgDiv">
                      <div className="flex items-center justify-center w-full box-sizing-border">
                        <Image src={hand2} className="overImg" />
                      </div>
                    </div>
                    <div className="overHead">Convenient</div>
                  </div>
                  <div className="overTitle">
                    Delivered directly to your door
                  </div>
                </div>
                <div className="2xl:mb-[30px] xl:mb-[15px] lg:gap-[] md:gap-[20px] flex md:flex-row flex-col md:text-start text-center md:items-normal items-center md:self-start box-sizing-border justify-between">
                  <div className="flex items-center md:flex-row flex-col box-sizing-border  ">
                    <div className="overImgDiv">
                      <div className="flex justify-center items-center w-full box-sizing-border">
                        <Image src={timer} className="overImg" />
                      </div>
                    </div>
                    <div className="overHead">Time Saving</div>
                  </div>
                  <div className="overTitle">
                    Enjoy homemade meals ready to heat in just 20 minutes
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="custom_container flex justify-between  mnavbar 2xl:pb-[100px] xl:pb-[70px]  lg:pb-10 pb-10">
            <div className="flex xs:mx-[10px] w-full gap-[15px] sm:flex-row flex-col md:justify-between gap-y-[20px] ">
              <div className="w-full md:w-[48%]">
                <Image
                  src={aboutDishes}
                  className="2xl:w-full h-auto rounded-[15px] aboutusimg"
                />
                <p className="2xl:w-[704px] xl:w-[420px] lg:w-[300px] sm:w-full w-full 2xl:mt-[40px] xl:mt-[20px] mt-[10px] aboutPara">
                  Each dish has a story that spans generations, rooted in
                  culture, tradition, and a love for distinct flavours, serving
                  people from all walks of life.
                </p>
              </div>
              <div className="w-full md:w-[48%]  md:mt-0">
                <Image
                  src={aboutChef}
                  className="2xl:w-full h-auto rounded-[15px] aboutusimg"
                />
                <p className="2xl:w-[704px] xl:w-[490px] lg:w-[380px] sm:w-full w-full 2xl:mt-[40px] xl:mt-[20px] mt-[10px] aboutPara">
                  Our chef-community believe that everyone deserves homemade
                  cooked food, no matter where they are. When served, they
                  strive to bring feelings of comfort, joy and a sense of
                  adventure.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFE8E8]  flex justify-center 2xl:py-[100px] xl:py-[70px]  lg:py-10 py-10  ">
            <div className="text-center 2xl:w-[1063px] xl:w-[670px] lg:w-[520px] sm:w-[] w-[] mx-auto md:px-0 px-[20px]">
              <h4 className="nine_head capitalize">
                <span>Diversity, Equity and Inclusion</span>
              </h4>
              <p className="aboutPara 2xl:mt-[50px] xl:mt-[30px] mt-[15px]">
                As a community-first company, we support chefs from diverse
                communities across the UK, by connecting their dishes and
                passion for food with customers looking to experience homemade
                dishes.
              </p>
              <p className="aboutPara 2xl:mt-[30px] xl:mt-[15px] mt-[8px] 2xl:w-[1063px] xl:w-[670px] lg:w-[520px] sm:w-[]  w-full mx-auto">
                <span style={{ color: "#F38181" }}>
                  Diversity, Equity and Inclusion
                </span>{" "}
                is at the heart of everything we do from onboarding and
                supporting our chefs, working with local community businesses
                and associations across the UK through to working with partners
                and suppliers who uphold similar values.
              </p>
              <p className="aboutPara 2xl:mt-[50px] xl:mt-[30px] mt-[15px]">
                Learn more about joining us…
              </p>
              <Link href="/become-chef">
                <button className="2xl:w-[260px] 2xl:text-[20px] 2xl:h-[60px] lg:w-[220px] lg:h-[60px] lg:text-[18px] md:w-[160px] md:text-[14px] md:h-[50px] sm:w-[160px] sm:text-[14px] sm:h-[50px] xs:w-[150px] xs:text-[13px] xs:h-[40px] xl:w-[180px] xl:h-[45px] xl:text-[14px] w-[200px] h-[60px] bg-[#DB5353] text-[18px] text-white rounded-[5px] mt-[20px] p-[10px] hover:bg-[#B83C3C] transition duration-300 ease-in-out">
                  Our Chef Community
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default AboutUs;
