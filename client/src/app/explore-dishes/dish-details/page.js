"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementCartItemQuantity,
  decrementQuantity,
  removeItemFromCart,
  clearCart,
} from "@/app/redux/dishSlice";
import config from "@/config";
import googlee from "@/app/assets/google.svg";
import fb from "@/app/assets/fb.svg";
import { MinusIcon } from "@/app/user/svg/MinusIcon";
import PlusIcon from "@/app/user/svg/PlusIcon";
import DeleteIcon from "@/app/user/svg/DeleteIcon";
import { ToastContainer, toast } from "react-toastify";

const DishDetails = ({ closeModal, dishID, defaultADish }) => {
  const { token } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [getADish, setGetADish] = useState("");
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [cartId, setCartId] = useState("");
  const [getCartItems, setGetCartItems] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itemId, setItemId] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  const { cart } = useSelector((state) => state?.userCart);

  useEffect(() => {
    defaultDish();
  }, []);

  useEffect(() => {
    defaultCartItems();
  }, [isRefresh]);

  const defaultDish = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/menu/menuItems/${dishID}`,
    };
    axios
      .request(option)
      .then((response) => {
        setGetADish(response?.data);
        console.log(response?.data, "data");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setShouldRefresh(true);
  };

  const updateCartItemQuantity = async (cartId, menuId, quantity) => {
    try {
      const response = await axios.put(
        `${config.baseURL}/api/Orders/updateItem/${menuId}`,
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

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
    setShouldRefresh(true);
  };

  useEffect(() => {
    if (getCartItems && getCartItems.length > 0) {
      const currentItem = getCartItems.find(
        (item) => item._id === getADish._id
      );
      setCount(currentItem?.quantity || 1);
    }
  }, [getCartItems, getADish]);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleLoginClick = () => {
    document.getElementById("my_modal_2").showModal();
  };

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
      .then(async (response) => {
        refreshData();
        const userCart = response?.data?.userCart;
        const cartItems = userCart?.items.map((item) => ({
          ...item,
          totalPrice: item.menuItem.price * item.quantity,
        }));
        setSubtotalPrice(
          cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
        );
        setGetCartItems(cartItems);
        setUpdatedCartItems(cartItems);
        setCartId(userCart._id);
        for (const item of cartItems) {
          await updateCartItemQuantity(
            userCart._id,
            item.menuItem._id,
            item.quantity
          );
        }
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  useEffect(() => {
    if (shouldRefresh) {
      getCartItems.forEach((item) => {
        updateCartItemQuantity(cartId, item.menuItem._id, item.quantity);
      });

      const newSubtotalPrice = getCartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      setSubtotalPrice(newSubtotalPrice);
      setShouldRefresh(false);
    }
  }, [shouldRefresh, cartId, getCartItems]);

  useEffect(() => {
    console.log("Updated Cart Items:", updatedCartItems);
  }, [updatedCartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.baseURL}/api/auth/login`,
        loginDetail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res?.data?.success) {
        toast.success("Login successfully!");
        dispatch(setToken(res?.data?.token));
        dispatch(setUser(res?.data?.user));
        dispatch(setSuccess(res?.data?.success));
        refreshData();
        handleClose();
        setLoading(false);
        setIsLoggedIn(true);
        router.push("/");
      } else {
        toast.error("Login failed please try later!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const InputHandler = (e) => {
    setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    const modal = document.getElementById("my_modal_2");
    modal.close();
  };

  const handleGoogleOAuth = () => {
    setOauthInitiated(true);
    window.location.href = `https://server-backend-gamma.vercel.app/Google_OAuth/google`;
  };
  const [google, setGoogle] = useState("");

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleTokenLogin = async (tokenFromUrl) => {
    try {
      const response = await axios.get(
        `http://13.43.174.21:4000/api/auth/verifyUserToken/${tokenFromUrl}`,
        {}
      );

      if (response.status === 200) {
        setGoogle(response.data);
        dispatch(setToken(tokenFromUrl));
        dispatch(setUser(response.data.data));
        dispatch(setSuccess(true));
        localStorage.setItem("authToken", tokenFromUrl);
        dispatch(setUserDetail(data.user));
        router.push("/");
      } else {
        toast.error("Token verification failed");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  };

  const handleAddCart = async (id) => {
    try {
      let ids = Array.isArray(id) ? id : [id];
      let payload = {
        items: ids.map((id) => ({
          menuItem: id,
          quantity: count,
        })),
      };
      if (!token) {
        toast.error("You need to be logged in to add items to the cart.");
        return;
      }
      const response = await axios.post(
        `${config.baseURL}/api/Orders/AddtoCart`,
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Items added to cart successfully");
        refreshData();
        handleDrawerOpen();
        setIsDrawerOpen(true);
        setAddToCartSuccess(true);
        setTimeout(() => setAddToCartSuccess(false), 3000);
      } else {
        toast.error("Failed to add items to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding items to cart:", error);
    }
  };

  return (
    <>
      <section>
        <ToastContainer className="" autoClose={1000} />
        <div className="flex justify-end 2xl:py-[20px] xl:py-[10px] py-[10px] 2xl:px-[10px] xl:px-[7px] px-[5px]">
          <button onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="  lg:w-8 lg:h-8 w-[30px] h-[30px]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div>
          <div className="sm:flex 2xl:gap-[60px] xl:gap-[40px] lg:gap-[20px] gap-[10px] justify-between 2xl:px-[40px] xl:px-[25px] px-[15px]   ">
            <div className="2xl:w-[459px] xl:w-[280px] w-full md:w-1/2 ">
              <img
                src={getADish?.ProfileImage}
                className="rounded-[15px] object-cover 2xl:w-[459px] 2xl:h-[339px] xl:w-[280px] xl:h-[200px] w-[100%]"
              />
            </div>
            <div className="2xl:w-[400px] xl:w-[359px] sm:w-[300px] md:w-1/2">
              <div className="my-4">
                <h1 className="pop-head capitalize ">{getADish?.name}</h1>
                <p className="pop-chef">by Chef {getADish?.chef_id?.name}</p>
              </div>
              <div className="flex flex-wrap gap-2  font-[600] my-3">
                <p className="">
                  Price: £{getADish?.price && `${getADish.price.toFixed(2)}`}
                </p>
                |<p className=""> {getADish?.weight}g</p> |
                <p className="">Serves {getADish?.portion_Size}</p>
              </div>
              <div className="flex flex-wrap 2xl:gap-[10px] xl:gap-[8px] gap-[6px]  2xl:my-[15px] xl:my-[12px] my-[8px]">
                {getADish?.Dietary_id?.title ? (
                  <div className="pop">
                    <img
                      src={getADish?.Dietary_id?.ProfileImage}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    />
                    <p>{getADish?.Dietary_id?.title}</p>
                  </div>
                ) : (
                  ""
                )}

                <button className="four_btnn border capitalize font-[500]">
                  <img
                    src={getADish?.spice_level_id?.ProfileImage}
                    className="2xl:[100%] h-auto "
                  />
                  <h3>{getADish?.spice_level_id?.title}</h3>
                </button>

                {getADish?.Nutrition_id &&
                  getADish?.Nutrition_id.length > 0 && (
                    <div className="four_btn flex flex-wrap">
                      {getADish.Nutrition_id.map((nutrition, index) => (
                        <span key={index} className="fourth_day capitalize">
                          {index > 0 && " | "} {nutrition.Nutritional}
                        </span>
                      ))}
                    </div>
                  )}
              </div>

              <div className="flex justify-between ">
                <div className="flex gap-1 md:gap-2 items-center">
                  <div className="flex justify-center border-[#111111] border mt-[23px]">
                    <button
                      className="text-[#111111] px-[10px] py-[5px]"
                      onClick={() => handleDecrement(getADish._id)}
                    >
                      <MinusIcon />
                    </button>

                    <p className="px-[5px] py-[5px] flex mx-auto items-center 2xl:text-[16px] md:text-[14px] text-[13px] 2xl:leading-[22px]">
                      {count}
                    </p>
                    <button
                      className="text-[#111111] px-[10px] py-[5px]"
                      onClick={() => handleIncrement(getADish._id)}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>

                {/* <div className="w-[70%]">
                  <button
                    onClick={() => {
                      if (token) {
                        // If user is logged in, dispatch the addItemToCart action
                        const itemToAdd = {
                          data: getADish,
                          quantity: 1, // Assuming quantity is initially set to 1
                        };
                        dispatch(addItemToCart(itemToAdd)); // Dispatch the action
                        setItemId(getADish?._id);
                        handleAddCart(getADish?._id);
                      } else {
                        // If user is not logged in, update the quantity in local storage
                        const updatedDish = {
                          ...getADish,
                          quantity: (getADish.quantity || 0) + 1,
                        };
                        localStorage.setItem(
                          getADish._id,
                          JSON.stringify(updatedDish)
                        );
                      }
                    }}
                    className="pop-btn w-full"
                  >
                    <div className="drawer-content">
                      <label
                        htmlFor="my-drawer-4"
                        className="drawer-button cursor-pointer"
                      >
                        Add to basket
                      </label>
                    </div>
                  </button>
                </div> */}

                <div className="w-[70%]">
                  {token ? (
                    getADish?.stocks > 0 ? (
                      <button
                        onClick={() => {
                          handleAddCart(getADish?._id);
                        }}
                        className="pop-btn w-full"
                      >
                        <div className="drawer-content">
                          <label
                            htmlFor="my-drawer-4"
                            className="drawer-button cursor-pointer"
                          >
                            Add to basket
                          </label>
                        </div>
                      </button>
                    ) : (
                      <div className="mt-4 text-red-600 text-lg">
                        Item is out of stock
                      </div>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        handleLoginClick();
                      }}
                      className="pop-btn w-full"
                    >
                      <div className="w-[100%]">
                        <div className="drawer-content">
                          <label
                            htmlFor="my-drawer-4"
                            className="drawer-button cursor-pointer"
                          >
                            Add to basket
                          </label>
                        </div>
                      </div>
                    </button>
                  )}
                  {addToCartSuccess && (
                    <div className="mt-4 text-green-600 text-lg">
                      Item added to cart successfully!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="2xl:px-[40px] xl:px-[25px] px-[15px] ">
            <div className="2xl:my-[15px] xl:my-[10px] my-[8px]">
              <div className="">
                <p className="fourth_p text-[#555555] alata">Description</p>{" "}
                <p className="fourth_p 2xl:w-[890px] xl:w-[660px] sm:w-[550px]">
                  {/* {getADish?.description} */}
                  {getADish?.description && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getADish?.description,
                      }}
                      className="alata"
                    />
                  )}
                </p>
              </div>
            </div>
            <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
              <div className="">
                <div>
                  <p className="fourth_p text-[#555555] alata">
                    Main Ingredients
                  </p>{" "}
                  <p className="alata fourth_p ">
                    {/* {getADish?.Ingredients} */}
                    {getADish?.Ingredients && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: getADish?.Ingredients,
                        }}
                        className="alata"
                      />
                    )}
                  </p>
                </div>
                <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
                  <p className="fourth_p text-[#555555] alata">
                    List of Allergens
                  </p>{" "}
                  <p className="alata fourth_p ">
                    {/* {getADish?.List_of_Allergens} */}
                    {getADish?.List_of_Allergens && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: getADish?.List_of_Allergens,
                        }}
                        className="alata"
                      />
                    )}
                  </p>
                </div>
                <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
                  <p className="alata fourth_p text-[#555555]">
                    Heating instructions
                  </p>{" "}
                  <p className="fourth_p ">
                    {/* {getADish?.Heating_Instruction} */}
                    {getADish?.Heating_Instruction && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: getADish?.Heating_Instruction,
                        }}
                        className="alata"
                      />
                    )}
                  </p>
                </div>
                <div>
                  <p className="alata fourth_p text-[#555555]">
                    Nutritional Information:
                  </p>
                  {getADish?.nutritional_information && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getADish?.nutritional_information,
                      }}
                      className="alata"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="z-50 drawer drawer-end">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={() => {}}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={handleDrawerClose}
          ></label>
          <ul className="min-h-full text-base-content max-w-[310px] sm:max-w-[350px] md:w-[400px] md:max-w-[400px] 2xl:w-[450px] 2xl:max-w-[450px] bg-white">
            <div className="flex flex-col justify-center items-center p-[15px] md:p-[20px] h-[100vh]">
              {!cart || getCartItems.length === 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <h4 className="alata font-[400] text-[#111] text-[24px] mb-[1rem]">
                    Your Basket is empty!
                  </h4>
                  <h4 className="alata font-[400] text-[#111] lg:text-[18px]">
                    Explore a World of Deliciousness
                  </h4>
                  <p className="alata font-[400] text-[#111] lg:text-[16px] text-[15px] text-center">
                    Add dishes to your cart now.
                  </p>
                  <div className="flex 2xl:mt-12 xl:mt-6 lg:mt-5 mt-4">
                    <Link href="/explore-dishes">
                      <button
                        onClick={handleDrawerClose}
                        className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[221px] 2xl:h-[56px] xl:text-[20px] md:text-[16px] text-[15px] px-6 py-3"
                      >
                        Explore Dishes
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full flex justify-between items-center">
                    <h4 className="alata font-[500] text-[#111111] 2xl:text-[25px] sm:text-[20px] text-[18px] 2xl:leading-[32px] md:text-[25px] leading-[24px] ">
                      My Basket
                    </h4>
                    <div onClick={handleDrawerClose} className="cursor-pointer">
                      <CloseIcon />
                    </div>
                  </div>

                  <div className="pt-[2rem] flex-1 overflow-auto w-full">
                    <div className="flex justify-between">
                      <h4 className="alata font-[400] text-[#111] my-0 md:text-[18px] text-[16px] leading-[25px]">
                        Items
                      </h4>
                      <h4 className="alata font-[400] text-[#111] my-0 md:text-[18px] text-[16px] leading-[25px]">
                        Total
                      </h4>
                    </div>
                    <div className="pt-[1rem]">
                      {updatedCart?.map((item, index) => {
                        const { data } = item;
                        const itemSubtotal = data.price * item.quantity;
                        const subTotal = data.price;
                        return (
                          <div
                            key={index}
                            className="my-5 flex w-full border rounded-md"
                          >
                            <div className="flex gap-2 md:gap-4 w-full">
                              <div className="w-[45%] md:w-auto">
                                <img
                                  src={data.ProfileImage}
                                  alt={data.name}
                                  className="md:w-[100px] h-[97px] object-cover w-[100%]"
                                />
                              </div>

                              <div className="flex flex-col justify-between">
                                <div className="flex flex-col">
                                  <p className="alata font-[400] text-[#111111] my-0 text-[13px] sm:text-[14px] xl:text-[15px] leading-[22px] text-ellipsis whitespace-nowrap overflow-hidden max-w-[100px]">
                                    {data.name}
                                  </p>
                                  <p className="alata font-[400] text-[#111111] my-0 md:text-[14px] text-[13px] xl:text-[15px] leading-[20px]">
                                    Price: £{data.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="flex gap-1 md:gap-2 items-center">
                                  <div className="flex justify-center border-[#111111] border mt-1">
                                    <button
                                      className="text-[#111111] px-[10px] py-[5px]"
                                      onClick={() =>
                                        handleQuantityDecrement(item.data._id)
                                      }
                                    >
                                      <MinusIcon />
                                    </button>
                                    <p className="px-[5px] py-[5px] flex mx-auto items-center 2xl:text-[16px] md:text-[14px] text-[13px] 2xl:leading-[22px]">
                                      {item.quantity}
                                    </p>
                                    <button
                                      className="text-[#111111] px-[10px] py-[5px]"
                                      onClick={() =>
                                        handleQuantityIncrement(item.data._id)
                                      }
                                    >
                                      <PlusIcon />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between">
                              <p className="alata font-[600] 2xl:my-0 text-[13px] sm:text-[14px] xl:leading-[28px] text-right">
                                £{itemSubtotal.toFixed(2)}
                              </p>
                              <button
                                className="text-center mx-auto"
                                onClick={() => handleItemRemove1(item.data._id)}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {Array.isArray(getCartItems) &&
                        getCartItems.map((item, index) => {
                          const itemSubtotal =
                            item.menuItem.price * item.quantity;
                          return (
                            <div
                              key={index}
                              className="mt-3 md:mt-0 md:my-5 flex w-full gap-1 md:gap-6"
                            >
                              <div className="flex gap-2 md:gap-4 w-full">
                                <div className="w-[45%] md:w-auto">
                                  <img
                                    src={item.menuItem.ProfileImage}
                                    alt={item.menuItem.name}
                                    className="md:w-[100px] h-[97px] object-cover w-[100%]"
                                  />
                                </div>

                                <div className="flex flex-col justify-between">
                                  <div className="flex flex-col">
                                    <p className="alata font-[400] text-[#111111] my-0 text-[13px] sm:text-[14px] xl:text-[15px] leading-[22px] text-ellipsis whitespace-nowrap overflow-hidden max-w-[100px]">
                                      {item.menuItem.name}
                                    </p>
                                    <p className="alata font-[400] text-[#111111] my-0 md:text-[14px] text-[13px] xl:text-[15px] leading-[20px]">
                                      Price: £{item.menuItem.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="flex gap-1 md:gap-2 items-center">
                                    <div className="flex justify-center border-[#111111] border mt-1">
                                      <button
                                        className="text-[#111111] px-[10px] py-[5px]"
                                        onClick={() =>
                                          handleDecrement(item._id)
                                        }
                                      >
                                        <MinusIcon />
                                      </button>
                                      <p className="px-[5px] py-[5px] flex mx-auto items-center 2xl:text-[16px] md:text-[14px] text-[13px] 2xl:leading-[22px]">
                                        {item.quantity}
                                      </p>
                                      <button
                                        className="text-[#111111] px-[10px] py-[5px]"
                                        onClick={() =>
                                          handleIncrement(item._id)
                                        }
                                      >
                                        <PlusIcon />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col justify-between">
                                <p className="alata font-[600] 2xl:my-0 text-[13px] sm:text-[14px] xl:leading-[28px] text-right">
                                  £{itemSubtotal.toFixed(2)}
                                </p>
                                <button
                                  className="text-center mx-auto"
                                  onClick={() =>
                                    token
                                      ? handleRemoveItem(item.menuItem._id)
                                      : ""
                                  }
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-center w-full pt-[1.5rem]">
                    {token ? (
                      <div className="w-full">
                        <div className="flex justify-between">
                          <h4 className="alata font-[400] 2xl:my-0 xl:text-[18px] 2xl:leading-[28px] text-[16px] lg:leading-[24px]">
                            Subtotal:
                          </h4>
                          <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                            £{subtotalPrice.toFixed(2)}
                          </h4>
                        </div>
                        <Link href="/checkout">
                          <button
                            onClick={() => {
                              handleAddCart();
                            }}
                            className="alata font-[400] bg-[#DB5353] text-white mx-auto 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[15px] lg:text-[14px] w-full py-2 lg:h-[47px] h-[42px] flex flex-col items-center justify-center"
                          >
                            Checkout
                          </button>
                        </Link>
                        <p className="font-[500] text-[16px] py-[5px]">
                          Minimum order value must be £30.
                        </p>
                        <p className="font-[500] text-[16px] py-[5px]">
                          FREE delivery on orders over £55
                        </p>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="flex justify-between">
                          <h4 className="alata font-[400] 2xl:my-0 xl:text-[18px] 2xl:leading-[28px] text-[16px] lg:leading-[24px]">
                            Subtotal:
                          </h4>
                          <h4 className="alata font-[400] 2xl:my-0 2xl:text-[18px] 2xl:leading-[28px] xl:text-[14px] xl:leading-[20px] lg:text-[10px] lg:leading-[18px]">
                            £{subtotalPrice.toFixed(2)}
                          </h4>
                        </div>
                        <button
                          onClick={handleLoginClick}
                          className="alata font-[400] bg-[#DB5353] text-white mx-auto 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[15px] text-[14px] w-full py-2 lg:h-[47px] flex flex-col items-center justify-center"
                        >
                          Checkout
                        </button>
                        <p className="font-[500] text-[16px] py-[5px]">
                          Minimum order value must be £30.
                        </p>
                        <p className="font-[500] text-[16px] py-[5px]">
                          FREE delivery on orders over £55
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default DishDetails;
