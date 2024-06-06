"use client";
import config from "@/config";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const headItems = [
  "S. No.",
  "Dish Name",
  "Dish Image",
  "Order Price",
  "Action",
];
const OrderList = () => {
  const { token } = useSelector((state) => state?.auth);
  const [getOrders, setGetOrders] = useState({});
  const [searchText, setSearchText] = useState("");
  const [maxHeight, setMaxHeight] = useState("780px");

  useEffect(() => {
    defaultOrer();
  }, []);
  const defaultOrer = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/order/allOrderList`,
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
    <section className="w-full">
      <div className="mx-auto">
        <div className="rounded-[10px] bg-white py-[20px] flexBetween md:flex-row gap-3 px-[20px] mt-[20px] lg:mt-0">
          <p className="text-[22px] font-semibold">Dietary List</p>
          <div className="flexCenter gap-x-7 lg:gap-x-5 md:flex-auto gap-y-3">
            <div className="border rounded border-primary bg-[#302f2f82]] flexCenter h-[32px] pl-[10px] md:w-auto w-full">
              <input
                type="text"
                className="input_search"
                // value={searchText}
                // onChange={handleSearchInput}
                // onKeyDown={handleKeyDown}
                placeholder="Search by name, contact, email."
              />
              {searchText !== "" && (
                <button
                  className="clear_search_btn"
                  // onClick={handleClearSearch}
                ></button>
              )}
              <button
                className="search_btn"
                // onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="">
            <button
              className="primary_btn py-2"
              // onClick={openDrawer}
            >
              Add new Dietary
            </button>
          </div>
        </div>
        <div
          className="overflow-auto"
          style={{ maxHeight: maxHeight, marginTop: "4px" }}
        >
          <div className="outer_table">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {headItems.map((items, index) => (
                    <th className="table_head" key={index}>
                      <p className="block text-[13px] font-medium uppercase whitespace-nowrap text-[#72727b]">
                        {items}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(getOrders) &&
                  getOrders.slice().reverse().map((order, orderIndex) => (
                    <React.Fragment key={orderIndex}>
                      {/* <tr>
                        <td className="table_data">{orderIndex + 1}</td>
                        <td className="table_data capitalize">{order.user}</td>
                        <td className="table_data">{order.status}</td>
                        <td className="table_data">
                          {new Date(order.deliveryDate).toLocaleDateString()}
                        </td>
                        <td className="table_data">{order.totalAmount}</td>
                      </tr> */}
                      {order.items.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td className="table_data">{orderIndex + 1}</td>
                          <td className="table_data capitalize">
                            {item.menuItem.name}
                          </td>
                          <td className="table_data">
                            <img
                              src={item.menuItem.ProfileImage[0]}
                              className="w-10 rounded-md"
                              alt={item.menuItem.name}
                            />
                          </td>
                          {/* <td className="table_data">{item.quantity}</td> */}
                          <td className="table_data">£{item.price}</td>
                          <td className="table_data">
                            <div className="table_btn_div">
                              <Link
                                href={`/pages/order-details/${item?.OrderId}`}
                              >
                                <button
                                  className="secondary_btn py-1"
                                  // onClick={() => openDrawerO(order._id)}
                                >
                                  View
                                </button>
                              </Link>
                              <button
                                className="delete_btn py-1"
                                onClick={() => handleDelete(order._id)}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
          {Array.isArray(getOrders?.menuItems) &&
            getOrders.menuItems.length === 0 && (
              <div className="no_data">
                <p className="text-[18px] font-semibold">No data</p>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default OrderList;
