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
            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] sm:w-full  flex justify-between mx-auto 2xl:pt-[230px] xl:pt-[140px] pt-[90px] mnavbar">
              <div className="mx-auto text-center xs:w-full">
                <h1 className="alata font-[400] text-[#111111] 2xl:text-[75px] 2xl:leading-[85px] xl:text-[45px] xl:leading-[55px] text-[30px] leading-[40px] text-center 2xl:mb-[30px] xl:mb-[20px] mb-[10px] xs:text-center">
                  Our Chef Community
                </h1>
                <div className="2xl:w-[1098px] text-[#111111] xl:w-[700px] w-[510px] text-center overflow-hidden xs:text-center  xs:w-[400px]">
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

          <div className="bg-[#f7bda6] w-full 2xl:mt-[9rem] xl:mt-[6rem] xs:mt-[30px] sm:mt-[30px] lg:mt-[4rem] md:mt-[4rem]">
            <div className="max-w-[1630px] xs:w-[467px]  2xl:w-[1600px] xl:w-[1150px] lg:w-[886px] md:w-[693px] sm:w-[646px] mx-auto bg-[#f7bda6]   px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between py-10 lg:py-20">
                <div className=" mb-5 lg:mb-0 lg:order-1">
                  <Image
                    src={banner1}
                    width={920}
                    height={507}
                    className=" rounded-[15px] 2xl:h-[83%] xs:w-auto  2xl:w-[928px]   xl:w-[663px]"
                    alt="Banner Image"
                  />
                </div>
                <div className="w-full lg:w-[57%] xl:w-[32%] 2xl:w-[33%] lg:order-2 lg:ml-12 flex flex-col justify-center  font-Alata alata ml-7">
                  <p className="2xl:text-[25px] alata text-[#111111] xl:text-[18px] md:text-[14px] alata lg:text-[14px] mb-4">
                    We believe that every chef has a story worth sharing and a
                    talent worth celebrating.
                  </p>
                  <p className="2xl:text-[25px] md:text-[14px] alata text-[#111111] xl:text-[18px] alata lg:text-[14px] mb-4 font-Alata">
                    By joining authentichef, you not only gain a platform to
                    showcase your unique culinary creations, but also become
                    part of a growing and vibrant community of like-minded
                    individuals passionate about food and culture.
                  </p>
                  <p className="2xl:text-[25px]  md:text-[14px] alata text-[#111111] xl:text-[18px] lg:text-[14px] mb-4 font-Alata">
                    With our dedicated support, you can turn your love for
                    cooking into a growing food business, all while sharing your
                    delicious dishes with people across the UK.
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:ml-auto xs:mt-[0.5rem]   md:ml-auto sm:ml-auto sm:w-[618px] xs:ml-auto   md:w-[766px] md:flex-col lg:flex-row  sm:flex-col 2xl:flex-row xl:flex-row  2xl:w-[1515px]  xl:w-[1198px] lg:w-[912px] xl:ml-[14px] justify-start ml-[120px] md:pb-[3.5rem]   md:mt-[0.5rem]  gap-6 mt-10 mb-5">
                <div className="">
                  <Image
                    src={boss}
                    width={94}
                    height={94}
                    className=" mb-2 w-[45px] h-[45px] lg:w-[80px] lg:h-[80px] "
                    alt="Boss Image"
                  />
                  <h2 className="text-lg 2xl:text-[25px] text-[#111111] lg:text-xl mb-2 mt-[20px] md:mt-[8px] sm:mt-[8px] font-Alata alata">
                    Be your own boss
                  </h2>
                  <p className="text-sm lg:text-[14px] text-[#111111] 2xl:text-[18px] mt-[20px] md:mt-[8px] sm:mt-[8px] font-Alata alata">
                    Grow your own food business with little to no start-up costs
                  </p>
                </div>
                <div className="2xl:pl-[50px] 2xl:w-[40 %] xl:w-[36%] xl:pl-[20px]">
                  <Image
                    src={dishmenu}
                    width={73}
                    height={94}
                    className=" mb-2 w-[45px] h-[45px]  lg:w-[80px] lg:h-[80px]"
                    alt="Dish Menu Image"
                  />
                  <h2 className="text-lg lg:text-xl text-[#111111] 2xl:text-[25px] mb-2 mt-[20px] md:mt-[8px] sm:mt-[8px] font-Alata alata">
                    Create a menu of high quality dishes
                  </h2>
                  <p className="text-sm lg:text-[14px] 2xl:text-[18px] text-[#111111] mt-[20px] md:mt-[8px] sm:mt-[8px] alata">
                    Embrace tradition, cultural value and authenticity in your
                    creations
                  </p>
                </div>
                <div className="mb-8 2xl:pl-[83px] 2xl:w-[45%] xl:w-[40%] lg:w-[41%]">
                  <Image
                    src={cook}
                    width={94}
                    height={94}
                    className="mb-2 w-[45px] h-[45px] lg:w-[80px] lg:h-[80px] "
                    alt="Cook Image"
                  />
                  <h2 className="text-lg lg:text-xl 2xl:text-[25px] text-[#111111] mb-2 mt-[20px] md:mt-[8px] sm:mt-[8px] font-Alata alata">
                    Cook when you want and how often
                  </h2>
                  <p className="text-sm lg:text-[14px] 2xl:text-[18px] mt-[20px] text-[#111111] md:mt-[8px] sm:mt-[8px] font-Alata alata">
                    You make the dishes available, we pick up and deliver them
                    nationwide, safely to your customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="sm:text-[20px] sm:w-[300px]  xs:w-[400px] xs:ml-[20px] 2xl:ml-[-50px] xl:ml-[68px] lg:w-[990px] md:w-[640 px] xl:w-[900px] xs:w-auto ">
              <div className="flex flex-col md:flex-row justify-between items-center mx-auto sm:w-[360px] 2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] mt-[50px] mb-[50px] xl:mt-[80px] xl:mb-[80px] 2xl:mt-[90px]">
                <div className="2xl:w-[842px] md:w-[60%] lg:mr-[16px] xl:w-[600px] w-full  sm:md-auto">
                  <h2 className="font-alata font-[400] text-[#111111] 2xl:text-[54px] 2xl:leading-[75px] md:text-[16px] xl:text-[35px] md:leading-[18px]  xl:leading-[45px] lg:text-[29px] lg:leading-[35px] text-[24px] leading-[30px] mcosider">
                    Are you considering starting your own food business from
                    home?
                  </h2>
                  <p className="font-alata font-[400] text-[#111111] md:text-[14px] 2xl:text-[36px] 2xl:leading-[55px] xl:text-[23px] xl:leading-[35px] text-[19px] leading-[24px] 2xl:mt-[55px] xl:mt-[5px] md:mt-[0px] mt-[15px] mservice">
                    Our Services to get you started and growing!  
                  </p>

                  <div className="mt-[15px] 2xl:mt-[25px] xl:mt-[15px] md:mt-[5px] ">
                    <div className="bg-[#FFE8E8] 2xl:w-[761px] xl:w-[510px] w-full px-[20px] 2xl:py-[30px] xl:py-[20px] md:py-[5px] py-[17px] mb-[15px]">
                      <div className="flex gap-[10px] xl:gap-[15px] 2xl:gap-[25px]">
                        <div>
                          <h2 className="become-no">01</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">
                            Registration Assistance
                          </h2>
                          <p className="become-para mt-[5px] text-[#111111] xl:mt-[10px] 2xl:mt-[15px]">
                            We expertly guide you through the registration
                            process with your local council, ensuring a smooth
                            start for your food business.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFE8E8] 2xl:w-[761px] xl:w-[510px] w-full px-[20px] 2xl:py-[30px] xl:py-[20px] py-[17px] mb-[15px]">
                      <div className="flex gap-[10px] xl:gap-[15px] 2xl:gap-[25px]">
                        <div>
                          <h2 className="become-no">02</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">
                            Food Safety and Hygiene Certification
                          </h2>
                          <p className="become-para mt-[5px] xl:mt-[10px] text-[#111111] 2xl:mt-[15px]">
                            We’ll assist you to obtaining the necessary
                            certifications to comply with UK Food Safety and
                            Hygiene Laws. Our guidance will help you achieve the
                            highest food rating score, ensuring full compliance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFE8E8] 2xl:w-[761px]  xl:w-[510px] w-full px-[20px] 2xl:py-[30px] xl:py-[20px] py-[17px] mb-[15px]">
                      <div className="flex gap-[10px] xl:gap-[15px] 2xl:gap-[25px]">
                        <div>
                          <h2 className="become-no">03</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">
                            Chef Onboarding Support
                          </h2>
                          <p className="become-para mt-[5px] xl:mt-[10px] text-[#111111] 2xl:mt-[15px]">
                            We’re here to support passionate chefs like you in
                            sharing your cultural heritage through your dishes.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFE8E8] 2xl:w-[761px] xl:w-[510px] w-full px-[20px] 2xl:py-[30px] xl:py-[20px] py-[17px] mb-[15px]">
                      <div className="flex gap-[10px] xl:gap-[15px] 2xl:gap-[25px]">
                        <div>
                          <h2 className="become-no">04</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">
                            UK Nationwide Delivery
                          </h2>
                          <p className="become-para mt-[5px] text-[#111111] xl:mt-[10px] 2xl:mt-[15px]">
                            Leave the logistics to us! We’ll handle the delivery
                            of your dishes to customers all across the UK.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFE8E8] 2xl:w-[761px] xl:w-[510px] w-full px-[20px] 2xl:py-[30px] xl:py-[20px] py-[17px] mb-[15px]">
                      <div className="flex gap-[10px] xl:gap-[15px] 2xl:gap-[25px]">
                        <div>
                          <h2 className="become-no">05</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">Ongoing Support</h2>
                          <p className="become-para mt-[5px] xl:mt-[10px] text-[#111111] 2xl:mt-[15px]">
                            Our commitment doesn’t end with delivery. We provide
                            continuous sales and marketing promotion to fuel the
                            long-term growth of your business.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="2xl:w-[711.95px] 2xl:h-[1296px] xl:w-[470px] w-full sm:w-[auto] xs:w-[auto] md:w-[400px] flex items-center md:ml-[60px] mb-[50px] md:mb-0">
                  <Image
                    src={banner2}
                    className="rounded-[15px] xs:h-[310px] w-full xl:max-w-[none]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full">
            <div className="bg-[#FFE2E2] py-[100px] 2xl:py-[100px] xl:py-[90px] lg:py-[60px] w-full mthirdbox ">
              <div className="bg-[#FFE2E2] ">
                <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[900px] md:w-[750px] sm:w-[90%] xs:w-[95%] mx-auto mnavbar">
                  <h2 className="alata font-[400] text-[#111111] 2xl:text-[55px] 2xl:leading-[75px] xl:text-[30px] xl:leading-[45px] lg:text-[28px] lg:leading-[38px] md:text-[24px] md:leading-[34px] sm:text-[22px] sm:leading-[30px] xs:text-[20px] xs:leading-[28px] text-center">
                    Ready to Get Started?
                  </h2>
                  <p className="alata font-[400] text-[#111111] 2xl:text-[24px] 2xl:leading-[34px] xl:text-[18px] xl:leading-[24px] lg:text-[14px] lg:leading-[20px] md:text-[16px] md:leading-[24px] sm:text-[14px] sm:leading-[20px] xs:text-[12px] xs:leading-[18px] text-center mt-[25px] sm:mt-[10px]">
                    Contact us today to turn your passion for cooking into a
                    thriving business!
                  </p>
                </div>  
              </div>
            </div>
          </div>

          <div className="2xl:w-[1600px] xl:w-[1100px] sm:w-[650px] lg:w-[850px]  flex flex-col sm:flex-row justify-between items-center mx-auto 2xl:mt-[175px] 2xl:mb-[180px] xl:mt-[100px] xl:mb-[80px] mt-[50px] mb-[50px] m3box xs:w-[400px] md:w-[760px]">
            <div className="">
              <Image
                src={banner3}
                className="rounded-[15px] 2xl:w-[686px] 2xl:h-[628px]  sm:w-[259px] xl:h-[428px] sm:h-[233px]  mb-[20px] sm:mb-0 sm:rounded-[15px] md:h-[300px]  sm:max-w-[686px]  lg:h-[313px]    xl:w-[465px] md:w-[380px] mbox3"
              />
            </div>
            <div className="2xl:w-[720px] 2xl:h-[460px] xl:w-[485px] lg:w-[420px] sm:w-auto xs:w-[100%]  md:w-auto mbox3">
              <h3 className="third_head text-[#111111]">Join the Chef Waiting List</h3>
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
