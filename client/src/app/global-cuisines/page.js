import React from "react";
import NavBar from "../navBar";
import Footer from "../footer";
import Image from "next/image";
import poster from "./assets/global-banner.png";
import Navbar from "../navbar";

const GlobalCusines = () => {
  return (
    <>
      <section>
        <Navbar />

        <div className="2xl:pt-[116px] xl:pt pt-[50px]">
          <div className="2xl:w-[859px] xl:w-[] lg:w-[] sm:w-[] w-[] text-center mx-auto 2xl:pt-[90px] xl:pt pt-[70px] ">
            <h1 className="globalhead">
              Homemade. Authentic Flavours, Expertly Delivered.
            </h1>
          </div>
          <div className="2xl:mt-[40px] xl:mt-[25px] mt-[10px]">
            <Image
              src={poster}
              className="2xl:w-[1219px] 2xl:h-[604px] h-auto xl:w-[] lg:w-[] sm:w-[] w-[] mx-auto rounded-[15px]"
            />
          </div>

          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px] flex justify-between mx-auto 2xl:mb-[230px] xl:mb-[140px] mb-[90px] mnavbar">
            <div className="w-full">
              <div className="text-center mt-[120px]">
                <h1 className="globalhead">Popular Cuisines</h1>
                <div className="flex justify-center mt-[60px]">
                  <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
                    <div className=" text-center border-e-[2px]  2xl:w-[400px] xl:pr-[0px] pr-[0px]">
                      <h1 className="global_h">Asian Cuisine</h1>

                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Chinese Cuisine
                      </p>

                      <p className="globaltext">Thai Cuisine</p>

                      <p className="globaltext">Korean Cuisine</p>

                      <p className="globaltext">Japanese Cuisine</p>
                    </div>
                  </div>
                  <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
                    <div className=" text-center border-e-[2px]  2xl:w-[400px] xl:px-[0px] px-[0px]">
                      <h1 className="global_h">European Cuisine</h1>

                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Italian Cuisine
                      </p>

                      <p className="globaltext">British Cuisine</p>

                      <p className="globaltext">Scandinavian Cuisine</p>

                      <p className="globaltext">Greek Cuisine</p>
                    </div>
                  </div>
                  <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
                    <div className=" text-center border-e-[2px]  2xl:w-[400px] xl:px-[0px] px-[0px] ">
                      <h1 className="global_h">South-East Asian Cuisine</h1>

                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Indian Cuisine
                      </p>

                      <p className="globaltext">Indonesian Cuisine</p>

                      <p className="globaltext">Malaysian Cuisine</p>

                      <p className="globaltext">Sri Lankan Cuisine </p>
                    </div>
                  </div>
                  <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
                    <div className=" text-center 2xl:w-[400px] xl:pl-[0px] pl-[0px] ">
                      <h1 className="global_h">Middle Eastern Cuisine</h1>

                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Lebanese Cuisine
                      </p>

                      <p className="globaltext">Turkish Cuisine</p>

                      <p className="globaltext">Iranian Cuisine</p>

                      <p className="globaltext"> Egyptian Cuisine </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-[120px]">
                <h1 className="globalhead">Popular Cuisines</h1>
                <div className="flex justify-center mt-[60px]">
                  <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
                    <div className=" text-center border-e-[2px]  2xl:w-[400px] xl:pr-[0px] pr-[0px]">
                      <h1 className="global_h">Best Family Dishes</h1>

                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Nasi Goreng
                      </p>

                      <p className="globaltext">Spiced Pork Cubes </p>

                      <p className="globaltext">Dum Aloo </p>
                    </div>
                  </div>
                  <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
                    <div className=" text-center border-e-[2px]  2xl:w-[400px] xl:px-[0px] px-[0px]">
                      <h1 className="global_h">Most Popular</h1>

                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Dhaba Style Chicken
                      </p>

                      <p className="globaltext">Pad Thai </p>

                      <p className="globaltext"> Ramen Noodles</p>
                    </div>
                  </div>
                  <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
                    <div className=" text-center border-e-[2px]  2xl:w-[400px] xl:px-[0px] px-[0px] ">
                      <h1 className="global_h"> Top Healthy Dishes</h1>

                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Lentil Shepard’s Pie
                      </p>

                      <p className="globaltext"> Vegan Bolognese</p>

                      <p className="globaltext"> HK Chicken Salad</p>
                    </div>
                  </div>
                  <div className="lg:w-auto md:w-[230px] sm:w-1/2 w-full my-3 md:my-0">
                    <div className=" text-center 2xl:w-[400px] xl:pl-[0px] pl-[0px] ">
                      <h1 className="global_h"> Top Sharing Dishes</h1>

                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Panchranti Dal
                      </p>

                      <p className="globaltext"> Chicken Biryani</p>

                      <p className="globaltext"> Aloo Gobi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default GlobalCusines;
