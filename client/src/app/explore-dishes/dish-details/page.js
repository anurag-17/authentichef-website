"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementCartItemQuantity,
  decrementQuantity,
  removeItemFromCart,
  clearCart,
} from "@/app/redux/dishSlice";
import config from "@/config";
import Link from "next/navigation";
import googlee from "@/app/assets/google.svg";
import fb from "@/app/assets/fb.svg";
import { MinusIcon } from "@/app/user/svg/MinusIcon";
import PlusIcon from "@/app/user/svg/PlusIcon";
import DeleteIcon from "@/app/user/svg/DeleteIcon";

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
      const currentItem = getCartItems.find(item => item._id === getADish._id);
      setCount(currentItem?.quantity || 1);
    }
  }, [getCartItems, getADish]);

  const handleDrawerOpen = () => {
    document.getElementById("my-drawer-4").showModal()
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
          quantity: count, // Use the current count as the initial quantity
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
                <h1 className="pop-head capitalize">{getADish?.name}</h1>
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
                  <div className="flex justify-center border-[#111111] border mt-1">
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
                    <button
                      onClick={() => {
                        if (token) {
                          handleAddCart(getADish?._id);
                        } else {
                          handleLoginClick();
                        }
                      }}
                      className="pop-btn w-full"
                    >
                      <div className="drawer-content">
                        <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
                          Add to basket
                        </label>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleLoginClick();
                      }}
                      className="pop-btn w-full"
                    >
                      <div className="w-[100%]">
                        <button className="">
                          <div className="drawer-content">
                            <label
                              htmlFor="my-drawer-4"
                              className="drawer-button cursor-pointer"
                            >
                              Add to basket
                            </label>
                          </div>
                        </button>
                      </div>
                    </button>
                  )}
                  {addToCartSuccess && (
                    <div className="mt-2 text-green-600">
                      Items added to cart successfully!
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



    </>
  );
};

export default DishDetails;
