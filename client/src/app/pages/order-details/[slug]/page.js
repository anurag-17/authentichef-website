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
        <div className="flex justify-center py-10">
          <div className="w-full lg:w-1/2 border rounded-lg ">
            <h1 className="inter font-[600] text-[40px] text-center">
              Order Details
            </h1>

            <div className="flex flex-col items-center w-full px-[40px]">
              {/* Displaying total amount */}
              <h1 className="text-xl font-bold">
                Total Amount: {getOrders.totalAmount}
              </h1>

              {/* Iterating over the items */}
              {Array.isArray(getOrders.items) &&
                getOrders.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mt-5 w-full"
                  >
                    <div className="w-1/2">
                      <img
                        src={item.ProfileImage[0]}
                        className="rounded-[15px] 2xl:w-[459px] 2xl:h-[339px] xl:w-[280px] xl:h-[200px]"
                        alt={item.name}
                      />
                    </div>
                    <div className="flex flex-col items-start w-1/2 pop-detail">
                      <h2 className="pop-head capitalize">{item.name}</h2>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              <div className="flex justify-around w-full">
                <div className="w-1/2">
                  {/* Displaying delivery info */}
                  {Array.isArray(getOrders.deliveryInfo) &&
                    getOrders.deliveryInfo.map((info, index) => (
                      <div key={index} className="mt-5">
                        <h2 className="text-lg font-semibold">
                          Delivery Information:
                        </h2>
                        <p>Phone: {info.phone}</p>
                        <p>House No: {info.houseNo}</p>
                        <p>Building: {info.buildingName}</p>
                        <p>Street: {info.streetName}</p>
                        <p>City: {info.City}</p>
                        <p>Country: {info.country}</p>
                        <p>First Name: {info.FirstName}</p>
                        <p>Last Name: {info.LastName}</p>
                        <p>Type of Address: {info.Type_of_Address}</p>
                      </div>
                    ))}
                </div>

                {/* Displaying other order details */}
                <div className=" w-1/2 mt-5">
                  <h2 className="text-lg font-semibold">Order Details:</h2>
                  <p>Status: {getOrders.status}</p>
                  <p>
                    Delivery Date:{" "}
                    {new Date(getOrders.deliveryDate).toLocaleDateString()}
                  </p>
                  <p>Promo Code: {getOrders.Promo_code}</p>
                  <p>Discount Applied: ${getOrders.discountApplied}</p>
                  <p>Discount Percentage: {getOrders.DiscountPercentage}%</p>
                  <p>Shipping Charge: ${getOrders.shippingCharge}</p>
                  <p>
                    Total Before Discount: $
                    {getOrders.totalAmountBeforeDiscount}
                  </p>
                  <p>Payment ID: {getOrders.payment}</p>
                  <p>Transaction ID: {getOrders.TransactionId}</p>
                  <p>
                    Order Date: {new Date(getOrders.orderDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetails;
