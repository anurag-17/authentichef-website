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

        <div className="flex justify-center xl:pt-28 lg:pt-14 md:pt-8 pt-5 border-b-[1px] border-[#B1B1B1]">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] w-full flex items-center flex-col-reverse lg:flex-row mnavbar 2xl:py-[135px] xl:py-[80px] py-[40px]">
            <div className="mx-4 sm:w-1/2 sm:mx-auto lg:mx-0">
              <h1 className="alata font-[400] 2xl:text-[45px] 2xl:leading-[55px] 2xl:w-[695px] xl:text-[30px] xl:leading-[35px] xl:w-[450px] lg:text-[22px] lg:leading-[30px] lg:w-[340px] text-[16px] leading-[24px]">
                The safety and well-being of our chef community and customers
                are our top priority
              </h1>
              <p className="alata font-[400] 2xl:text-[25px] 2xl:leading-[37px] 2xl:w-[695px] xl:text-[16px] xl:leading-[28px] xl:w-[450px] lg:text-[12px] lg:leading-[18px] lg:w-[340px] text-[14px] leading-[22px] 2xl:mt-[25px] xl:mt-[15px] mt-[10px]">
                We understand the importance of maintaining the highest
                standards of food safety and hygiene, and our chef community are
                dedicated to upholding these principles in every dish they
                prepare.
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

        <div className="bg-[#F7BFA5] 2xl:py-[120px] xl:py-[80px] py-[50px]">
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] w-full mx-auto mnavbar">
            <div>
              <h2 className="alata font-[400] mx-auto 2xl:text-[25px] 2xl:leading-[37px] xl:text-[16px] xl:leading-[30px] text-[16px] leading-[24px] 2xl:w-[831px] xl:w-[550px] w-full text-center">
                Each of our community chefs meet our thorough onboarding
                criteria in order to sell their dishes on authentichef.
              </h2>
            </div>
            <div className="2xl:mt-[65px] xl:mt-[40px] mt-[20px] flex flex-col sm:flex-row justify-between">
              {/* First item */}
              <div className="2xl:w-[364px] xl:w-[250px] w-full sm:w-1/2 px-4  ">
                <Image
                  src={hygiene}
                  className="2xl:w-[62px] 2xl:h-[62px] xl:w-[45px] xl:h-[45px] w-[30px] h-[30px] mfoodseftyimg"
                />
                <h4 className="become-no 2xl:mt-[25px] xl:mt-[12px] mt-[8px]">
                  Food Hygiene Rating:
                </h4>
                <p className="xs:text-[10px] sm:text-[10px] md:text-[10px] lg:text-[10px] font-[500] xl:text-[14px] 2xl:text-[18px] 2xl:leading-[28px]  2xl:mt-[15px] xl:mt-[10px] mt-[5px] 2xl:w-[325px] xl:w-[210px] w-full">
                  Approved by their local council and strive for the highest
                  food rating score of 5 stars
                </p>
              </div>
              {/* Second item */}
              <div className="2xl:w-[364px] xl:w-[250px] w-full sm:w-1/2 px-4 ">
                <Image
                  src={expertise}
                  className="2xl:w-[62px] 2xl:h-[62px] xl:w-[45px] xl:h-[45px] w-[30px] h-[30px] mfoodseftyimg"
                />
                <h4 className="become-no 2xl:mt-[25px] xl:mt-[12px] mt-[8px]">
                  Certified Expertise:
                </h4>
                <p className="xs:text-[10px] sm:text-[10px] md:text-[10px] lg:text-[10px] font-[500] xl:text-[14px] 2xl:text-[18px] 2xl:leading-[28px]  2xl:mt-[15px] xl:mt-[10px] mt-[5px] 2xl:w-[325px] xl:w-[205px] w-full ">
                  Each chef holds a minimum level 2 food safety and hygiene
                  certification
                </p>
              </div>
              {/* Third item */}
              <div className="2xl:w-[364px] xl:w-[250px] w-full sm:w-1/2 px-4 ">
                <Image
                  src={Ingredients}
                  className="2xl:w-[62px] 2xl:h-[62px] xl:w-[45px] xl:h-[45px] w-[30px] h-[30px] mfoodseftyimg"
                />
                <h4 className="become-no 2xl:mt-[20px]  xl:mt-[12px] mt-[8px]">
                  Quality Ingredients:
                </h4>
                <p class="xs:text-[10px] sm:text-[10px] md:text-[10px] lg:text-[10px] font-[500] xl:text-[14px] 2xl:text-[18px] 2xl:leading-[28px] 2xl:w-[325px] xl:w-[210px] w-full mt-[5px]">
                  We believe that the foundation of a great dish lies in the
                  quality of its ingredients. Thats why our chefs select the
                  finest specialty ingredients available, locking in flavor
                </p>
              </div>
              {/* Fourth item */}
              <div className="2xl:w-[364px] xl:w-[250px] w-full sm:w-1/2 px-4 ">
                <Image
                  src={Techniques}
                  className="2xl:w-[62px] 2xl:h-[62px] xl:w-[45px] xl:h-[45px] w-[30px] h-[30px] mfoodseftyimg"
                />
                <h4 className="become-no 2xl:mt-[25px] xl:mt-[12px] mt-[8px]">
                  Traditional Cooking Techniques:
                </h4>
                <p className="xs:text-[10px] sm:text-[10px]  md:text-[10px] lg:text-[10px] font-[500] xl:text-[14px] 2xl:text-[18px] 2xl:leading-[28px] 2xl:mt-[15px] xl:mt-[10px] mt-[5px] 2xl:w-[325px] xl:w-[210px] w-full">
                  While we embrace innovation and creativity in our dishes, our
                  chefs hold true to their traditional cooking techniques to
                  provide an authentic experience
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] w-full flex items-center mx-auto flex-col-reverse lg:flex-row mnavbar 2xl:py-[115px] xl:py-[80px] py-[50px]">
          <h4 className="alata font-[400] mx-auto 2xl:text-[25px] 2xl:leading-[37px] xl:text-[16px] xl:leading-[30px] text-[14px] leading-[22px] 2xl:w-[831px] xl:w-[550px] w-full text-center">
            We value your feedback and would love to hear about your experience.
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
