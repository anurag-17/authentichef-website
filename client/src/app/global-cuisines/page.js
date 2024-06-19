import React from "react";
import Footer from "../footer";
import Image from "next/image";
import Navbar from "../navbar";
import couma from "./assets/couma.svg";

const GlobalCusines = () => {
  return (
    <>
      <section>
        <Navbar />

        <div className="">
          <div className="2xl:w-[859px]  xl:text-[50px] lg:text-[60px] lg:w-[] sm:w-[] w-[] text-center mx-auto 2xl:pt-[160px] xl:pt-[120px] md:pt-[90px] pt-[75px]">
            <h1 className="globalhead lg:text-[30px] 2xl:text-[55px] xl:text-[40px]">
              Homemade. Authentic Flavours,
              <br></br>
              Expertly Delivered.
            </h1>
          </div>
          <div className="global-bg flex justify-center 2xl:mt-[40px] xl:mt-[25px] mt-[10px] 2xl:w-[1219px] 2xl:h-[604px] xl:h-[360px] xl:w-[800px] lg:w-[700px] sm:w-[80%] h-[200px] xs:w-[90%] w-[] mx-auto rounded-[15px] relative">
            <div className=" bottom-0 2xl:w-[1057px] 2xl:h-[280px] xl:w-[700px] xl:h-[170px] w-[90%] lg:h-[160px] sm:h-[160px] h-[200px] bg-white flex items-center justify-center border mx-auto rounded-[15px]  2xl:py-[40px] 2xl:mt-[500px] xl:mt-[300px] lg:mt-[140px] md:mt-[140px] mt-[130px]">
              <div>
                <div className="text-center">
                  <p className="2xl:text-[18px] 2xl:leading-[28px] xl:text-[12px] xl:leading-[16px] text-[11px] leading-[16px] font-semibold mb-2">
                    {" "}
                    Homemade. Authentic Flavours. Expertly Delivered.
                  </p>
                </div>
                <div className="flex items-center px-[6%] lg:px-[12%] 2xl:px-0 ">
                  <div className="flex gap-3 items-start ">
                    <Image
                      src={couma}
                      className="align-top 2xl:w-[34px] 2xl:h-[34px] w-[25px] h-[25px]"
                    />
                    <div>
                      <p className="seven_p2 2xl:w-[734px] text-center">
                        No more takeout guilt! Authentichef delivers delicious,
                        homemade food from around the world. It is like having a
                        personal chef, with options for everyone. We love the
                        fresh flavours and restaurant quality, minus the cooking
                        time. Family dinners just got easier (and tastier!)
                      </p>
                      <p className="seven_p2 text-center 2xl:mt-[30px] xl:mt-[15px] mt-[10px]">
                        - Jordan Huff
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="custom_container flex justify-between mx-auto 2xl:mb-[80px] xl:mb-[50px] mb-[90px] mnavbar">
            <div className="custom_container">
              <div className="text-center mt-[160px] 2xl:mt-[250px] xl:mt-[160px] lg:mt-[140px] md:mt-[140px] sm:mt-[50px]">
                <h4 className="globalhead2">Popular Cuisines</h4>
                <div className="md:flex justify-center mt-[10px] xl:mt-[40px] lg:mt-[30px] md:mt-[30px] sm:mt-[30px]">
                  <div className=" flex w-full md:flex-none md:w-[49%] sm:w-[100%] ">
                    <div className="lg:w-[320px] 2xl:w-[500px] md:w-[230px] sm:w-[50%] xs:w-full my-3 md:my-0">
                      <div className="text-center border-e-[2px] 2xl:w-[400px] xl:px-[0px] px-[0px] mr-0">
                        <h4 className="global_h">Asian Cuisine</h4>
                        <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                          Chinese Cuisine
                        </p>
                        <p className="globaltext">Thai Cuisine</p>
                        <p className="globaltext">Korean Cuisine</p>
                        <p className="globaltext">Japanese Cuisine</p>
                      </div>
                    </div>
                    <div className="lg:w-[320px] 2xl:w-[500px] md:w-[230px] sm:w-[50%] xs:w-full my-3 md:my-0">
                      <div className="text-center md:border-e-[2px] 2xl:w-[400px] xl:px-[0px] px-[0px] mr-0">
                        <h4 className="global_h">European Cuisine</h4>
                        <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                          Italian Cuisine
                        </p>
                        <p className="globaltext">British Cuisine</p>
                        <p className="globaltext">Scandinavian Cuisine</p>
                        <p className="globaltext">Greek Cuisine</p>
                      </div>
                    </div>
                  </div>
                  <div className=" flex w-full md:flex-none md:w-[49%] sm:w-[100%] ">
                    <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[50%] xs:w-full my-3 md:my-0">
                      <div className="text-center border-e-[2px] 2xl:w-[400px] xl:px-[0px] px-[0px] mr-0">
                        <h4 className="global_h">South-East Asian Cuisine</h4>
                        <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                          Indian Cuisine
                        </p>
                        <p className="globaltext">Indonesian Cuisine</p>
                        <p className="globaltext">Malaysian Cuisine</p>
                        <p className="globaltext">Sri Lankan Cuisine </p>
                      </div>
                    </div>
                    <div class="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[50%] xs:w-full my-3 md:my-0">
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
              </div>
              <div className="text-center mt-[10px] xl:mt-[40px] lg:mt-[30px] md:mt-[30px] sm:mt-[50px]">
                <h4 className="globalhead2">Popular Dishes</h4>
                <div className="md:flex justify-center mt-[10px] xl:mt-[40px] lg:mt-[30px] md:mt-[30px] sm:mt-[30px]">
                  <div className=" flex w-full md:flex-none md:w-[49%] sm:w-[100%] ">
                    <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[50%] xs:w-full my-3 md:my-0">
                      <div className="text-center border-e-[2px] 2xl:w-[400px] xl:pr-[0px] pr-[0px]">
                        <h4 className="global_h">Best Family Dishes</h4>
                        <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                          Nasi Goreng
                        </p>
                        <p className="globaltext">Spiced Pork Cubes </p>
                        <p className="globaltext">Dum Aloo </p>
                      </div>
                    </div>
                    <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[50%] xs:w-full my-3 md:my-0">
                      <div className="text-center md:border-e-[2px] 2xl:w-[400px] xl:px-[0px] px-[0px]">
                        <h4 className="global_h">Most Popular</h4>
                        <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                          Dhaba Style Chicken
                        </p>
                        <p className="globaltext">Pad Thai </p>
                        <p className="globaltext"> Ramen Noodles</p>
                      </div>
                    </div>
                  </div>
                  <div className=" flex w-full md:flex-none md:w-[49%] sm:w-[100%] ">
                    <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[50%] xs:w-full my-3 md:my-0">
                      <div className="text-center border-e-[2px] 2xl:w-[400px] xl:px-[0px] px-[0px] mr-0">
                        <h4 className="global_h"> Top Healthy Dishes</h4>
                        <p className="globaltext 2xl:mt-[30px] xl:mt-[20px] mt-[10px]">
                          Lentil Shepards Pie
                        </p>
                        <p className="globaltext"> Vegan Bolognese</p>
                        <p className="globaltext"> HK Chicken Salad</p>
                      </div>
                    </div>
                    <div className="lg:w-[320px] md:w-[230px] 2xl:w-[500px] sm:w-[50%] xs:w-full my-3 md:my-0">
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
        </div>
        <Footer />
      </section>
    </>
  );
};

export default GlobalCusines;
