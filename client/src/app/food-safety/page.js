import React from "react";
import Image from "next/image";
import Link from "next/link";
import eightPoster from "../assets/food-safety.png";
import Footer from "../footer";
import Techniques from "./assets/cook-Techniques.svg";
import Ingredients from "./assets/Ingredients.svg";
import expertise from "./assets/expertise.svg";
import hygiene from "./assets/hygiene.svg";
import Navbar from "../navbar";

const FoodSefty = () => {
  return (
    <>
      <section>
        <Navbar />

        <div className="flex justify-center 2xl:pt-[110px] xl:pt-[80px] lg:pt-[50px] sm:pt-[45px] pt-12 border-b-[1px] border-[#B1B1B1]">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[800px] w-full flex items-center flex-col-reverse lg:flex-row mnavbar 2xl:py-[60px] xl:py-[40px] py-[40px]">
            <div className="mx-4 sm:w-1/2 sm:mx-auto lg:mx-0">
              <h1 className="alata capitalize font-[400] 2xl:text-[45px] 2xl:leading-[55px] 2xl:w-[695px] xl:text-[30px] xl:leading-[35px] xl:w-[450px] lg:text-[22px] lg:leading-[30px] lg:w-[340px] sm:text-[16px] text:[12px] sm:leading-[24px]">
              The <span className="text-[#F38181]">Safety</span> And <span className="text-[#F38181]">Well-Being</span> Of Our Chef Community And Customers Are Our Top Priority
              </h1>
              <p className="alata font-[400] 2xl:text-[25px] 2xl:leading-[37px] 2xl:w-[695px] xl:text-[16px] xl:leading-[28px] xl:w-[450px] lg:text-[12px] lg:leading-[18px] lg:w-[340px] sm:text-[14px] sm:leading-[22px] text-[10px] 2xl:mt-[25px] xl:mt-[15px] mt-[10px]">
              We understand the importance of maintaining the highest standards of food safety and hygiene, and our chefs are dedicated to upholding these principles in every dish they prepare.
              </p>
            </div>
            <div className="mx-4 sm:w-1/2 flex justify-end sm:mx-auto my-5 lg:my-0 lg:flex-none">
              <Image
                alt="image"
                src={eightPoster}
                className="2xl:w-[724px] 2xl:h-[507px] w-full h-auto  rounded-[15px] meightPoster"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#F7BFA5] 2xl:py-[50px] xl:py-[35px] sm:py-[30px] py-[20px]">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[750px] w-full mx-auto mnavbar">
            <div>
              <h2 className="alata font-[400] mx-auto 2xl:text-[25px] 2xl:leading-[37px] xl:text-[16px] xl:leading-[30px] sm:text-[16px] text-[12px] sm:leading-[24px] 2xl:w-[831px] xl:w-[550px] w-full text-center">
                Each of our community chefs meet our thorough onboarding
                criteria in <br />
                order to sell their dishes on authentichef.
              </h2>
            </div>
            <div className="2xl:mt-[65px] xl:mt-[40px] mt-[20px] flex md:flex-wrap xs:flex-wrap sm:flex-wrap 2xl:flex-nowrap flex-row justify-between 2xl:w-[100%] xl:w-[1100px] lg:w-[850px] md:w-[100%] sm:w-[95%] w-[90%] mx-auto">
              {/* First item */}
              <div className="2xl:w-[364px] xl:w-[270px] lg:w-[180px] md:w-[150px] my-3 md:my-0 w-[45%]   ">
                <Image
                  src={hygiene}
                  className="2xl:w-[62px] 2xl:h-[62px] xl:w-[45px] xl:h-[45px] w-[30px] h-[30px] mfoodseftyimg"
                />
                <h4 className="become-no 2xl:mt-[25px] xl:mt-[12px] mt-[8px]">
                  Food Hygiene Rating:
                </h4>
                <p className="xs:text-[10px] sm:text-[10px] md:text-[10px] lg:text-[10px] font-[500] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px]  2xl:mt-[15px] xl:mt-[10px] mt-[5px] 2xl:w-[325px] xl:w-[220px] w-full">
                  Approved by their local council and strive for the highest
                  food rating score of 5 stars
                </p>
              </div>
              {/* Second item */}
              <div className="2xl:w-[364px] xl:w-[270px] lg:w-[180px] md:w-[150px] my-3 md:my-0 w-[45%]  ">
                <Image
                  src={expertise}
                  className="2xl:w-[62px] 2xl:h-[62px] xl:w-[45px] xl:h-[45px] w-[30px] h-[30px] mfoodseftyimg"
                />
                <h4 className="become-no 2xl:mt-[25px] xl:mt-[12px] mt-[8px]">
                  Certified Expertise:
                </h4>
                <p className="xs:text-[10px] sm:text-[10px] md:text-[10px] lg:text-[10px] font-[500] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px]  2xl:mt-[15px] xl:mt-[10px] mt-[5px] 2xl:w-[325px] xl:w-[205px] w-full ">
                  Each chef holds a minimum level 2 food safety and hygiene
                  certification
                </p>
              </div>
              {/* Third item */}
              <div className="2xl:w-[364px] xl:w-[270px] lg:w-[180px] md:w-[150px] my-3 md:my-0 w-[45%]  ">
                <Image
                  src={Ingredients}
                  className="2xl:w-[62px] 2xl:h-[62px] xl:w-[45px] xl:h-[45px] w-[30px] h-[30px] mfoodseftyimg"
                />
                <h4 className="become-no 2xl:mt-[20px]  xl:mt-[12px] mt-[8px]">
                  Quality Ingredients:
                </h4>
                <p class="xs:text-[10px] sm:text-[10px] md:text-[10px] lg:text-[10px] font-[500] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px] 2xl:w-[325px] xl:w-[220px] w-full mt-[5px]">
                  We believe that the foundation of a great dish lies in the
                  quality of its ingredients. Thats why our chefs select the
                  finest specialty ingredients available, locking in flavor
                </p>
              </div>
              {/* Fourth item */}
              <div className="2xl:w-[364px] xl:w-[270px] lg:w-[180px] md:w-[150px] my-3 md:my-0 w-[45%]  ">
                <Image
                  src={Techniques}
                  className="2xl:w-[62px] 2xl:h-[62px] xl:w-[45px] xl:h-[45px] w-[30px] h-[30px] mfoodseftyimg"
                />
                <h4 className="become-no 2xl:mt-[25px] xl:mt-[12px] mt-[8px]">
                  Traditional Cooking Techniques:
                </h4>
                <p className="xs:text-[10px] sm:text-[10px]  md:text-[10px] lg:text-[10px] font-[500] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px] 2xl:mt-[15px] xl:mt-[10px] mt-[5px] 2xl:w-[325px] xl:w-[220px] w-full">
                  While we embrace innovation and creativity in our dishes, our
                  chefs hold true to their traditional cooking techniques to
                  provide an authentic experience
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[80%] w-full flex items-center mx-auto flex-col-reverse lg:flex-row mnavbar 2xl:py-[50px] xl:py-[35px] sm:py-[30px] py-[20px]">
          <h4 className="alata font-[400] mx-auto 2xl:text-[25px] 2xl:leading-[37px] xl:text-[16px] xl:leading-[30px] sm:text-[14px] text-[10px] sm:leading-[22px] 2xl:w-[831px] xl:w-[550px] w-full text-center">
            We value your feedback and would love to hear about your experience.
            <br />
            Please reach out to us{" "}
            <a
              className="underline"
              href="mailto:support@authentichef.com"
              target="_blank"
            >
              support@authentichef.com
            </a>
          </h4>
        </div>

        <Footer />
      </section>
    </>
  );
};

export default FoodSefty;
