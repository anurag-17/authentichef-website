"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const Checkout = () => {
  const { token } = useSelector((state) => state?.auth);
  const { cart } = useSelector((state) => state?.userCart);
  const { user } = useSelector((state) => state?.auth);
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefresh, setRefresh] = useState(false);
  const refreshData = () => {
    setRefresh(!isRefresh);
  };
  const [Promo_code, setPromoCode] = useState("");
  const [isSameAsShippingAddress, setIsSameAsShippingAddress] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState({
    phone: "",
    houseNo: "",
    buildingName: " ",
    streetName: " ",
    City: " ",
    country: " ",
    FirstName: "",
    LastName: "",
    Postcode: "",
  });
  const [billingInfo, setBillingInfo] = useState({
    phone: "",
    houseNo: "",
    buildingName: "",
    streetName: "",
    City: "",
    country: "",
    FirstName: "",
    LastName: "",
    Postcode: "",
  });

  const [deliveryDate, setDeliveryDate] = useState("");
  const [Delivery_instruction, setDeliveryInstruction] = useState("");
  const [getCartItems, setGetCartItems] = useState([]);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [discountInfo, setDiscountInfo] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const shippingThreshold = 55;
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [sessionId, setSessionId] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (e, setInfo, updateBilling = false) => {
    const { name, value } = e.target;
    let newValue = value;

    if (
      name === "FirstName" ||
      name === "LastName" ||
      name === "City" ||
      name === "country"
    ) {
      newValue = value.replace(/[^A-Za-z\s]/g, "").slice(0, 100);
    }

    if (name === "Postcode") {
      newValue = value.replace(/[^A-Z0-9]/g, "").slice(0, 8);
    }

    if (name === "phone") {
      newValue = value.replace(/[^0-9]/g, "").slice(0, 15);
    }

    setInfo((prevState) => {
      const newState = {
        ...prevState,
        [name]: newValue,
      };
      if (updateBilling && isSameAsShippingAddress) {
        setBillingInfo(newState);
      }
      return newState;
    });
  };

  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subtotalPrice < 30) {
      toast.info("Minimum order value must be $30 or more.");
      return;
    }

    const requiredFields = [
      { value: deliveryInfo.phone, name: "Mobile Number" },
      { value: deliveryInfo.houseNo, name: "House No." },
      { value: deliveryInfo.streetName, name: "Street Name" },
      { value: deliveryInfo.City, name: "Town/City" },
      { value: deliveryInfo.country, name: "County" },
      { value: deliveryInfo.Postcode, name: "Postcode" },
      { value: deliveryInfo.FirstName, name: "First Name" },
      { value: deliveryInfo.LastName, name: "Last Name" },
      {
        value: billingInfo.houseNo,
        name: "Billing House No.",
        required: !isSameAsShippingAddress,
      },
      {
        value: billingInfo.streetName,
        name: "Billing Street Name",
        required: !isSameAsShippingAddress,
      },
      {
        value: billingInfo.City,
        name: "Billing Town/City",
        required: !isSameAsShippingAddress,
      },
      {
        value: billingInfo.country,
        name: "Billing County",
        required: !isSameAsShippingAddress,
      },
      {
        value: billingInfo.Postcode,
        name: "Billing Postcode",
        required: !isSameAsShippingAddress,
      },
      {
        value: billingInfo.FirstName,
        name: "Billing First Name",
        required: !isSameAsShippingAddress,
      },
      {
        value: billingInfo.LastName,
        name: "Billing Last Name",
        required: !isSameAsShippingAddress,
      },
    ];

    let allFieldsValid = true;

    requiredFields.forEach((field) => {
      if (field.required !== false && !field.value) {
        toast.error(`${field.name} is required.`);
        allFieldsValid = false;
      }
    });

    if (!deliveryDate) {
      toast.error("Delivery date is required.");
      allFieldsValid = false;
    }

    if (!allFieldsValid) {
      return;
    }

    console.log(
      "Submitting order with the following cart items:",
      updatedCartItems.length ? updatedCartItems : getCartItems
    );

    try {
      const response = await axios.post(
        `${config.baseURL}/api/order/createOrder`,
        {
          deliveryInfo: [deliveryInfo],
          billingInfo: [billingInfo],
          deliveryDate,
          Promo_code,
          Delivery_instruction,
          cartItems: updatedCartItems.length ? updatedCartItems : getCartItems,
          payment_method_types: paymentMethod,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Order Placed");

        if (paymentMethod === "card") {
          const { sessionId, sessionUrl } = response.data;
          window.location.href = sessionUrl; // Redirect to Stripe payment page
        } else {
          router.push("/explore-dishes");
        }
      } else {
        toast.error(response.data.message || "Order Failed");
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      toast.error("Order Failed");
      console.log("Error:", error);
    }
  };

  // This function should be called once the Stripe payment is successful
  const pollForSessionId = async () => {
    const pollInterval = 5000; // Poll every 5 seconds
    const maxAttempts = 40; // Stop polling after 20 attempts (or adjust as needed)

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const sessionIdResponse = await axios.get(
          "http://13.43.174.21:4000/api/order/getSessionId",
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (sessionIdResponse.status >= 200 && sessionIdResponse.status < 300) {
          const { sessionId, successUrl } = sessionIdResponse.data.success;
          console.log("Session ID:", sessionId);

          // Send the session ID to the second API
          try {
            const bookOrderResponse = await axios.post(
              "http://localhost:4000/api/order/bookOrder",
              {
                sessionId,
              },
              {
                headers: {
                  authorization: token,
                },
              }
            );

            if (
              bookOrderResponse.status >= 200 &&
              bookOrderResponse.status < 300
            ) {
              console.log("Session ID sent successfully");
              // Redirect to success URL
              window.location.href = successUrl.replace(
                "{CHECKOUT_SESSION_ID}",
                sessionId
              );
              return; // Stop polling once successful
            } else {
              console.error(
                "Failed to send session ID",
                bookOrderResponse.data.message
              );
            }
          } catch (error) {
            console.error("Error sending session ID:", error);
          }
        } else {
          console.log("Session ID not available yet, retrying...");
        }
      } catch (error) {
        console.error("Error getting session ID:", error);
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval)); // Wait for the poll interval before retrying
    }

    toast.error("Failed to get session ID after multiple attempts.");
  };

  const handleStripePaymentSuccess = async () => {
    pollForSessionId();
  };

  console.log("Session ID:", sessionId);

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
        const userCart = response?.data?.userCart;

        const cartItems = userCart?.items.map((item) => ({
          ...item,
          totalPrice: item.menuItem.price * item.quantity,
        }));
        setGetCartItems(cartItems);
        setUpdatedCartItems(cartItems); // Initializing updatedCartItems with fetched data
        setSubtotalPrice(
          cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
        );
        setShippingCost(userCart.Shipping_cost ?? 0); // Set the shipping cost
        setCartId(userCart._id); // Set the cart ID
        console.log(response?.data, "data");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    const dayOfWeek = inputDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Valid date, update delivery date
      const today = new Date();
      const selectedDate = new Date(e.target.value);

      // Check if the selected date is today
      if (
        selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear()
      ) {
        // If the selected date is today, set the delivery date to 48 hours (2 days) later
        const deliveryDate = new Date(today.getTime() + 48 * 60 * 60 * 1000); // 48 hours in milliseconds
        setDeliveryDate(deliveryDate.toISOString().split("T")[0]); // Set only the date part
      } else {
        // If the selected date is not today, use the selected date as the delivery date
        setDeliveryDate(e.target.value);
      }

      // Generate delivery message
      const orderDay = inputDate.getDay();
      const currentHour = new Date().getHours();
      // const deliveryDay = getDeliveryDay(orderDay, currentHour);
    } else {
      // Invalid date (weekend), reset the input
      e.target.value = "";
      setDeliveryDate("");
      setDeliveryMessage("");
      toast.info("Delivery is not available on Saturday and Sunday");
    }
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleDeliveryInstructionChange = (e) => {
    setDeliveryInstruction(e.target.value);
  };

  useEffect(() => {
    if (isSameAsShippingAddress) {
      setBillingInfo(deliveryInfo);
    } else {
      setBillingInfo({
        phone: "",
        houseNo: "",
        buildingName: "",
        streetName: "",
        City: "",
        country: "",
        FirstName: "",
        LastName: "",
        Postcode: "",
      });
    }
  }, [isSameAsShippingAddress, deliveryInfo]);

  useEffect(() => {
    defaultCartItems();
  }, [isRefresh]);

  useEffect(() => {
    if (getCartItems) {
      const newSubtotal = getCartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      setSubtotalPrice(newSubtotal);
    }
  }, [getCartItems]);


  const updateCartItemQuantity = async (cartId, menuId, quantity) => {
    try {
      const response = await axios.put(
        `${config.baseURL}/api/Orders/updateCartItem/${cartId}/${menuId}`,
        { quantity },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("Cart item updated successfully");
      } else {
        console.log("Failed to update cart item", response.data.message);
      }
    } catch (error) {
      console.log("Error updating cart item:", error);
    }
  };

  const handleIncrement = (itemId) => {
    setGetCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.menuItem.price * (item.quantity + 1),
            }
          : item
      )
    );

    setUpdatedCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.menuItem.price * (item.quantity + 1),
            }
          : item
      )
    );

    const item = getCartItems.find((item) => item._id === itemId);
    updateCartItemQuantity(cartId, item.menuItem._id, item.quantity + 1);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleDecrement = (itemId) => {
    setGetCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.menuItem.price * (item.quantity - 1),
            }
          : item
      )
    );

    setUpdatedCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.menuItem.price * (item.quantity - 1),
            }
          : item
      )
    );

    const item = getCartItems.find((item) => item._id === itemId);
    if (item.quantity > 1) {
      updateCartItemQuantity(cartId, item.menuItem._id, item.quantity - 1);
      setRefreshKey((prevKey) => prevKey + 1);

    }
  };

  useEffect(() => {
    console.log("Updated Cart Items:", updatedCartItems);
  }, [updatedCartItems]);

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    // Limit the input to 15 characters
    if (inputValue.length <= 15) {
      setPhone(inputValue);
    }
  };

  const [Postcode, setPostData] = useState("");

  const handlePostChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 8) {
      setPostData(inputValue);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const applyPromoCode = async () => {
    try {
      const response = await axios.get(
        `${config.baseURL}/api/order/checkDiscount?Promo_code=${Promo_code}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        setDiscountInfo(data);
        toast.success(data.message);
      } else {
        toast.error("Failed to apply discount.");
      }
    } catch (error) {
      toast.error("Failed to apply discount.");
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (subtotalPrice >= shippingThreshold) {
      // Order meets the free delivery threshold
      setRefresh(true);
    } else {
      setRefresh(false);
    }
  }, [subtotalPrice]);

  const defaultUser = async () => {
    try {
      const response = await axios.post(
        `${config.baseURL}/api/auth/getUserById`,
        { _id: user._id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const userData = response.data.user;
        console.log("User data from API:", userData);

        // Check if deliveryInfo is an array and has at least one item
        if (
          Array.isArray(userData.deliveryInfo) &&
          userData.deliveryInfo.length > 0
        ) {
          const defaultDeliveryInfo = userData.deliveryInfo[0];
          setDeliveryInfo((prevState) => ({
            ...prevState,
            FirstName: userData.firstname || "",
            LastName: userData.lastname || "",
            phone: defaultDeliveryInfo.phone || "",
            houseNo: defaultDeliveryInfo.houseNo || "",
            buildingName: defaultDeliveryInfo.buildingName || "",
            streetName: defaultDeliveryInfo.streetName || "",
            City: defaultDeliveryInfo.City || "",
            country: defaultDeliveryInfo.country || "",
            Postcode: defaultDeliveryInfo.Postcode || "",
          }));
        } else {
          // If no delivery info, set only firstname, lastname, and mobile
          setDeliveryInfo((prevState) => ({
            ...prevState,
            FirstName: userData.firstname || "",
            LastName: userData.lastname || "",
            phone: userData.mobile || "",
          }));
        }
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  useEffect(() => {
    defaultUser();
  }, []);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <section>
        <Navbar />
        <div className=" 2xl:pt-[116px] xl:pt-[80px] pt-[50px]">
          <div className="flex justify-center bg-[#F5F5F5] 2xl:h-[90px] xl:h-[60px] lg:h-[50px] sm:h-[45px] h-12">
            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] w-full px-10 md:px-0 flex 2xl:gap-[15px] xl:gap-[10px] gap-[5px] items-center">
              <Link href="/explore-dishes">
                <button className="flex items-center gap-1">
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
                  <p className="alata font-[400] text-[#828282] 2xl:text-[16px] 2xl:leading-[20px] xl:text-[12px] xl:leading-[18px] text-[10px] leading-[16px]">
                    Back to Chef’s Menu
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] w-full md:px-0 items-center 2xl:px-[75px] xl:px-[50px] lg:px-[0px] mx-auto ">
            <h4 className="pop-head 2xl:my-[30px] xl:my-[20px] my-[15px] text-center lg:text-start">
              Delivery information
            </h4>
            <div className=" 2xl:mb-[110px] xl:mb-[70px]">
              <div className="lg:mx-0 mx-auto 2xl:w-[795px] xl:w-[595px] lg:w-[450px] w-[90%] md:w-full lg:flex lg:justify-between 2xl:gap-[55px] xl:gap-[40px] gap-[25px]">
                <div>
                  <div>
                    <label className="checkoutlable">
                      Mobile Number <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      placeholder="Enter phone number"
                      type="text"
                      name="phone"
                      value={deliveryInfo.phone}
                      onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={15}
                      required
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
                        maxLength={200}
                        required
                      />
                    </div>
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">Building Name.</label>
                      <input
                        type="text"
                        name="buildingName"
                        placeholder="Enter"
                        value={deliveryInfo.buildingName}
                        onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                        maxLength={200}
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
                      maxLength={200}
                      required
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
                        maxLength={100}
                        required
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
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                      <label className="checkoutlable">
                        Postcode <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="text"
                        name="Postcode"
                        placeholder="Enter"
                        value={deliveryInfo.Postcode}
                        onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                        maxLength={8}
                        inputMode="numeric" // Prevent increase/decrease arrows on mobile
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield", // For Firefox
                          appearance: "none",
                          paddingRight: "16px", // Add some padding to compensate for hidden arrows
                        }}
                        required
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
                        maxLength={100}
                        required
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
                        maxLength={100}
                        required
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
                        checked={isSameAsShippingAddress}
                        onChange={(e) =>
                          setIsSameAsShippingAddress(e.target.checked)
                        }
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
                        disabled={isSameAsShippingAddress}
                      />
                    </label>
                    <span className="label-text alata font-[400] 2xl:text-[16px] 2xl:leading-[26px] xl:text-[12px] xl:leading-[18px] text-[10px] leading-[16px]">
                      Use a different billing address
                    </span>
                  </div>
                  <div>
                    <div className="my-[20px]">
                      <label className="checkoutlable ">
                        {isSameAsShippingAddress
                          ? "Shipping Address"
                          : "Billing Address"}{" "}
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
                        disabled={isSameAsShippingAddress}
                        maxLength={200}
                      />
                    </div>
                    <div className="2xl:w-[388px] w-full">
                      <label className="checkoutlable">Building Name.</label>
                      <input
                        type="text"
                        name="buildingName"
                        placeholder="Enter"
                        value={billingInfo.buildingName}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                        disabled={isSameAsShippingAddress}
                        maxLength={200}
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
                      disabled={isSameAsShippingAddress}
                      maxLength={200}
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
                        disabled={isSameAsShippingAddress}
                        maxLength={100}
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
                        disabled={isSameAsShippingAddress}
                        maxLength={100}
                      />
                    </div>
                    <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                      <label className="checkoutlable">
                        Postcode <span className="text-[#DB1414]">*</span>
                      </label>
                      <input
                        type="text"
                        name="Postcode"
                        placeholder="Enter"
                        value={billingInfo.Postcode}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                        disabled={isSameAsShippingAddress}
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
                        disabled={isSameAsShippingAddress}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        value={billingInfo.FirstName}
                        maxLength={100}
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
                        disabled={isSameAsShippingAddress}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        value={billingInfo.LastName}
                        maxLength={100}
                      />
                    </div>
                  </div>
                </div>
                {/* =========Right ============ */}
                <div className="mx-auto 2xl:w-[597px] xl:w-[395px] lg:w-[350px] md:w-full w-[100%] p-5 border 2xl:mt-[35px] mt-10 lg:mt-0">
                  <div className="">
                    <div className="max-h-[250px] overflow-y-scroll">
                      {Array.isArray(getCartItems) &&
                        getCartItems.map((item) => (
                          <div key={item._id}>
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
                                    £
                                    {item?.menuItem?.price &&
                                      `${item?.menuItem?.price.toFixed(2)}`}
                                  </h4>
                                </div>
                              </div>
                              <div className="flex justify-center 2xl:w-[103px] 2xl:h-[39px] xl:w-[60px] xl:h-[22px] lg:w-[50px] lg:h-[20px] border rounded-[5px]">
                                <button
                                  className="text-[#DB5353] rounded-l w-1/3"
                                  onClick={() => handleDecrement(item._id)}
                                >
                                  <Image
                                    src={minus}
                                    className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w/[8px] lg:h-[8px] mx-auto"
                                    alt="decrement"
                                  />
                                </button>
                                <p className="flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px] 2xl:leading-[28px]">
                                  {item.quantity}
                                </p>
                                <button
                                  className="text-[#DB5353] rounded-r w-1/3"
                                  onClick={() => handleIncrement(item._id)}
                                >
                                  <Image
                                    src={plus}
                                    className="2xl:w-[15px] 2xl:h-[15px] xl:w/[10px] xl:h/[10px] lg:w/[8px] lg:h-[8px] mx-auto"
                                    alt="increment"
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
                        £{subtotalPrice.toFixed(2)}
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
                        £{shippingCost.toFixed(2)}
                      </h4>
                    </div>

                    <div className="2xl:my-[30px] xl:my-[20px] my-[15px]">
                      <label className="seven_p2 text-[#555555]">
                        Promo code or Gift card
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name="promoCode"
                          placeholder="Promo Code"
                          maxLength="15" // Enforce maximum length
                          className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                          value={Promo_code}
                          onChange={handlePromoCodeChange}
                        />
                        <button
                          className="ml-2 bg-[#DB5353] alata text-white 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] px-4 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                          onClick={applyPromoCode}
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading/[20px] lg:text-[10px] lg:leading-[18px]">
                        Total
                      </h4>
                      <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading/[20px] lg:text-[10px] lg:leading/[18px]">
                        £
                        {discountInfo
                          ? (
                              discountInfo.totalAmountAfterDiscount +
                              shippingCost
                            ).toFixed(2)
                          : (subtotalPrice + shippingCost).toFixed(2)}
                      </h4>
                    </div>

                    <div className="2xl:my-[30px] xl:my-[20px] my-[15px]">
                      <label className="seven_p2 text-[#555555]">
                        Select Payment Method
                      </label>
                      <select
                        name="paymentMethod"
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <option value="COD">COD</option>
                        <option value="card">Online Payment</option>
                      </select>
                      <form onSubmit={handleSubmit}>
                        {/* form fields for delivery and billing info */}
                        <button type="submit">Submit Order</button>
                      </form>
                    </div>

                    <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my/[15px]">
                      <div className="2xl:w-[388px] w-full">
                        <form onSubmit={handleSubmit}>
                          <label className="checkoutlable">
                            Delivery date
                            <span className="text-[#DB1414]">*</span>
                          </label>
                          <input
                            type="date"
                            name="deliveryDate"
                            placeholder="Enter"
                            className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h/[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p/[10px] p-[8px] 2xl:mt/[10px] xl:mt/[5px] mt-[3px]"
                            min={today}
                            value={deliveryDate}
                            onChange={handleDateChange}
                            required
                          />
                          {/* {deliveryMessage && (
            <div className="text-[#555555] mt-2">{deliveryMessage}</div>
          )} */}
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
                        className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h/[40px] h/[30px] 2xl:text-[16px] xl:text/[12px] text/[9px] 2xl:p/[20px] xl:p/[10px] p/[8px] 2xl:mt/[10px] xl:mt/[5px] mt/[3px]"
                        value={Delivery_instruction}
                        onChange={handleDeliveryInstructionChange}
                      />
                    </div>
                    <div className="2xl:my/[30px] xl:my/[20px] my/[15px]">
                      <label className="seven_p2 text-[#555555]">
                        Delivery instruction
                      </label>
                      <p className="fourth_p text-[#555555]">
                        Your personal data only be used to process your order
                        and support your experience. We do not sell or rent your
                        data. See our{" "}
                        <Link href={"/privacy-policy"} target="_blank">
                          <span className="text-[#FF0000] underline">
                            privacy policy
                          </span>
                        </Link>
                      </p>
                    </div>
                    <div className="form-control flex flex-row gap-5 items-center 2xl:mt/[30px] xl:mt/[20px] mt/[15px]">
                      <label className="label cursor-pointer w/[15px] h/[15px]">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          className="checkbox checkbox-info rounded-none w/[20px] h/[20px]"
                          onChange={handleCheckboxChange}
                        />
                      </label>
                      <span className="seven_p2 text-[#555555]">
                        I have read and agree to the website
                        <Link href={"/term-condition"} target="_blank">
                          <span className="text-[#FF0000] underline">
                            terms and conditions*
                          </span>
                        </Link>
                      </span>
                    </div>
                    {subtotalPrice < 30 && (
                      <p className="text-red-500 text-[18px] text-center mb-2 pt-4">
                        Minimum order value must be $30 or more.
                      </p>
                    )}
                    <button
                      onClick={handleSubmit}
                      disabled={!isChecked || subtotalPrice < 30}
                      className={`flex justify-center 2xl:gap-3 xl:gap-2 gap-1 items-center w-full alata font-[400] ${
                        isChecked
                          ? "bg-[#DB5353] cursor-pointer"
                          : "bg-[#DB5353] opacity-50 cursor-not-allowed pointer-events-none"
                      } text-white mx-auto rounded-[5px] 2xl:text-[20px] xl:text-[14px] text-[10px] leading-[27.6px] px-3 py-1 2xl:h-[45px] xl:h-[30px] lg:h-[25px] 2xl:mt-[60px] xl:mt-[40px] mt-[30px]`}
                    >
                      <Image
                        src={order}
                        className="2xl:w-[30px] xl:w-[22px] lg:w-[18px] sm:w-[20px] w-[20px]"
                        alt="Place Order"
                      />
                      Place Order
                    </button>

                    <div className="flex justify-between items-center mt-20">
                      <div>
                        <h4 className="alata font-[400] text-[#111] 2xl:my-0 2xl:text/[18px] 2xl:leading/[28px] xl:text/[12px] xl:leading/[20px] lg:text/[10px] lg:leading/[18px]">
                          {/* {subtotalPrice} */}
                        </h4>
                      </div>
                      <div>
                        {/* <button className=" alata font/[400] bg-[#DB5353] text-white mx-auto rounded/[5px] 2xl:w/[164px] 2xl:h/[56px] 2xl:text/[20px] 2xl:leading/[27.6px] xl:text/[12px] lg:text/[10px] xl:px-6 xl:py/[10px] lg:px-3 lg:py-1 px-3 py-1 ">
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
        <Footer />
      </section>
    </>
  );
};

export default Checkout;
