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

          <div className="text-center sm:text-[20px] 2xl:mt-[76px]">
            <div className="max-w-[1600px] mx-auto px-4 xl:pt-[140px] pt-[90px]">
              <h1 className="font-alata font-medium text-[#111111] text-4xl md:text-5xl lg:text-6xl xl:text-[45px] 2xl:text-[75px] leading-[1.3] md:leading-[1.2] xl:leading-[55px] 2xl:leading-[85px] mb-[10px]">
                Our Chef Community
              </h1>
              <div className="2xl:max-w-[1098px]  xl:max-w-[700px] lg:max-w-[600px] mx-auto text-[#111111] mb-[25px]">
                <p className="font-alata font-medium text-base md:text-lg lg:text-xl xl:text-[16px] 2xl:text-[25px] leading-[1.5] md:leading-[1.4] xl:leading-[30px] 2xl:leading-[50px] mb-[3px]">
                  Our diverse chef community is at the heart of the food we
                  serve.
                </p>
                <p className="font-alata font-medium text-base md:text-lg lg:text-xl xl:text-[16px] 2xl:text-[25px] leading-[1.5] md:leading-[1.4] xl:leading-[22px] 2xl:leading-[35px]">
                  We help new and established chefs start and grow their food
                  business and showcase their passion for creating culinary
                  experiences.
                </p>
              </div>
              <div className="flex justify-center">
                <button className="font-alata w-auto font-medium bg-[#DB5353] text-white rounded-[5px] w-[130px] xl:w-[230px] 2xl:w-[240px] py-1 xl:py-[12px] lg:py-[10px] px-3 lg:px-4 xs:w-[80%] xs:py-[12px] xs:mx-auto">
                  Join the Waiting List
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#f7bda6] w-full mt-8 lg:mt-16 xl:mt-24 2xl:mt-36 my-10">
            <div className="2xl:max-w-[1600px] xl:max-w-[1100px] lg:max-w-[850px] md:max-w-[800px] mx-auto px-4 pb-10 lg:pb-20 2xl:pb-36">
              <div className="flex flex-col lg:flex-row items-center justify-between py-10 lg:py-20">
                <div className="xl:w-[100%] 2xl:w-full lg:w-auto mb-5 lg:mb-0">
                  <Image
                    src={banner1}
                    width={920}
                    height={507}
                    className="rounded-[15px] w-full lg:w-[100%] 2xl:w-[928px]"
                    alt="Banner Image"
                  />
                </div>
                <div className="w-full lg:w-[57%] xl:w-[52%] 2xl:w-[40%] lg:ml-12 flex flex-col justify-center text-center lg:text-left lg:mx-0 mx-auto">
                  <p className="text-[#111111] alata mb-4 text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    We believe that every chef has a story worth sharing and a
                    talent worth celebrating.
                  </p>
                  <p className="text-[#111111] mb-4 alata text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    By joining authentichef, you not only gain a platform to
                    showcase your unique culinary creations, but also become
                    part of a growing and vibrant community of like-minded
                    individuals passionate about food and culture.
                  </p>
                  <p className="text-[#111111] mb-4 alata text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    With our dedicated support, you can turn your love for
                    cooking into a growing food business, all while sharing your
                    delicious dishes with people across the UK.
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-6 mt-10 md:mt-[-0.5rem] sm:mt-[-0.5rem] xs:mt-[-0.5rem] mb-5">
                <div className="flex-1 lg:flex-[2.2] xl:flex-[1.4] text-center lg:text-left">
                  <Image
                    src={boss}
                    width={94}
                    height={94}
                    className="mx-auto lg:mx-0 mb-2 w-[45px] h-[45px] lg:w-[80px] lg:h-[80px]"
                    alt="Boss Image"
                  />
                  <h2 className="text-lg alata lg:text-xl 2xl:text-2xl text-[#111111] mb-2 mt-2">
                    Be your own boss
                  </h2>
                  <p className="text-sm lg:text-base alata 2xl:text-lg text-[#111111] mt-2">
                    Grow your own food business with little to no start-up
                    costs.
                  </p>
                </div>
                <div className="flex-1 lg:flex-[3.2] xl:flex-[1.6] text-center lg:text-left">
                  <Image
                    src={dishmenu}
                    width={73}
                    height={94}
                    className="mx-auto lg:mx-0 mb-2 w-[45px] h-[45px] lg:w-[80px] lg:h-[80px]"
                    alt="Dish Menu Image"
                  />
                  <h2 className="text-lg lg:text-xl alata 2xl:text-2xl text-[#111111] mb-2 mt-2">
                    Create a menu of high-quality dishes
                  </h2>
                  <p className="text-sm lg:text-base alata 2xl:text-lg text-[#111111] mt-2">
                    Embrace tradition, cultural value, and authenticity in your
                    creations.
                  </p>
                </div>
                <div className="flex-1 lg:flex-[4.6] xl:flex-[1.8] text-center lg:text-left">
                  <Image
                    src={cook}
                    width={94}
                    height={94}
                    className="mx-auto lg:mx-0 mb-2 w-[45px] h-[45px] lg:w-[80px] lg:h-[80px]"
                    alt="Cook Image"
                  />
                  <h2 className="text-lg lg:text-xl alata 2xl:text-2xl text-[#111111] mb-2 mt-2">
                    Cook when you want and how often
                  </h2>
                  <p className="text-sm lg:text-base alata 2xl:text-lg text-[#111111] mt-2">
                    You make the dishes available, we pick up and deliver them
                    nationwide, safely to your customers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="2xl:max-w-[1600px] xl:max-w-[1100px] lg:max-w-[850px] md:max-w-[800px] mx-auto mt-12 xl:mt-20 2xl:mt-24">
              <div className="flex flex-col md:flex-row justify-between items-stretch mx-auto">
                <div className="w-full md:w-3/5 lg:mr-4 xl:w-2/3 flex flex-col justify-between">
                  <h2 className="font-alata text-[#111111] text-2xl leading-8 lg:text-3xl lg:leading-10 xl:text-4xl xl:leading-[45px] 2xl:text-[54px] 2xl:leading-[75px]">
                    Are you considering starting your own food business from
                    home?
                  </h2>
                  <p className="font-alata text-[#111111] mt-4 text-lg leading-6 lg:text-xl lg:leading-8 xl:text-2xl xl:leading-[35px] 2xl:text-[36px] 2xl:leading-[55px]">
                    Our Services to get you started and growing!
                  </p>

                  <div className="mt-6 space-y-6 xl:space-y-4 2xl:space-y-6">
                    <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                      <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                        <div>
                          <h2 className="become-no">01</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">
                            Registration Assistance
                          </h2>
                          <p className="become-para mt-2 xl:mt-2 2xl:mt-3 text-[#111111]">
                            We expertly guide you through the registration
                            process with your local council, ensuring a smooth
                            start for your food business.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                      <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                        <div>
                          <h2 className="become-no">02</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">
                            Food Safety and Hygiene Certification
                          </h2>
                          <p className="become-para mt-2 xl:mt-2 2xl:mt-3 text-[#111111]">
                            We’ll assist you in obtaining the necessary
                            certifications to comply with UK Food Safety and
                            Hygiene Laws. Our guidance will help you achieve the
                            highest food rating score, ensuring full compliance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                      <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                        <div>
                          <h2 className="become-no">03</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">
                            Chef Onboarding Support
                          </h2>
                          <p className="become-para mt-2 xl:mt-2 2xl:mt-3 text-[#111111]">
                            We’re here to support passionate chefs like you in
                            sharing your cultural heritage through your dishes.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                      <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                        <div>
                          <h2 className="become-no">04</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">
                            UK Nationwide Delivery
                          </h2>
                          <p className="become-para mt-2 xl:mt-2 2xl:mt-3 text-[#111111]">
                            Leave the logistics to us! We’ll handle the delivery
                            of your dishes to customers all across the UK.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFE8E8] px-5 py-4 xl:px-5 xl:py-4 2xl:px-6 2xl:py-6">
                      <div className="flex gap-4 xl:gap-6 2xl:gap-8">
                        <div>
                          <h2 className="become-no">05</h2>
                        </div>
                        <div>
                          <h2 className="become-head text-[#111111]">
                            Ongoing Support
                          </h2>
                          <p className="become-para mt-2 xl:mt-2 2xl:mt-3 text-[#111111]">
                            Our commitment doesn’t end with delivery. We provide
                            continuous sales and marketing promotion to fuel the
                            long-term growth of your business.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/5 xl:w-1/3 flex items-stretch mt-12 md:mt-0 md:ml-6">
                  <Image
                    src={banner2}
                    className="rounded-[15px] w-full object-cover"
                    alt="Banner Image"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full">
            <div className="bg-[#FFE2E2] py-24 lg:py-16 xl:py-20 w-full 2xl:mt-[100px] xl:mt-[80px] lg:mt-[60px] md:mt-[40px] xs:mt-[40px] sm:mt-[40px]">
              <div className="2xl:max-w-[1600px] xl:max-w-[1100px] lg:max-w-[850px] md:max-w-[800px] mx-auto text-center">
                <h2 className="font-alata font-medium text-[#111111] text-2xl leading-8 sm:text-3xl sm:leading-9 md:text-4xl md:leading-10 xl:text-5xl xl:leading-[45px] 2xl:text-[55px] 2xl:leading-[75px]">
                  Ready to Get Started?
                </h2>
                <p className="font-alata font-medium text-[#111111] mt-6 sm:mt-4 text-sm leading-5 sm:text-base sm:leading-6 md:text-lg md:leading-7 xl:text-xl xl:leading-8 2xl:text-2xl 2xl:leading-10">
                  Contact us today to turn your passion for cooking into a
                  thriving business!
                </p>
              </div>
            </div>
          </div>

          <div className="2xl:w-[1400px] xl:w-[1000px] lg:w-[850px] md:w-[800px] w-full mx-auto flex flex-col sm:flex-row justify-between items-center mt-12 xl:mt-20 2xl:mt-28 mb-12 xl:mb-20 2xl:mb-28 px-4 sm:px-0">
            <div className="2xl:w-[45%] xl:w-[45%] lg:w-[50%] sm:w-auto mb-8 sm:mb-0">
              <Image
                src={banner3}
                className="rounded-[15px] w-full max-w-[686px] h-auto sm:max-w-[465px] lg:max-w-[313px] xl:max-w-[428px] 2xl:max-w-[686px]"
                alt="Chef Banner"
              />
            </div>
            <div className="w-full sm:w-[44%] lg:w-[57%] xl:w-[] 2xl:w-[46%] max-w-[720px] md:ml-[20px]">
              <h3 className="font-alata text-[#111111] text-2xl sm:text-[24px] leading-8 text-center sm:text-left sm:text-3xl sm:leading-9 md:text-4xl md:leading-10 xl:text-5xl xl:leading-[45px] 2xl:text-[55px] 2xl:leading-[75px] mb-6">
                Join the Chef Waiting List
              </h3>
              <div className="flex flex-col gap-4 md:gap-[5px] xs:gap-[5px] ">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    placeholder="First Name"
                    className="profile_input w-full sm:w-1/2"
                  />
                  <input
                    placeholder="Surname"
                    className="profile_input w-full sm:w-1/2"
                  />
                </div>
                <input placeholder="Phone" className="profile_input w-full" />
                <input placeholder="Email" className="profile_input w-full" />
                <input
                  placeholder="Post Code"
                  className="profile_input w-full"
                />
                <button className="font-alata font-medium bg-[#DB5353] text-white rounded-[5px] w-full py-2 mt-4 hover:bg-[#7e2727]">
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
