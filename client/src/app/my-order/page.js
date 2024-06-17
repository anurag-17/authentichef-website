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

  const [getAllOrders, setGetAllOrders] = useState([]);

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

  const formatDate = (dateString) => {
    const options = {
      timeZone: "Europe/London",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const formattedDate = formatter.format(date);

    return formattedDate;
  };

  // Example usage:
  const dateStr = "2024-06-17T12:00:00Z"; 
  const formatted = formatDate(dateStr);
  console.log(formatted); // Output: 17 June 2024

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000); // Adjust the delay time (3000ms = 3 seconds) as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);
  return (
    <>
      <section>
        <h1 className="pop-heads">Order List</h1>
        <div className="2xl:mt-[65px] xl:mt-[40px] mt-[30px]">
          {Array.isArray(getAllOrders) && getAllOrders.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-start">#</th>
                  <th className="px-4 py-2 text-start">Customer Name</th>
                  <th className="px-4 py-2 text-start">Amount</th>
                  <th className="px-4 py-2 text-start">Preview</th>
                  <th className="px-4 py-2 text-start">Ordered Date</th>
                  <th className="px-4 py-2 text-start">Item</th>

                  <th className="px-4 py-2 text-start">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {getAllOrders.map((order, orderIndex) => (
                  <React.Fragment key={orderIndex}>
                    {order.items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        {itemIndex === 0 && (
                          <>
                            <td
                              className="table_data"
                              rowSpan={order.items.length}
                            >
                              {orderIndex + 1}
                            </td>
                            <td
                              className="table_data capitalize"
                              rowSpan={order.items.length}
                            >
                              {order.deliveryInfo[0]?.FirstName || "N/A"}{" "}
                              {order.deliveryInfo[0]?.LastName || "N/A"}
                            </td>
                            <td
                              className="table_data"
                              rowSpan={order.items.length}
                            >
                              £{order.totalAmount?.toFixed(2)}
                            </td>
                            <td
                              className="table_data"
                              rowSpan={order.items.length}
                            >
                              <Link href={`/pages/order-details/${order?._id}`}>
                                <button className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[80px] 2xl:h-[40px] 2xl:text-[16px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[60px] xl:py-[5px] lg:px-2 lg:py-[6px] px-3 py-1 2xl:px-0 2xl:py-0 hover:bg-[#7e2727]">
                                  View
                                </button>
                              </Link>
                            </td>
                            <td
                              className="table_data"
                              rowSpan={order.items.length}
                            >
                              {/* {formatDate(order.orderDate)} */}
                              {order.orderDate}
                            </td>
                          </>
                        )}
                        <td className="table_data">{item.name}</td>
                        <td className="table_data">{item.quantity}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-5">
              {showMessage && (
                <>
                  <h2 className="2xl:text-[40px] xl:text-[25px] text-[16px] font-bold">
                    No Order found
                  </h2>
                  <div className="flex justify-center"></div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyOrder;

{
  /* <div className="">
                            <h4 className="my-2">
                              {" "}
                              <h4 className="my-2">Delivered on {formatDate(order.deliveryDate)}</h4>
                              </h4>

                            <Link href={`/pages/order-details/${order?._id}`}>
                              <button className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[257px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[150px] xl:py-[10px] lg:px-3 lg:py-[6px] px-3 py-1 hover:bg-[#7e2727]">
                                View Order Details
                              </button>
                            </Link>
                          </div> */
}
