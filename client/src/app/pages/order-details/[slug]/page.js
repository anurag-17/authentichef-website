"use client";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
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
      <Navbar />
      <section>
        <div className="flex justify-center py-10 2xl:pt-[180px] xl:pt-[130px] md:pt-[100px] pt-[80px]">
          <div className=" lg:w-1/2 border rounded-lg py-[20px] sm:w-[75%] w-[95%]">
            <h1 className="inter font-[600] 2xl:text-[40px] xl:text-[25px] text-[20px] text-center">
              Order Details
            </h1>

            <div className="flex flex-col items-center w-full px-[40px]">
              {/* Displaying total amount */}
              <h1 className="2xl:text-[25px] xl:text-[16px] text-[12px] font-semibold">
                Total Amount: £
                {getOrders.totalAmount}
              </h1>

              {/* Iterating over the items */}
              {Array.isArray(getOrders.items) &&
                getOrders.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-5 md:gap-0 2xl:gap-10 justify-between items-center mt-5 w-full"
                  >
                    <div className="w-[20%]">
                      <img
                        src={item.ProfileImage[0]}
                        className="rounded-[15px] 2xl:w-[250px] h-auto w-full md:w-[80%]"
                        alt={item.name}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[80%] pop-detail">
                      <h2 className=" 2xl:text-[25px] 2xl:leading-[35px] xl:text-[16px] text-[16px] lg:text-[14px] leading-[20px] lg:leading-[18px] xl:leading-[20px] capitalize">{item.name}</h2>
                      <p className="text-[14px] leading-[18px] lg:text-[16px] xl:leading-[20px] 2xl:text-[18px] lg:my-1">Quantity : {item.quantity}</p>
                      <p className="text-[14px] leading-[18px] lg:text-[16px] xl:leading-[20px] 2xl:text-[18px] lg:my-1">Price : £
                      {item.price}</p>
                    </div>
                  </div>
                ))}
              <div className="sm:flex justify-around w-full">
                <div className="sm:w-1/2">
                  {/* Displaying delivery info */}
                  {Array.isArray(getOrders.deliveryInfo) &&
                    getOrders.deliveryInfo.map((info, index) => (
                      <div key={index} className="mt-5">
                        <h2 className="font-semibold 2xl:text-[25px] xl:text-[16px] text-[16px]">
                          Delivery Information:
                        </h2>
                        <p className="footer_text flex w-full">Phone : {info.phone}</p>
                        <p className="footer_text flex w-full">House No : {info.houseNo}</p>
                        <p className="footer_text flex w-full">Building : {info.buildingName}</p>
                        <p className="footer_text flex w-full">Street : {info.streetName}</p>
                        <p className="footer_text flex w-full">City : {info.City}</p>
                        <p className="footer_text flex w-full">Country : {info.country}</p>
                        <p className="footer_text flex w-full">First Name : {info.FirstName}</p>
                        <p className="footer_text flex w-full">Last Name : {info.LastName}</p>
                        <p className="footer_text flex w-full">Type of Address : {info.Type_of_Address}</p>
                      </div>
                    ))}
                </div>

                {/* Displaying other order details */}
                <div className=" sm:w-1/2 mt-5">
                  <h2 className="2xl:text-[25px] xl:text-[16px] text-[16px] font-semibold">
                    Order Details:
                  </h2>
                  <p className="footer_text flex w-full">Status : {getOrders.status}</p>
                  <p className="footer_text flex w-full">
                    Delivery Date :{" "}
                    {new Date(getOrders.deliveryDate).toLocaleDateString()}
                  </p>
                  <p className="footer_text flex w-full">Promo Code : {getOrders.Promo_code}</p>
                  <p className="footer_text flex w-full">Discount Applied : £{getOrders.discountApplied}</p>
                  <p className="footer_text flex w-full">Discount Percentage : {getOrders.DiscountPercentage}%</p>
                  <p className="footer_text flex w-full">Shipping Charge : £{getOrders.shippingCharge}</p>
                  <p className="footer_text flex w-full">
                    Total Before Discount : £
                    {getOrders.totalAmountBeforeDiscount}
                  </p>
                  <p className="footer_text flex w-full">Payment ID : {getOrders.payment}</p>
                  <p className="footer_text flex w-full">Transaction ID : {getOrders.TransactionId}</p>
                  <p className="footer_text flex w-full">
                    Order Date :{" "}
                    {new Date(getOrders.orderDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrderDetails;
