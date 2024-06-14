"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import order1 from "./assets/order1.png";
import order2 from "./assets/order2.png";
import { useSearchParams } from "next/navigation";
import config from "@/config";
import axios from "axios";
import { useSelector } from "react-redux";

const MyOrder = () => {
  const { token } = useSelector((state) => state?.auth);

  const [getAllOrders, setGetAllOrders] = useState("");
  useEffect(() => {
    defaultorders();
  }, []);

  const defaultorders = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/order/orderList`,

      headers: {
        Authorization: token,
      },
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllOrders(response?.data?.orders);
        console.log(response?.data?.orders, "orders");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  

  
  return (
    <>
      <section>
        <h1 className="pop-heads">Order List</h1>
        <div className="2xl:mt-[65px] xl:mt-[40px] mt-[30px]">
          {Array.isArray(getAllOrders) && getAllOrders.length > 0 ? (
            <div>
              {Array.isArray(getAllOrders) &&
                getAllOrders
                  .slice()
                  .reverse()
                  .map((order, orderIndex) => (
                    <div key={orderIndex}>
                      <ul>
                        <li className="fourth_p text-[#787878]">
                          {/* Delivered on {order.deliveryDate} */}
                        </li>
                      </ul>
                      {order?.items?.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex justify-between items-center 2xl:mt-[20px] xl:mt-[10px] mt-[8px] border rounded-[10px] 2xl:p-[30px] xl:p-[20px] p-[15px]"
                        >
                          <div
                            key={itemIndex}
                            className="flex items-center 2xl:gap-[15px] xl:gap-[10px] gap-[8px]"
                          >
                            <img
                              src={item?.menuItem?.ProfileImage[0]}
                              className="rounded-[5.8px] 2xl:w-[95px] 2xl:h-[95px] xl:w-[70px] w-[50px] h-auto"
                              alt={item?.menuItem?.name}
                            />
                            <div>
                              <h4 className="alata font-[400] 2xl:text-[24px] 2xl:leading-[34px] xl:text-[14px] xl:leading-[24px] lg:text-[14px] lg:leading-[20px]">
                                {item?.menuItem?.name}
                              </h4>
                            </div>
                          </div>
                          <div className="">
                            <h4 className="my-2"> Delivered on {order.deliveryDate}</h4>

                            <Link href={`/pages/order-details/${order?._id}`}>
                              <button className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[257px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[150px] xl:py-[10px] lg:px-3 lg:py-[6px] px-3 py-1 hover:bg-[#7e2727]">
                                View Order Details
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
            </div>
          ) : (
            <div className="text-center my-5">
              <h2 className="text-[40px] font-bold">No Order found</h2>
              <div className="flex justify-center"></div>
            </div>
          )}
        </div>

        {/* <div className="2xl:mt-[65px] xl:mt-[40px] mt-[30px]">
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
              <h4 className="alata font-[400] 2xl:text-[24px] 2xl:leading-[34px] xl:text-[14px] xl:leading-[24px] lg:text-[14px] lg:leading-[20px]">
                Alloo Sabhji
              </h4>
            </div>
            <div className="">
              <button className=" alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[257px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[150px] xl:py-[10px] lg:px-3 lg:py-[6px] px-3 py-1 hover:bg-[#7e2727]  ">
                View Order Details
              </button>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default MyOrder;
