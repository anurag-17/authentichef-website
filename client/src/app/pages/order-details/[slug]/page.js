"use client";
import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderDetails = ({ params }) => {
  const { token } = useSelector((state) => state?.auth);
  const [getOrders, setGetOrders] = useState({});

  useEffect(() => {
    defaultOrder();
  }, []);
  const defaultOrder = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/order/orderListById/${params.slug}`,
      headers: {
        authorization: token,
      },
    };
    axios
      .request(option)
      .then((response) => {
        setGetOrders(response?.data?.order);
        console.log(response?.data?.order, "orders");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  return (
    <>
      <section>
        <div class="flex justify-center py-10">
          <div class="w-full lg:w-1/2 border rounded-lg">
            <h1 className="inter font-[600] text-[40px] text-center">
              OrderDetails
            </h1>

            {Array.isArray(getOrders) &&
              getOrders.items.map((item, index) => (
                <div key={index} className="flex justify-around">
                  <h1>{item.price}</h1>
                  <div>
                    <img
                      src={item?.ProfileImage}
                      className=" rounded-md w-20"
                      // alt={getOrders.menuItem.name}
                    />
                  </div>
                  {/* <div>{getOrders?.items[0]?.quantity}</div> */}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetails;
