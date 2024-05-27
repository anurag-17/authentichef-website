"use client";
import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderDetails = ({params}) => {
  const { token } = useSelector((state) => state?.auth);
  const [getOrders, setGetOrders] = useState({});

  useEffect(() => {
    defaultOrer();
  }, []);
  const defaultOrer = () => {
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
        setGetOrders(response?.data?.orders);
        // console.log(response?.data?.orders, "orders");
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
              getOrders.map((order, orderIndex) => (
                <div key={orderIndex}>
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-around">
                      <div>
                        <img
                          src={item.menuItem.ProfileImage[0]}
                          className=" rounded-md"
                          alt={item.menuItem.name}
                        />
                      </div>
                      <div>Details</div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetails;
