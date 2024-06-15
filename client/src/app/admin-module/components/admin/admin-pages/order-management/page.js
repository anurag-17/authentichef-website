"use client";
import config from "@/config";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const headItems = [
  "S. No.",
  "Customer Name",
  "Order Number",
  "Dish Name",
  "Dish Image",
  "Order Price",
  "Action",
];

const OrderList = () => {
  const { token } = useSelector((state) => state?.auth);
  const [getOrders, setGetOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(50);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchText]);

  const fetchOrders = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/order/allOrderList`,
      headers: {
        authorization: token,
      },
      params: {
        page: currentPage,
        limit: ordersPerPage,
        search: searchText,
      },
    };
    axios
      .request(option)
      .then((response) => {
        setGetOrders(response?.data?.orders);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  const handleView = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleDelete = (orderId) => {
    console.log("Delete order with ID:", orderId);
  };

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); 
  };

  const handleClearSearch = () => {
    setSearchText("");
    setCurrentPage(1); // Reset to first page on clear search
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchOrders();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="w-full">
      <div className="mx-auto">
        <div className="rounded-[10px] bg-white py-[20px] flexBetween md:flex-row gap-3 px-[20px] mt-[20px] lg:mt-0">
          <p className="text-[22px] font-semibold">Orders List</p>
          <div className="flexCenter gap-x-7 lg:gap-x-5 md:flex-auto gap-y-3">
            {/* <div className="border rounded border-primary bg-[#302f2f82]] flexCenter h-[32px] pl-[10px] md:w-auto w-full">
              <input
                type="text"
                className="input_search"
                value={searchText}
                onChange={handleSearchInput}
                placeholder="Search by name, contact, email."
              />
              {searchText !== "" && (
                <button
                  className="clear_search_btn"
                  onClick={handleClearSearch}
                >
                  Clear
                </button>
              )}
              <button className="search_btn" onClick={handleSearch}>
                Search
              </button>
            </div> */}
          </div>
          
        </div>
        <div
          className="overflow-auto"
          style={{ maxHeight: "780px", marginTop: "4px" }}
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
                  getOrders
                    .slice()
                    .map((order, orderIndex) => (
                      <React.Fragment key={orderIndex}>
                        {order.items.map((item, itemIndex) => (
                          <tr key={itemIndex}>
                            {itemIndex === 0 && ( // Render customer info only for the first item of each order
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
                                  {order.OrderNumber}
                                </td>
                              </>
                            )}
                            <td className="table_data capitalize">
                              {item.name || "N/A"}
                            </td>
                            <td className="table_data">
                              {item.ProfileImage?.[0] ? (
                                <img
                                  src={item.ProfileImage[0]}
                                  alt="Dish"
                                  style={{ width: "50px", height: "50px" }}
                                />
                              ) : (
                                "No Image"
                              )}
                            </td>
                            <td className="table_data">£{item.price}</td>
                            {itemIndex === 0 && ( // Render action buttons only for the first item of each order
                              <td
                                className="table_data"
                                rowSpan={order.items.length}
                              >
                                <div className="table_btn_div">
                                  <button
                                    className="secondary_btn py-1"
                                    onClick={() => handleView(order)}
                                  >
                                    View
                                  </button>
                                  {/* <button
                                    className="delete_btn py-1"
                                    onClick={() => handleDelete(order._id)}
                                  >
                                    Cancel
                                  </button> */}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
              </tbody>
            </table>
          </div>
          {Array.isArray(getOrders) && getOrders.length === 0 && (
            <div className="no_data">
              <p className="text-[18px] font-semibold">No data</p>
            </div>
          )}
        </div>
        <div className="pagination">
          {[...Array(Math.ceil(500 / ordersPerPage)).keys()].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`page_btn ${
                currentPage === number + 1 ? "active" : ""
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>

      {selectedOrder && (
        <div className="custom-modal w-[50%]">
          <div className="custom-modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Customer Name:</strong>{" "}
              {selectedOrder.deliveryInfo[0]?.FirstName}{" "}
              {selectedOrder.deliveryInfo[0]?.LastName}
            </p>
            {/* <p>
              <strong>Order Status:</strong> {selectedOrder.status}
            </p> */}
            <p>
              <strong>Delivery Date:</strong> 2-3 Working Days{" "}
              {/* Placeholder text */}
            </p>
            <p>
              <strong>Total Amount:</strong> £{selectedOrder.totalAmount}
            </p>
            <p>
              <strong>Discount Applied:</strong> £
              {selectedOrder.discountApplied}
            </p>
            <p>
              <strong>Total Amount Before Discount:</strong> £
              {selectedOrder.totalAmountBeforeDiscount.toFixed(2)}
            </p>
            <p>
              <strong>Discount Percentage:</strong>{" "}
              {selectedOrder.discountPercentage}%
            </p>
            {selectedOrder.payment && (
              <div>
                <h3>Payment Details:</h3>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  {/* {selectedOrder.payment.paymentMethod.join(", ")} */} Stripe
                </p>
                <p>
                  <strong>Payment Status:</strong>{" "}
                  {selectedOrder.payment.status}
                </p>
                <p>
                  <strong>Payment Amount:</strong> £
                  {selectedOrder.payment.amount}
                </p>
                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {selectedOrder.payment.transactionId}
                </p>
                <p>
                  <strong>Payment Date:</strong>{" "}
                  {new Date(selectedOrder.payment.paymentDate).toLocaleString()}
                </p>
              </div>
            )}
            <h3>Delivery Address:</h3>
            <p>
              <strong>First Name:</strong>{" "}
              {selectedOrder.deliveryInfo[0]?.FirstName}
            </p>
            <p>
              <strong>Last Name:</strong>{" "}
              {selectedOrder.deliveryInfo[0]?.LastName}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder.deliveryInfo[0]?.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.deliveryInfo[0]?.houseNo}
              , {selectedOrder.deliveryInfo[0]?.buildingName},{" "}
              {selectedOrder.deliveryInfo[0]?.streetName},{" "}
              {selectedOrder.deliveryInfo[0]?.City},{" "}
              {selectedOrder.deliveryInfo[0]?.country},{" "}
              {selectedOrder.deliveryInfo[0]?.Postcode}
            </p>
            <h3>Items:</h3>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  <p>
                    {item.name}: £{item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <img
                    src={item.ProfileImage?.[0]}
                    alt="Dish"
                    style={{ width: "50px", height: "50px", marginTop: "5px" }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0, 0, 0);
          background-color: rgba(0, 0, 0, 0.4);
        }

        .custom-modal-content {
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 600px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
          animation-name: animatetop;
          animation-duration: 0.4s;
        }

        @keyframes animatetop {
          from {
            top: -300px;
            opacity: 0;
          }
          to {
            top: 0;
            opacity: 1;
          }
        }

        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }

        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .page_btn {
          margin: 0 5px;
          padding: 5px 10px;
          border: 1px solid #ddd;
          cursor: pointer;
        }

        .page_btn.active {
          background-color: #007bff;
          color: white;
        }

        .page_btn:hover {
          background-color: #ddd;
        }
      `}</style>
    </section>
  );
};

export default OrderList;
