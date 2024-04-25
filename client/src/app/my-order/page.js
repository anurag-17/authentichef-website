import React from "react";
import Image from "next/image";
import order1 from "./assets/order1.png";
import order2 from "./assets/order2.png";



const MyOrder = () => {
  return (
    <>
      <section>
        <div className="2xl:mt-[65px] xl:mt-[40px] mt-[30px]">
          <ul>
            <li className="fourth_p text-[#787878]">Delivered on 22 May</li>
          </ul>
          <div className=" flex justify-between items-center 2xl:mt-[20px] xl:mt-[10px] mt-[8px] border rounded-[10px] 2xl:p-[30px] xl:p-[20px] p-[15px] ">
            <div className="flex items-center 2xl:gap-[15px] xl:gap-[10px] gap-[8px]">
              <Image
                src={order1}
                width={95}
                height={95}
                alt="order-img"
                className="rounded-[5.8px] 2xl:w-[95px] 2xl:h-[95px] xl:w-[70px] w-[50px] h-auto"
              />
              <h1 className="alata font-[400] 2xl:text-[24px] 2xl:leading-[34px] xl:text-[14px] xl:leading-[24px] lg:text-[14px] lg:leading-[20px]">
                Paneer butter masala
              </h1>
            </div>
            <div className="">
              <button className=" alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[257px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[150px] xl:py-[10px] lg:px-3 lg:py-[6px] px-3 py-1 hover:bg-[#7e2727]  ">
                View Order Details
              </button>
            </div>
          </div>
        </div>
        <div className="2xl:mt-[65px] xl:mt-[40px] mt-[30px]">
          <ul>
            <li className="fourth_p text-[#787878]">Delivered on 22 May</li>
          </ul>
          <div className=" flex justify-between items-center 2xl:mt-[20px] xl:mt-[10px] mt-[8px] border rounded-[10px] 2xl:p-[30px] xl:p-[20px] p-[15px]">
            <div className="flex items-center 2xl:gap-[15px] xl:gap-[10px] gap-[8px]">
              <Image
                src={order2}
                width={95}
                height={95}
                alt="order-img"
                className="rounded-[5.8px] 2xl:w-[95px] 2xl:h-[95px] xl:w-[70px] w-[50px] h-auto"
              />
              <h1 className="alata font-[400] 2xl:text-[24px] 2xl:leading-[34px] xl:text-[14px] xl:leading-[24px] lg:text-[14px] lg:leading-[20px]">
                Alloo Sabhji
              </h1>
            </div>
            <div className="">
              <button className=" alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[257px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[150px] xl:py-[10px] lg:px-3 lg:py-[6px] px-3 py-1 hover:bg-[#7e2727]  ">
                View Order Details
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrder;
