import React from "react";
import Image from "next/image";
import banner1 from "./assets/chef-banner1.png";
import banner2 from "./assets/chef-banner2.png";
import banner3 from "./assets/chef-banner3.png";
import boss from "./assets/own-boss.svg";
import dishmenu from "./assets/dishes-menu.svg";
import cook from "./assets/cook.svg";
import Footer from "../footer";
import Navbar from "../navbar";

const BecomeChef = () => {
  return (
    <>
      <section>
        <div>
          <Navbar className="" />

          <div className="sm:text-[20px] flex justify-center">
            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] sm:w-full flex justify-between mx-auto 2xl:pt-[230px] xl:pt-[140px] pt-[90px] mnavbar">
              <div className="mx-auto text-center xs:w-full">
                <h1 className="alata font-[400] 2xl:text-[75px] 2xl:leading-[85px] xl:text-[45px] xl:leading-[55px] text-[30px] leading-[40px] text-center 2xl:mb-[30px] xl:mb-[20px] mb-[10px] xs:text-center">
                  Our Chef Community
                </h1>
                <div className="2xl:w-[1098px] xl:w-[700px] w-[510px] text-center overflow-hidden xs:text-center xs:w-full">
                  <p className="alata font-[400] 2xl:text-[25px] 2xl:leading-[50px] xl:text-[16px] xl:leading-[30px] text-[12px] leading-[18px]">
                    Our diverse chef-community is at the heart of the food we
                    serve.
                  </p>
                  <p className="alata font-[400] 2xl:text-[25px] 2xl:leading-[35px] xl:text-[16px] xl:leading-[22px] text-[12px] leading-[16px] 2xl:mt-[15px] xl:mt-[5px] mt-[3px]">
                    We help new and established chefs to start and grow their
                    food business and showcase their passion for creating
                    culinary experiences.
                  </p>
                </div>
                <div className="flex flex-col justify-end 2xl:mt-[55px] xl:mt-[35px] mt-[25px]">
                  <button className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[240px] 2xl:h-[60px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[150px] w-[130px] xl:py-[12px] lg:py-[10px] lg:px-4 px-3 py-1 xs:w-[80%] xs:py-[12px] xs:mx-auto">
                    Join the Waiting List
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F5C7C7] w-full mt-7">
            <div className="max-w-[1440px] mx-auto bg-[#F5C7C7] px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between py-10 lg:py-20">
                <div className=" mb-5 lg:mb-0 lg:order-1">
                  <Image
                    src={banner1}
                    width={920}
                    height={507}
                    className=" rounded-[15px]"
                    alt="Banner Image"
                  />
                </div>
                <div className="w-full lg:w-1/3 lg:order-2 lg:ml-12 flex flex-col justify-center font-Alata alata ml-7">
                  <p className="text-[25px] lg:text-[25px] mb-4">
                    We believe that every chef has a story worth sharing and a
                    talent worth celebrating.
                  </p>
                  <p className="text-[25px] lg:text-[25px] mb-4 font-Alata">
                    By joining authentichef, you not only gain a platform to
                    showcase your unique culinary creations, but also become
                    part of a growing and vibrant community of like-minded
                    individuals passionate about food and culture.
                  </p>
                  <p className="text-[25px] lg:text-[25px] mb-4 font-Alata">
                    With our dedicated support, you can turn your love for
                    cooking into a growing food business, all while sharing your
                    delicious dishes with people across the UK.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-start ml-[120px]  gap-6 mt-10 mb-5">
                <div className="">
                  <Image
                    src={boss}
                    width={94}
                    height={94}
                    className=" mb-2 w-[45px] h-[45px] lg:w-[94px] lg:h-[94px]"
                    alt="Boss Image"
                  />
                  <h2 className="text-lg lg:text-xl mb-2 font-Alata alata">
                    Be your own boss
                  </h2>
                  <p className="text-sm lg:text-base font-Alata alata">
                    Grow your own food business with little to no start-up costs
                  </p>
                </div>
                <div className="">
                  <Image
                    src={dishmenu}
                    width={73}
                    height={94}
                    className=" mb-2 w-[45px] h-[45px] lg:w-[94px] lg:h-[94px]"
                    alt="Dish Menu Image"
                  />
                  <h2 className="text-lg lg:text-xl mb-2 font-Alata alata">
                    Create a menu of high quality dishes
                  </h2>
                  <p className="text-sm lg:text-base alata">
                    Embrace tradition, cultural value and authenticity in your
                    creations
                  </p>
                </div>
                <div className="mb-8">
                  <Image
                    src={cook}
                    width={94}
                    height={94}
                    className="mb-2 w-[45px] h-[45px] lg:w-[94px] lg:h-[94px] "
                    alt="Cook Image"
                  />
                  <h2 className="text-lg lg:text-xl mb-2 font-Alata alata">
                    Cook when you want and how often
                  </h2>
                  <p className="text-sm lg:text-base font-Alata alata">
                    You make the dishes available, we pick up and deliver them
                    nationwide, safely to your customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:text-[20px] sm:w-[300px] xs:w-[400px] md:w-[900px]">
            <div className="sm:w-[360px] 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] flex justify-between items-center mx-auto 2xl:mt-[90px] xl:mb-[80px] xl:mt-[80px] mt-[50px] mb-[50px] mnavbar">
              <div className="2xl:w-[842px] xl:w-[600px] w-[550px]">
                <h1 className="alata font-[400] 2xl:text-[55px] 2xl:leading-[75px] xl:text-[37px] xl:leading-[45px] lg:text-[29px] lg:leading-[35px] mcosider">
                  Are you considering starting your own food business from home?
                </h1>
                <p className=" alata font-[400] 2xl:text-[36px] 2xl:leading-[55px] xl:text-[23px] xl:leading-[35px] text-[19px] leading-[14px] 2xl:mt-[55px] xl:mt-[20px] mt-[15px] mservice">
                  Our Services to get you started and growing!
                </p>
                <div className="bg-[#FFE8E8] 2xl:w-[761px] xl:w-[510px] w-[400px] px-[20px] 2xl:py-[30px] xl:py-[20px] py-[17px] mt-[15px] xl:mt-[25px] mboxs">
                  <div className="flex 2xl:gap-[25px] xl:gap-[15px] gap-[10px]">
                    <div>
                      <h1 className="become-no">01</h1>
                    </div>
                    <div>
                      <h1 className="become-head">Registration Assistance</h1>
                      <p className="become-para 2xl:mt-[15px] xl:mt-[10px] mt-[5px]">
                        Well expertly guide you through the registration process
                        with your local council, ensuring a smooth start for
                        your food business.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFE8E8] 2xl:w-[761px] xl:w-[510px] w-[400px] px-[20px] 2xl:py-[30px] xl:py-[20px] py-[17px] mt-[15px] xl:mt-[25px] mboxs">
                  <div className="flex 2xl:gap-[25px] xl:gap-[15px] gap-[10px]">
                    <div>
                      <h1 className="become-no">02</h1>
                    </div>
                    <div>
                      <h1 className="become-head">
                        Food Safety and Hygiene Certification
                      </h1>
                      <p className="become-para 2xl:mt-[15px] xl:mt-[10px] mt-[5px]">
                        We’ll assist you to obtaining the necessary
                        certifications to comply with UK Food Safety and Hygiene
                        Laws. Our guidance will help you achieve the highest
                        food rating score, ensuring full compliance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFE8E8] 2xl:w-[761px] xl:w-[510px] w-[400px] px-[20px] 2xl:py-[30px] xl:py-[20px] py-[17px] mt-[15px] xl:mt-[25px] mboxs">
                  <div className="flex 2xl:gap-[25px] xl:gap-[15px] gap-[10px]">
                    <div>
                      <h1 className="become-no">03</h1>
                    </div>
                    <div>
                      <h1 className="become-head">Chef Onboarding Support</h1>
                      <p className="become-para 2xl:mt-[15px] xl:mt-[10px] mt-[5px]">
                        We’re here to support passionate chefs like you in
                        sharing your cultural heritage through your dishes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFE8E8] 2xl:w-[761px] xl:w-[510px] w-[400px] px-[20px] 2xl:py-[30px] xl:py-[20px] py-[17px] mt-[15px] xl:mt-[25px] mboxs">
                  <div className="flex 2xl:gap-[25px] xl:gap-[15px] gap-[10px]">
                    <div>
                      <h1 className="become-no">04</h1>
                    </div>
                    <div>
                      <h1 className="become-head">UK Nationwide Delivery</h1>
                      <p className="become-para 2xl:mt-[15px] xl:mt-[10px] mt-[5px]">
                        Leave the logistics to us! We’ll handle the delivery of
                        your dishes to customers all across the UK
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFE8E8] 2xl:w-[761px] xl:w-[510px] w-[400px] px-[20px] 2xl:py-[30px] xl:py-[20px] py-[17px] mt-[15px] xl:mt-[25px] mboxs">
                  <div className="flex 2xl:gap-[25px] xl:gap-[15px] gap-[10px]">
                    <div>
                      <h1 className="become-no">05</h1>
                    </div>
                    <div>
                      <h1 className="become-head">Ongoing Support</h1>
                      <p className="become-para 2xl:mt-[15px] xl:mt-[10px] mt-[5px]">
                        Our commitment doesn’t end with delivery. We provide
                        continuous sales and marketing promotion to fuel the
                        long-term growth of your business
                      </p>
                    </div>
                  </div>
                </div>
                {/* Other service cards go here */}
              </div>
              <div className=" 2xl:w-[711.95px] 2xl:h-[1296px]  xl:w-[470px] w-[400px] flex items-center mbanner2">
                <Image src={banner2} className="rounded-[15px]" />
              </div>
            </div>
          </div>

          <div className="flex items-center w-full">
            <div className="bg-[#FFE2E2] py-[50px] sm:py-[70px] w-full mthirdbox ">
              <div className="bg-[#FFE2E2] ">
                <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[900px] md:w-[750px] sm:w-[90%] xs:w-[95%] mx-auto mnavbar">
                  <h1 className="alata font-[400] 2xl:text-[55px] 2xl:leading-[75px] xl:text-[30px] xl:leading-[45px] lg:text-[28px] lg:leading-[38px] md:text-[24px] md:leading-[34px] sm:text-[22px] sm:leading-[30px] xs:text-[20px] xs:leading-[28px] text-center">
                    Ready to Get Started?
                  </h1>
                  <p className="alata font-[400] 2xl:text-[24px] 2xl:leading-[34px] xl:text-[18px] xl:leading-[24px] lg:text-[14px] lg:leading-[20px] md:text-[16px] md:leading-[24px] sm:text-[14px] sm:leading-[20px] xs:text-[12px] xs:leading-[18px] text-center mt-[25px] sm:mt-[10px]">
                    Contact us today to turn your passion for cooking into a
                    thriving business!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] flex flex-col sm:flex-row justify-between items-center mx-auto 2xl:mt-[175px] 2xl:mb-[180px] xl:mt-[100px] xl:mb-[80px] mt-[50px] mb-[50px] m3box xs:w-[400px] md:w-[900px]">
            <div className="2xl:w-[686px] sm:w-full">
              <Image
                src={banner3}
                className="rounded-[15px] mb-[20px] sm:mb-0 sm:rounded-[15px] sm:max-w-[686px] sm:h-[628px] xl:w-[465px] md:w-[380px] mbox3"
              />
            </div>
            <div className="2xl:w-[720px] xl:w-[485px] w-[350px] mbox3 sm:w-full">
              <h1 className="third_head">Join the Chef Waiting List</h1>
              <div className="flex flex-col sm:flex-row sm:gap-[15px] gap-[10px]">
                <div className="w-full mt-[15px] sm:mt-[10px]">
                  <input placeholder="First Name" className="profile_input" />
                </div>
                <div className="w-full mt-[15px] sm:mt-[10px]">
                  <input placeholder="Surname" className="profile_input" />
                </div>
              </div>
              <div className="w-full mt-[15px] sm:mt-[10px]">
                <input placeholder="Phone" className="profile_input" />
              </div>
              <div className="w-full mt-[15px] sm:mt-[10px]">
                <input placeholder="Email" className="profile_input" />
              </div>
              <div className="w-full mt-[15px] sm:mt-[10px]">
                <input placeholder="Post Code" className="profile_input" />
              </div>
              <div className="2xl:mt-[30px] xl:mt-[15px] mt-[10px]">
                <button className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[120px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[80px] xl:py-[8px] lg:py-[6px] lg:px-4 px-3 py-1 hover:bg-[#7e2727]">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
};

export default BecomeChef;
