import React from "react";
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
          <div className="2xl:w-[859px]  xl:text-[50px] lg:text-[60px] lg:w-[] sm:w-[] w-[] text-center mx-auto 2xl:pt-[90px] xl:pt pt-[70px]">
            <h1 className="globalhead lg:text-[30px] 2xl:text-[55px] xl:text-[40px]">
              Homemade. Authentic Flavours, 
              <br></br>
              Expertly Delivered.
            </h1>
          </div>
          <div className="2xl:mt-[40px] xl:mt-[25px] mt-[10px]">
            <Image
              src={poster}
              className="2xl:w-[1219px] 2xl:h-[604px] h-auto xl:w-[800px] lg:w-[700px] md:w-[600px] sm:w-[600px] xs:w-[90%] w-[] mx-auto rounded-[15px]"
            />
          </div>

          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] sm:w-full xs:w-full flex justify-between mx-auto 2xl:mb-[230px] xl:mb-[140px] mb-[90px] mnavbar">
            <div className="w-full">
              <div className="text-center mt-[120px] xl:mt-[80px] lg:mt-[80px] md:mt-[80px] sm:mt-[50px]">
                <h4 className="globalhead">Popular Cuisines</h4>
                <div className="flex justify-center mt-[60px] xl:mt-[80px] lg:mt-[50px] md:mt-[40px] sm:mt-[30px] xs:flex-col xs:items-center">
                  <div className="lg:w-[320px] 2xl:w-[500px] md:w-[230px] sm:w-[20%] xs:w-full my-3 md:my-0">
                    <div className="text-center border-e-[2px] 2xl:w-[400px] xl:pr-[0px] pr-[0px]">
                      <h4 className="global_h">Asian Cuisine</h4>
                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Chinese Cuisine
                      </p>
                      <p className="globaltext">Thai Cuisine</p>
                      <p className="globaltext">Korean Cuisine</p>
                      <p className="globaltext">Japanese Cuisine</p>
                    </div>
                  </div>
                  <div className="lg:w-[320px] 2xl:w-[500px] md:w-[230px] sm:w-[20%] xs:w-full my-3 md:my-0">
                    <div className="text-center border-e-[2px] 2xl:w-[400px] xl:px-[0px] px-[0px]">
                      <h4 className="global_h">European Cuisine</h4>
                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Italian Cuisine
                      </p>
                      <p className="globaltext">British Cuisine</p>
                      <p className="globaltext">Scandinavian Cuisine</p>
                      <p className="globaltext">Greek Cuisine</p>
                    </div>
                  </div>
                  <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[20%] xs:w-full my-3 md:my-0">
                    <div className="text-center border-e-[2px] 2xl:w-[400px] xl:px-[0px] px-[0px] ">
                      <h4 className="global_h">South-East Asian Cuisine</h4>
                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Indian Cuisine
                      </p>
                      <p className="globaltext">Indonesian Cuisine</p>
                      <p className="globaltext">Malaysian Cuisine</p>
                      <p className="globaltext">Sri Lankan Cuisine </p>
                    </div>
                  </div>
                  <div class="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[20%] xs:w-full my-3 md:my-0">
                    <div class="text-center 2xl:w-[400px] xl:pl-[0px] pl-[0px]">
                      <h4 class="global_h">Middle Eastern Cuisine</h4>
                      <p class="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Lebanese Cuisine
                      </p>
                      <p class="globaltext">Turkish Cuisine</p>
                      <p class="globaltext">Iranian Cuisine</p>
                      <p class="globaltext">Egyptian Cuisine</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-[120px] xl:mt-[80px] lg:mt-[80px] md:mt-[80px] sm:mt-[50px]">
                <h4 className="globalhead">Popular Cuisines</h4>
                <div className="flex justify-center mt-[60px] xl:mt-[80px] lg:mt-[50px] md:mt-[40px] sm:mt-[30px]  xs:flex-col xs:items-center">
                  <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[20%] xs:w-full my-3 md:my-0">
                    <div className="text-center border-e-[2px] 2xl:w-[400px] xl:pr-[0px] pr-[0px]">
                      <h4 className="global_h">Best Family Dishes</h4>
                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Nasi Goreng
                      </p>
                      <p className="globaltext">Spiced Pork Cubes </p>
                      <p className="globaltext">Dum Aloo </p>
                    </div>
                  </div>
                  <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[20%] xs:w-full my-3 md:my-0">
                    <div className="text-center border-e-[2px] 2xl:w-[400px] xl:px-[0px] px-[0px]">
                      <h4 className="global_h">Most Popular</h4>
                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Dhaba Style Chicken
                      </p>
                      <p className="globaltext">Pad Thai </p>
                      <p className="globaltext"> Ramen Noodles</p>
                    </div>
                  </div>
                  <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[20%] xs:w-full my-3 md:my-0">
                    <div className="text-center border-e-[2px] 2xl:w-[400px] xl:px-[0px] px-[0px] ">
                      <h4 className="global_h"> Top Healthy Dishes</h4>
                      <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                        Lentil Shepards Pie
                      </p>
                      <p className="globaltext"> Vegan Bolognese</p>
                      <p className="globaltext"> HK Chicken Salad</p>
                    </div>
                  </div>
                  <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[20%] xs:w-full my-3 md:my-0">
                    <div className="text-center 2xl:w-[400px] xl:pl-[0px] pl-[0px] ">
                      <h4 className="global_h"> Top Sharing Dishes</h4>
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
