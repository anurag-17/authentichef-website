"use client";
import React, { useEffect, useState } from "react";
import popimg from "../assets/pop-img.png";
import Image from "next/image";
import axios from "axios";
import config from "@/config";
import { useSelector } from "react-redux";

const DishDetails = ({ dishID, defaultADish, handleAddCart, setItemId }) => {
  const { token } = useSelector((state) => state?.auth);

  const [count, setCount] = useState(1);
  // console.log(dishID, "dishID");
  const [getADish, setGetADish] = useState("");

  useEffect(() => {
    defaultDish();
  }, []);

  const defaultDish = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/menu/menuItems/${dishID}`,
    };
    axios
      .request(option)
      .then((response) => {
        setGetADish(response?.data);
        console.log(response?.data, "data");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <>
      <section>
        <div>
          <div className="flex 2xl:gap-[60px] xl:gap-[40px] gap-[20px] justify-between ">
            <div className="2xl:w-[459px] xl:w-[280px] w-[180px] ">
              <img
                src={getADish?.ProfileImage}
                className="rounded-[15px] 2xl:w-[459px] 2xl:h-[339px] xl:w-[280px] xl:h-[200px]"
              />
            </div>
            <div className="2xl:w-[400px] xl:w-[359px] w-[300px]">
              <div>
                <h1 className="pop-head capitalize">{getADish?.name}</h1>
                <p className="pop-chef">by Chef {getADish?.chef_id?.name}</p>
              </div>
              <div className="flex justify-between pop-detail">
                <h3>Price: £{getADish?.price}</h3>
                <h3>Weight: {getADish?.weight}g</h3>
                <h3>Portion Size: Serves {getADish?.portion_Size}</h3>
              </div>
              <div className="flex flex-wrap 2xl:gap-[10px] xl:gap-[8px] gap-[6px]  2xl:my-[15px] xl:my-[12px] my-[8px]">
                {getADish?.Dietary_id?.title ? (
                  <div className="pop">
                    <img
                      src={getADish?.Dietary_id?.ProfileImage}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    />
                    <h3>{getADish?.Dietary_id?.title}</h3>
                  </div>
                ) : (
                  ""
                )}

                <button className="four_btnn border">
                  <img
                    src={getADish?.spice_level_id?.ProfileImage}
                    className="2xl:[100%] h-auto"
                  />
                  <h3>{getADish?.spice_level_id?.title}</h3>
                </button>

                <div className="pop">
                  {/* <img
                    src={getADish?.spice_level_id?.ProfileImage}
                    className="2xl:[18px] xl:w-[14px] w-[12px]"
                  /> */}
                  {/* <h3>{getADish?.Nutrition_id?.Nutritional}</h3> */}
                  {getADish?.Nutrition_id?.Nutritional ? (
                    <div className="four_btn">
                      <p className="fourth_day capitalize">
                        {getADish?.Nutrition_id?.Nutritional}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex justify-center 2xl:w-[103px] 2xl:h-[39px] xl:w-[60px] xl:h-[22px] lg:w-[50px] lg:h-[20px] border rounded-[5px] 2xl:mt-[25px] xl:mt-[20px] mt-[15px]">
                {" "}
                <button
                  className="   text-[#DB5353] rounded-l w-1/3"
                  onClick={() => {
                    handleDecrement();
                    // alert("Removed from cart");
                  }}
                >
                  -
                  {/* <Image
                      src={minus}
                      className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                    /> */}
                </button>
                <p className=" flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px]  2xl:leading-[28px] ">
                  {count}
                </p>
                <button
                  className="    text-[#DB5353] rounded-r w-1/3"
                  onClick={() => handleIncrement()}
                >
                  +
                  {/* <Image
                      src={plus}
                      className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                    /> */}
                </button>
              </div>
              <div>
                {token ? (
                  <button
                    onClick={() => {
                      setItemId(getADish?._id);
                      handleAddCart(getADish?._id);
                    }}
                    className="pop-btn"
                  >
                    <div className="drawer-content">
                      <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
                        {/* <Image
                          src={addCart}
                          alt={item.title}
                          className="cursor-pointer 2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] lg:w-[25px] lg:h-[25px] w-[25px] h-[25px]"
                        /> */}
                        Add to basket
                      </label>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      defaultADish(getADish?._id);
                    }}
                    className="pop-btn"
                  >
                    <div className="drawer-content">
                      <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
                        {/* <Image
                          src={addCart}
                          alt={item.title}
                          className="cursor-pointer 2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] lg:w-[25px] lg:h-[25px] w-[25px] h-[25px]"
                        /> */}
                        Add to basket
                      </label>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="2xl:my-[15px] xl:my-[10px] my-[8px]">
            <div className="">
              <p className="fourth_p text-[#555555]">Description</p>{" "}
              <p className="fourth_p 2xl:w-[890px] xl:w-[660px] w-[550px]">
                {getADish?.description}
              </p>
            </div>
          </div>
          <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
            <div className="">
              <div>
                <p className="fourth_p text-[#555555]">Ingredients</p>{" "}
                <p className="fourth_p "> {getADish?.Ingredients}</p>
              </div>
              <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
                <p className="fourth_p text-[#555555] ">List of Allergens</p>{" "}
                <p className="fourth_p ">{getADish?.List_of_Allergens}</p>
              </div>
              <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
                <p className="fourth_p text-[#555555]">Heating instructions</p>{" "}
                <p className="fourth_p ">{getADish?.Heating_Instruction}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DishDetails;
