"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../footer";
import img from "./assets/checkout-img.png";
import plus from "../../../public/images/plus.svg";
import minus from "../../../public/images/minus.svg";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import order from "./assets/order.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import config from "@/config";

import { useRouter } from "next/navigation";

const Checkout = () => {
  const { token } = useSelector((state) => state?.auth);
  const { cart } = useSelector((state) => state?.userCart);
  const router = useRouter();
  const [Promo_code, setPromoCode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState([
    {
      phone: "",
      houseNo: "",
      buildingName: " ",
      streetName: " ",
      City: " ",
      country: " ",
      FirstName: "",
      LastName: "",
    },
  ]);
  const [billingInfo, setBillingInfo] = useState([
    {
      phone: "",
      houseNo: "",
      buildingName: " ",
      streetName: " ",
      City: " ",
      country: " ",
      FirstName: "",
      LastName: "",
    },
  ]);
  console.log(deliveryInfo, "deliveryInfo");
  const handleInputChange = (e, setInfo) => {
    const { name, value } = e.target;
    setInfo((prevState) => [
      {
        ...prevState[0],
        [name]: value,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deliveryDate) {
      toast.error("Delivery date is required.");
      return;
    }

    try {
      const response = await axios.post(
        `${config.baseURL}/api/order/createOrder`,
        {
          deliveryInfo,
          billingInfo,
          deliveryDate,
          Promo_code,
          Delivery_instruction,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("Order Placed");
        router.push("/explore-dishes");
      } else {
        toast.error(response.data.message || "Order Failed");
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      toast.error("Order Failed");
      console.log("Error:", error);
    }
  };

  // const [count, setCount] = useState(0);
  // const handleIncrement = () => {
  // setCount(count + 1);
  // };
  // const handleDecrement = () => {
  // if (count > 0) {
  // setCount(count - 1);
  // }
  // };
  const [getCartItems, setGetCartItems] = useState({});
  const [subtotalPrice, setSubtotalPrice] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const refreshData = () => {
    setRefresh(!isRefresh);
  };
  useEffect(() => {
    defaultCartItems();
  }, [isRefresh]);

  const defaultCartItems = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/Orders/getCartItem`,
      headers: {
        Authorization: token,
      },
    };
    axios
      .request(option)
      .then((response) => {
        setGetCartItems(response?.data?.userCart?.items);
        setSubtotalPrice(response?.data);
        console.log(response?.data, "data");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  const [deliveryDate, setDeliveryDate] = useState("");

  // Define today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    if (inputDate > new Date(today)) {
      setDeliveryDate(e.target.value);
    }
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const [Delivery_instruction, setDeliveryInstruction] = useState("");

  const handleDeliveryInstructionChange = (e) => {
    setDeliveryInstruction(e.target.value);
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <section>
        <Navbar />
        <div className=" 2xl:pt-[116px] xl:pt-[80px] pt-[50px]">
          <div className="flex justify-center bg-[#F5F5F5] 2xl:h-[90px] xl:h-[60px] lg:h-[50px] sm:h-[45px] h-12">
            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] w-full px-10 md:px-0 flex 2xl:gap-[15px] xl:gap-[10px] gap-[5px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="text-[#828282] w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              <Link href="/explore-dishes">
                <button className="alata font-[400] text-[#828282] 2xl:text-[16px] 2xl:leading-[20px] xl:text-[12px] xl:leading-[18px] text-[10px] leading-[16px]">
                  Back to Chef’s Menu
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] w-full md:px-0 items-center 2xl:px-[75px] xl:px-[50px] lg:px-[50px] mx-auto">
            <h4 className="pop-head 2xl:my-[30px] xl:my-[20px] my-[15px]">
              Delivery information
            </h4>
            <div className=" 2xl:mb-[110px] xl:mb-[70px]">
              <div className="2xl:w-[795px] xl:w-[595px] w-[400px] flex justify-between 2xl:gap-[55px] xl:gap-[40px] gap-[25px]">
                <div>
                  <div>
                    <label className="checkoutlable">
                      Phone <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      placeholder="Enter phone number"
                      type="number"
                      name="phone"
                      value={deliveryInfo.phone}
                      onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                    />
                  </div>
                  <div>
                    <div className="my-[20px]">
                      <label className="checkoutlable ">
                        Shipping Address{" "}
                        <span className="text-[#DB1414]">*</span>
                      </label>
                    </div>
                    <div className="form-control flex flex-row gap-5 items-center">
                      <label className="label cursor-pointer w-[15px] h-[15px]">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="checkbox checkbox-info rounded-none w-[18px] h-[18px]"
                        />
                      </label>
                      <span className="label-text alata font-[400] 2xl:text-[16px] 2xl:leading-[26px] xl:text-[12px] xl:leading-[18px] text-[10px] leading-[16px]">
                        Add a new address
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">
                        House No. <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        placeholder="Enter"
                        type="text"
                        name="houseNo"
                        value={deliveryInfo.houseNo}
                        onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">
                        Building Name. <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="text"
                        name="buildingName"
                        placeholder="Enter"
                        value={deliveryInfo.buildingName}
                        onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="checkoutlable">
                      Street Name <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      type="text"
                      name="streetName"
                      placeholder="Enter"
                      value={deliveryInfo.streetName}
                      onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                    />
                  </div>
                  <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                    <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                      <label className="checkoutlable">
                        Town/City <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="text"
                        name="City"
                        placeholder="Enter"
                        value={deliveryInfo.City}
                        onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                    <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                      <label className="checkoutlable">
                        County <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        name="country"
                        type="text"
                        placeholder="Enter"
                        value={deliveryInfo.country}
                        onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                    <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                      <label className="checkoutlable">
                        Postcode <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="number"
                        name="Postcode"
                        placeholder="Enter"
                        value={deliveryInfo.number}
                        onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">
                        First Name <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="text"
                        name="FirstName"
                        placeholder="Enter"
                        value={deliveryInfo.FirstName}
                        onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">
                        Last Name <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        name="LastName"
                        type="text"
                        placeholder="Enter"
                        value={deliveryInfo.LastName}
                        onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                  </div>
                  <hr className="2xl:my-[50px] xl:my-[35px] my-[25px]" />
                  <div>
                    <h4 className="pop-head 2xl:my-[5px]">Billing address</h4>
                    <p className="checkoutlable text-[#929292]">
                      Shop securely and conveniently. All transactions are
                      encrypted
                    </p>
                  </div>
                  <div className="form-control flex flex-row gap-5 items-center 2xl:my-[30px] xl:my-[20px] my-[15px]">
                    <label className="label cursor-pointer w-[15px] h-[15px]">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-info rounded-none w-[18px] h-[18px]"
                      />
                    </label>
                    <span className="label-text alata font-[400] 2xl:text-[16px] 2xl:leading-[26px] xl:text-[12px] xl:leading-[18px] text-[10px] leading-[16px]">
                      Same as shipping address
                    </span>
                  </div>
                  <div className="form-control flex flex-row gap-5 items-center 2xl:my-[30px] xl:my-[20px] my-[15px]">
                    <label className="label cursor-pointer w-[15px] h-[15px]">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-info rounded-none w-[18px] h-[18px]"
                      />
                    </label>
                    <span className="label-text alata font-[400] 2xl:text-[16px] 2xl:leading-[26px] xl:text-[12px] xl:leading-[18px] text-[10px] leading-[16px]">
                      Use a different billing address
                    </span>
                  </div>
                  <div>
                    <div className="my-[20px]">
                      <label className="checkoutlable ">
                        Shipping Address{" "}
                        <span className="text-[#DB1414]">*</span>
                      </label>
                    </div>
                    <div className="form-control flex flex-row gap-5 items-center">
                      <label className="label cursor-pointer w-[15px] h-[15px]">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="checkbox checkbox-info rounded-none w-[18px] h-[18px]"
                        />
                      </label>
                      <span className="label-text alata font-[400] 2xl:text-[16px] 2xl:leading-[26px] xl:text-[12px] xl:leading-[18px] text-[10px] leading-[16px]">
                        Add a new address
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">
                        House No. <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        placeholder="Enter"
                        type="text"
                        name="houseNo"
                        value={billingInfo.houseNo}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">
                        Building Name. <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="text"
                        name="buildingName"
                        placeholder="Enter"
                        value={billingInfo.buildingName}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="checkoutlable">
                      Street Name <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      type="text"
                      name="streetName"
                      placeholder="Enter"
                      value={billingInfo.streetName}
                      onChange={(e) => handleInputChange(e, setBillingInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                    />
                  </div>
                  <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                    <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                      <label className="checkoutlable">
                        Town/City <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="text"
                        name="City"
                        placeholder="Enter"
                        value={billingInfo.City}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                    <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                      <label className="checkoutlable">
                        County <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        name="country"
                        type="text"
                        placeholder="Enter"
                        value={billingInfo.country}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                    <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                      <label className="checkoutlable">
                        Postcode <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="number"
                        name="Postcode"
                        placeholder="Enter"
                        value={billingInfo.number}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">
                        First Name <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="text"
                        name="FirstName"
                        placeholder="Enter"
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">
                        Last Name <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        name="LastName"
                        type="text"
                        placeholder="Enter"
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      />
                    </div>
                  </div>
                </div>
                {/* =========Right ============ */}
                <div>
                  <div className="2xl:w-[597px] xl:w-[395px] w-[295px] p-5 border 2xl:mt-[35px] ">
                    <div className="">
                      <div className="max-h-[250px] overflow-y-scroll">
                        {Array.isArray(getCartItems) &&
                          getCartItems.map((item) => (
                            <div key={item.id}>
                              <div className="flex justify-between items-center 2xl:my-6 my-2">
                                <div className="flex items-center gap-2 2xl:gap-4 xl:h-[70px]">
                                  <img
                                    src={item?.menuItem?.ProfileImage}
                                    alt={item?.menuItem?.name}
                                    className="2xl:w-[83px] 2xl:h-[83px] xl:w-[65px] lg:w-[50px] rounded-[10px]"
                                  />
                                  <div>
                                    <h4 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[24px] 2xl:leading-[34px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                                      {item?.menuItem?.name}
                                    </h4>
                                    <h4 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[20px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                                      £{item?.menuItem?.price}
                                    </h4>
                                  </div>
                                </div>
                                <div className="flex justify-center 2xl:w-[103px] 2xl:h-[39px] xl:w-[60px] xl:h-[22px] lg:w-[50px] lg:h-[20px] border rounded-[5px] ">
                                  {" "}
                                  <button
                                    className=" text-[#DB5353] rounded-l w-1/3"
                                    // onClick={() => {
                                    // handleDecrement();
                                    // removeFromCart(item.id);
                                    // alert("Removed from cart");
                                    // }}
                                  >
                                    <Image
                                      src={minus}
                                      className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                                    />
                                  </button>
                                  <p className=" flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px] ">
                                    {/* {count} */}1
                                  </p>
                                  <button
                                    className=" text-[#DB5353] rounded-r w-1/3"
                                    // onClick={() => handleIncrement()}
                                  >
                                    <Image
                                      src={plus}
                                      className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="flex justify-between">
                        <h4 className="alata font-[400] text-[#555555] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                          Subtotal
                        </h4>
                        <h4 className="alata font-[400] text-[#555555] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                          £{subtotalPrice?.TotalPricePerQuntity}
                          {/* £8.50 */}
                        </h4>
                      </div>
                      <div className="flex justify-between 2xl:my-[25px] xl:my-[15px] my-[10px]">
                        <div>
                          <h4 className="alata font-[400] text-[#555555] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                            Shipping
                          </h4>
                          <p>Spend over £55 for FREE delivery</p>
                        </div>
                        <h4 className="alata font-[400] text-[#555555] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                          {/* £{item?.price} */}0
                        </h4>
                      </div>
                      <div className="flex justify-between">
                        <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                          Total
                        </h4>
                        <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                          £{subtotalPrice?.TotalPricePerQuntity}
                        </h4>
                      </div>
                      <div className="2xl:my-[30px] xl:my-[20px] my-[15px]">
                        <label className="seven_p2 text-[#555555]">
                          Promo code or Gift card
                        </label>
                        <input
                          type="text"
                          name="promoCode"
                          placeholder="Promo Code"
                          maxLength="15" // Enforce maximum length
                          className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                          value={Promo_code}
                          onChange={handlePromoCodeChange}
                        />
                      </div>
                      <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                        <div className="2xl:w-[388px] w-full">
                          <form onSubmit={handleSubmit}>
                            <label className="checkoutlable">
                              Delivery date*
                              <span className="text-[#DB1414]">*</span>
                            </label>
                            <input
                              type="date"
                              name="deliveryDate"
                              placeholder="Enter"
                              className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                              min={today}
                              value={deliveryDate}
                              onChange={handleDateChange}
                              required
                            />
                          </form>
                        </div>
                        <div className="pop-chef flex items-end">
                          Order will arrive on day selected between 8am and 6pm
                        </div>
                      </div>
                      <div className="2xl:my-[30px] xl:my-[20px] my-[15px]">
                        <label className="seven_p2 text-[#555555]">
                          Delivery instruction
                        </label>
                        <input
                          type="text"
                          name="deliveryInstruction"
                          placeholder="Enter"
                          className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                          value={Delivery_instruction}
                          onChange={handleDeliveryInstructionChange}
                        />
                      </div>
                      <div className="2xl:my-[30px] xl:my-[20px] my-[15px]">
                        <label className="seven_p2 text-[#555555]">
                          Delivery instruction
                        </label>
                        <p className="fourth_p text-[#555555]">
                          Your personal data only be used to process your order
                          and support your experience. We do not sell or rent
                          your data. See our{" "}
                          <span className="text-[#FF0000] underline">
                            {" "}
                            privacy policy
                          </span>
                        </p>
                      </div>
                      <div className="form-control flex flex-row gap-5 items-center 2xl:mt-[30px] xl:mt-[20px] mt-[15px]">
                        <label className="label cursor-pointer w-[15px] h-[15px]">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="checkbox checkbox-info rounded-none w-[20px] h-[20px]"
                          />
                        </label>
                        <span className="seven_p2 text-[#555555]">
                          I have read and agree to the website
                          <span className="text-[#FF0000] underline">
                            {" "}
                            terms and conditions*
                          </span>
                        </span>
                      </div>
                      <button
                        onClick={handleSubmit}
                        className=" flex justify-center 2xl:gap-3 xl:gap-2 gap-1 items-center w-full alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] text-[20px] leading-[27.6px] px-3 py-1 2xl:h-[45px] xl:h-[30px] lg:h-[20px] 2xl:mt-[60px] xl:mt-[40px] mt-[30px] "
                      >
                        <Image src={order} className="" />
                        Place Order
                      </button>
                      <div className="flex justify-between items-center mt-20">
                        <div>
                          <h4 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[12px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                            {/* {subtotalPrice} */}
                          </h4>
                        </div>
                        <div>
                          {/* <button className=" alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[164px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] lg:text-[10px] xl:px-6 xl:py-[10px] lg:px-3 lg:py-1 px-3 py-1 ">
Checkout
</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Checkout;
