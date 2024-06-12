// "nav"
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "./assets/logo.png";
import sidemanu from "../../public/images/side-menu.svg";
import google from "./assets/google.svg";
import fb from "./assets/fb.svg";
import profile from "./assets/profile.svg";
import sidelogo from "./assets/sidebar-logo.svg";
import aboutauthentichef from "./assets/about-authentichef.svg";
import beacomechef from "./assets/become-a-chef.svg";
import faq from "./assets/FAQ.svg";
import exploredish from "./assets/explore-dishes.svg";
import beg from "./assets/beg.svg";
import logout from "../app/assets/logout.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  setUser,
  removeUser,
  setToken,
  removeToken,
  setSuccess,
  removeSuccess,
} from "./redux/slice";
import { useDispatch, useSelector } from "react-redux";
import plus from "../../public/images/plus.svg";
import minus from "../../public/images/minus.svg";
import config from "@/config";
import CloseIcon from "./user/svg/CloseIcon";
import { MinusIcon } from "./user/svg/MinusIcon";
import PlusIcon from "./user/svg/PlusIcon";
import DeleteIcon from "./user/svg/DeleteIcon";
import useIdleTimeout from "./redux/useIdleTimeout";
import {
  incrementCartItemQuantity,
  decrementQuantity,
  removeItemFromCart,
  clearCart,
} from "@/app/redux/dishSlice"; // Import the action from the slice

const Navbar = () => {
  // useIdleTimeout();
  const [userDetail, setUserDetail] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const router = useRouter();
  const { token } = useSelector((state) => state?.auth);
  console.log(token, "tpken");
  const { user } = useSelector((state) => state?.auth);
  const { success } = useSelector((state) => state?.auth);
  const userDetails = user;
  const [isLoading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartId, setCartId] = useState("");
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/api/Orders/deleteCartItem/${itemId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Item Removed From Cart");

        setGetCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.menuItem._id !== itemId)
        );
        setShouldRefresh(true);
      } else {
        alert("Failed to remove item");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Server error");
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const inputHandlers = (e) => {
    const { name, value } = e.target;
    if (name === "firstname" || name === "lastname") {
      if (/^[A-Za-z]*$/.test(value) && value.length <= 100) {
        setUserDetail((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      }
    } else {
      setUserDetail((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    if (success !== undefined) {
      setIsLoggedIn(success);
    }
  }, [success]);

  useEffect(() => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get(
      "token"
    );
    if (tokenFromUrl) {
      handleTokenLogin(tokenFromUrl);
    } else {
      const tokenFromStorage = localStorage.getItem("authToken");
      if (tokenFromStorage) {
        handleTokenLogin(tokenFromStorage);
      }
    }
  }, []);

  const [tokenFromUrl, setTokenFromUrl] = useState("");

  const handleGetToken = () => {
    const tokenFromUrl = prompt("Enter the token:");
    if (tokenFromUrl) {
      setTokenFromUrl(tokenFromUrl);
      handleTokenLogin(tokenFromUrl);
    }
  };

  const handleTokenLogin = async (tokenFromUrl) => {
    try {
      const response = await axios.get(
        `http://13.43.174.21:4000/api/auth/verifyUserToken/${tokenFromUrl}`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromUrl}`,
          },
        }
      );

      if (response.data.success) {
        const user = response.data.user;
        dispatch(setToken(tokenFromUrl));
        dispatch(setUser(user));
        dispatch(setSuccess(true));
        localStorage.setItem("authToken", tokenFromUrl);
        toast.success("Logged in successfully!");
        router.push("/"); // Redirect to home or desired page
      } else {
        toast.error("Token verification failed");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      toast.error("An error occurred during token verification.");
    }
  };

  const handleSubmits = async (e) => {
    e.preventDefault();

    // Check if the userDetail object is empty or has default values
    const isUserDetailEmpty =
      !userDetail.firstname &&
      !userDetail.lastname &&
      !userDetail.email &&
      !userDetail.password &&
      !userDetail.role;

    if (isUserDetailEmpty) {
      // The userDetail object is empty, likely due to Google OAuth sign-up
      // You can optionally log a message or return early
      console.log("Google OAuth sign-up detected, skipping form registration.");
      return;
    }

    try {
      const response = await axios.post(
        `${config.baseURL}/api/auth/register`,
        userDetail
      );
      if (response.status === 201) {
        toast.success("Registration Successful!");
        handleClosee();
      } else {
        toast.error("Failed to Register. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while registering.");
    }
  };

  const InputHandler = (e) => {
    setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
  };
  const refreshData = () => {
    setRefresh(!isRefresh);
  };

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
        // refreshData();
        handleClose();
        setLoading(false);
        setIsLoggedIn(true);
        // setTimeout(() => {
        //   postCartToApi();
        // }, 3000);
      } else {
        toast.error("Login failed please try later!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${config.baseURL}/api/auth/logout`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status >= 200 && res.status < 300) {
        toast.success("Logout successfully");
        dispatch(removeToken());
        dispatch(removeUser());
        dispatch(removeSuccess());
        router.push("/explore-dishes");
        setIsLoggedIn(false);
        // refreshData();
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed");
    }
  };

  const handleClose = () => {
    const modal = document.getElementById("my_modal_2");
    modal.close();
  };
  const handleClosee = () => {
    const modal = document.getElementById("my_modal_1");
    modal.close();
  };

  const handleLoginClick = () => {
    document.getElementById("my_modal_2").showModal();
  };

  const handleSignUpClick = () => {
    document.getElementById("my_modal_1").showModal();
  };
  const handleCartClear1 = () => {
    dispatch(clearCart());
  };

  const { cart } = useSelector((state) => state?.userCart);
  console.log(cart, "cart");
  const cartData = cart[0]?.data?._id;
  const quantity = cart[0]?.quantity;
  // const lengths = cart.length;

  // const postCartToApi = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${config.baseURL}/api/Orders/AddtoCart`,
  //       {
  //         items: [
  //           {
  //             menuItem: cartData,
  //             quantity: quantity,
  //           },
  //         ],
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token, // Assuming token is defined somewhere
  //         },
  //       }
  //     );

  //     if (response.status !== 200) {
  //       throw new Error("Failed to post cart data");
  //     }

  //     return response.data;
  //   } catch (error) {
  //     console.error("Error posting cart data:", error);
  //     throw error;
  //   }
  // };

  // Helper function to save state to localStorage and post to API
  const saveState = async (state) => {
    try {
      const stateToSave = {
        message: "Cart",
        userCart: {
          items: state.cart.map((item) => ({
            menuItem: item.data._id, // Use item ID here
            quantity: item.quantity,
          })),
          totalQuantity: state.totalQuantity,
          totalAmount: state.totalAmount,
        },
      };
      const serializedState = JSON.stringify(stateToSave);
      localStorage.setItem("cart", serializedState);

      // Post the cart data to the API if the token is available
      if (state.token) {
        const cartData = {
          items: state.cart.map((item) => ({
            menuItem: item.data._id, // Use item ID here
            quantity: item.quantity,
          })),
        };
        const response = await postCartToApi(
          cartData,
          state.token,
          state.cartId
        );
        return response;
      }
    } catch (err) {
      console.error("Error saving state:", err);
      // Ignore write errors.
    }
  };

  console.log(quantity, "cart");
  cart.forEach((item, index) => {
    const { data } = item;
  });
  const [getCartItems, setGetCartItems] = useState({});

  const cartIt = getCartItems.length;

  useEffect(() => {
    if (token) {
      defaultCartItems(isRefresh);
    }
  }, [!isRefresh, token]);

  useEffect(() => {
    if (cartId && getCartItems.length > 0) {
      getCartItems.forEach((item) => {
        updateCartItemQuantity(cartId, item.menuItem._id, item.quantity);
      });
    }
  }, [cartId, getCartItems]);

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
        const userCart = response?.data?.userCart;
        const cartItems = userCart?.items.map((item) => ({
          ...item,
          totalPrice: item.menuItem.price * item.quantity,
        }));
        setGetCartItems(cartItems);
        setUpdatedCartItems(cartItems);
        setSubtotalPrice(
          cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
        );
        setShippingCost(userCart.Shipping_cost ?? 0);
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

  const handleItemRemove = async (id) => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/api/Orders/deleteCartItem/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("Item Remove From Cart");
        refreshData();
      } else {
        alert("failed");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "server error");
    }
  };
  // const handleCartClear = async () => {
  //   try {
  //     const response = await axios.delete(
  //       `${config.baseURL}/api/Orders/deleteAllCartItem`,
  //       {
  //         headers: {
  //           authorization: token,
  //         },
  //       }
  //     );
  //     if (response.status >= 200 && response.status < 300) {
  //       toast.success("All Items Are Removed");
  //       refreshData();
  //     } else {
  //       alert("failed");
  //     }
  //   } catch (error) {
  //     alert(error?.response?.data?.message || "server error");
  //   }
  // };

  useEffect(() => {
    const ids = cart.map((item) => ({
      menuItem: item.data._id,
      quantity: 1, // Set the default quantity to 1
    }));

    setItemId(ids);
    console.log(ids, "ids");
  }, [cart]);

  const itemIds = useSelector((state) =>
    state.userCart.cart.map((item) => ({
      menuItem: item.data._id,
      quantity: 1, // Set the default quantity to 1
    }))
  );

  useEffect(() => {
    console.log(itemIds, "itemIds");
  }, [itemIds]);

  const [itemId, setItemId] = useState([]);

  const handleAddCart = async () => {
    try {
      if (!itemId || itemId.length === 0) {
        toast.error("No items to add to the cart.");
        return;
      }

      const items = itemId.map((id) => ({
        menuItem: id,
        quantity: 1,
      }));

      const payload = { items };

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

      if (response.status >= 200 && response.status < 300) {
        toast.success("Items added to cart successfully");
        handleDrawerOpen();
        handleCartClear1();
      } else {
        toast.error("Failed to add items to cart. Please try again.");
        // refreshData();
      }
    } catch (error) {
      console.error("Error adding items to cart:", error);
      // refreshData();
    }
  };

  const getItemIdsFromCart = () => {
    const itemIds = cart.map((item) => item.data._id);
    setItemId(itemIds);
  };

  useEffect(() => {
    getItemIdsFromCart();
  }, [cart]);

  const dispatch = useDispatch();

  useEffect(() => {
    const itemIdsFromStorage = localStorage.getItem("itemIds");
    console.log();
    if (itemIdsFromStorage) {
      dispatch(setItemId(JSON.parse(itemIdsFromStorage)));
    }
  }, [dispatch]);

  const handleAddCartWrapper = () => {
    if (itemIds.length === 0) {
      console.log("No items to add to cart.");
      toast.error("No items to add to cart.");
      return;
    }
    handleAddCart();
  };
  const handleGoogleOAuth = () => {
    console.log("Initiating Google OAuth");
    window.location.href = `https://server-backend-gamma.vercel.app/Google_OAuth/google`;

    // After successful Google OAuth, handle the token login
    const tokenFromUrl = new URLSearchParams(window.location.search).get(
      "token"
    );
    if (tokenFromUrl) {
      handleTokenLogin(tokenFromUrl);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOAuthCallback = async (code) => {
    try {
      const response = await axios.post(
        "https://server-backend-gamma.vercel.app/Google_OAuth/google/get-token",
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data;

      if (token) {
        dispatch(setToken(token));
        dispatch(setUser(data.user));
        dispatch(setSuccess(true));
        localStorage.setItem("authToken", token);
        toast.success("Logged in successfully!");
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        router.push("/");
      } else {
        toast.error("Token verification failed");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      toast.error("An error occurred during token verification.");
    }
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      handleOAuthCallback(code);
    }
  }, [window.location.search]);

  const handleIncrement = (itemId) => {
    setGetCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.menuItem.price * (item.quantity + 1),
            }
          : item
      );
      setUpdatedCartItems(updatedCartItems);
      return updatedCartItems;
    });

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

  const handleDecrement = (itemId) => {
    setGetCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.menuItem.price * (item.quantity - 1),
            }
          : item
      );
      setUpdatedCartItems(updatedCartItems);
      return updatedCartItems;
    });

    setShouldRefresh(true);
  };

  useEffect(() => {
    if (shouldRefresh) {
      getCartItems.forEach((item) => {
        updateCartItemQuantity(cartId, item.menuItem._id, item.quantity);
      });

      // Recalculate the subtotal price after updating quantities
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

  const handleQuantityIncrement = (id) => {
    dispatch(incrementCartItemQuantity(id));
  };
  const handleQuantityDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleItemRemove1 = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success("Item Removed From Cart");
  };

  return (
    <>
      {/* <ToastContainer className="mt-24" autoClose={1000} /> */}
      <section>
        <nav className="z-50 flex justify-center bg-[#F38181] 2xl:h-[116px] xl:h-[80px] lg:h-[50px] sm:h-[45px] h-12 w-full mnavbar-h fixed">
          <div className="custom_container flex justify-between items-center mnavbar">
            <div className="w-1/3">
              {/* =======Side Drawer======= */}
              <div className="drawer">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle bg-transparent"
                />
                <div className="drawer-content bg-transparent">
                  {/* Page content here */}
                  <label htmlFor="my-drawer">
                    <Image
                      alt="image"
                      src={sidemanu}
                      className=" cursor-pointer 2xl:w-[38.67px] 2xl:h-[32px] xl:w-[25px] h-auto w-[22px] menu-btn "
                    />
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu p-[3px]  px-[20px] 2xl:w-[410px] xl:w-[320px] lg:w-[240px] sm:w-[240px] w-[240px] min-h-full bg-base-200 sidebar py-[10px]">
                    {/* Sidebar content here */}
                    <div>
                      <div className="flex justify-between items-center 2xl:my-[10px] my-[5px]">
                        <label
                          htmlFor="my-drawer"
                          aria-label="close sidebar"
                          className="drawer-overlay cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="2xl:w-8 2xl:h-8 w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                            />
                          </svg>
                        </label>
                        <Link href="/">
                          <Image
                            src={sidelogo}
                            className="2xl:w-[169px] 2xl:h-[43px] xl:w-[160px] lg:w-[150px] xs:w-[103px] md:w-[130px] sm:w-[70px] w-[60px]"
                          />
                        </Link>
                      </div>
                    </div>
                    <li className="2xl:mt-[90px] xl:mt-[50px] lg:mt-[40px] sm:mt-[30px] mt-[20px]">
                      {token ? (
                        <Link href="/setting">
                          <Image
                            src={profile}
                            className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] w-[16px]"
                          />
                          Profile
                        </Link>
                      ) : (
                        <button onClick={handleLoginClick} className="pl-0">
                          <Image
                            src={profile}
                            className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] w-[16px]"
                          />
                          Profile
                        </button>
                      )}
                    </li>
                    <li className="2xl:mt-[5px] xl:mt-[2px] lg:mt-[0px] sm:mt-[8px] mt-[5px] pl-0">
                      <Link  className="pl-0" href="about-us">
                        <Image
                          src={aboutauthentichef}
                          className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] w-[16px]"
                        />
                        About Authentichef
                      </Link>
                    </li>
                    <li className="2xl:mt-[5px] xl:mt-[2px] lg:mt-[0px] sm:mt-[8px] mt-[5px] ">
                      <Link  className="pl-0" href="/explore-dishes">
                        <Image
                          src={exploredish}
                          className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] w-[16px]"
                        />
                        Explore Dishes
                      </Link>
                    </li>
                    <li className="2xl:mt-[5px] xl:mt-[2px] lg:mt-[0px] sm:mt-[8px] mt-[5px] ">
                      <Link  className="pl-0" href="/become-chef">
                        <Image
                          src={beacomechef}
                          className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] w-[16px]"
                        />
                        Become a Chef
                      </Link>
                    </li>
                    <li className="2xl:mt-[5px] xl:mt-[2px] lg:mt-[0px] sm:mt-[8px] mt-[5px] ">
                      <a className="pl-0" href="/FAQs">
                        <Image
                          src={faq}
                          className="2xl:w-[20px] 2xl:h-[20px] xl:w-[16px] w-[16px]"
                        />
                        FAQs
                      </a>
                    </li>
                    <hr className="mx-auto 2xl:w-[345px] xl:w-[260px] lg:w-[180px] sm:w-[140px] w-[80%] 2xl:mt-[75px] xl:mt-[40px] lg:mt-[20px] sm:mt-[15px] mt-[10px] text-[#D8D8D8]" />
                    <div className="text-center 2xl:mt-[35px] xl:mt-[15px] lg:mt-[10px] sm:mt-[8px] mt-[5px]">
                      <div className="flex justify-center md:gap-11 gap-2 md:ml-6 lg:ml-0">
                        {isLoggedIn ? (
                          <div>
                            <p className="text-[#000000] font-alata font-[400] 2xl:text-[20px] md:text-[18px] text-[16px] leading-[30px] py-[3px]">
                              {userDetails?.firstname} {userDetails?.lastname}
                            </p>
                            <p className="text-[#555555] font-alata font-[400] text-[14px] leading-[26px]">
                              {userDetails?.email}
                            </p>
                            <div className="flex justify-center items-center gap-[7px] py-[8px]">
                              <Image
                                src={logout}
                                className="2xl:w-[17px] 2xl:h-[17px] w-[16px]"
                              />
                              <button
                                onClick={handleLogout}
                                className="text-[#DB5353] fourth_p"
                              >
                                Logout
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="md:gap-7 gap-2">
                            <p className="text-[#555555] font-alata font-[400] 2xl:text-[14px] xl:text-[10px] lg:text-[9px] sm:text-[10px] text-[8px] 2xl:leading-[26px] xl:leading-[22px] lg:leading-[16px] sm:leading-[16px] leading-[14px]">
                              Welcome
                            </p>
                            <button
                              onClick={handleLoginClick}
                              className="text-[#DB5353] fourth_p"
                            >
                              Log In
                            </button>
                            <br />
                            <button
                              onClick={handleSignUpClick}
                              className="fourth_p text-[#DB5353]"
                            >
                              Sign Up
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-1/3 flex justify-center ">
              <a href="/">
                <Image alt="logo" src={logo} className="nav_logo" />
              </a>
            </div>

            <div className="w-1/3 flex justify-end h-full ">
              <div className="flex justify-end md:gap-0 gap-2 ">
                {isLoggedIn === success ? (
                  <div className="flex justify-end 2xl:gap-7 md:gap-5  gap-1 w-1/3">
                    <div className="nav_login1 md:flex items-center  gap-1 lg:gap-2 hidden sm:block">
                      Welcome <p>{userDetails?.firstname}!</p>
                    </div>
                    <button>
                      <Image
                        src={beg}
                        className="2xl:w-[28px] xl:w-[20px] w-[16px] hidden sm:block"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end md:gap-7 gap-2 xs:hidden">
                    <button onClick={handleLoginClick} className="nav_login1">
                      Log In
                    </button>
                    <button
                      onClick={handleSignUpClick}
                      className="nav_signup hover:bg-gray-300"
                    >
                      Sign Up
                    </button>
                    <button>{/* Add your Image component here */}</button>
                  </div>
                )}
                <button onClick={handleDrawerOpen} className="relative">
                  <p className="absolute 2xl:right-[-25px] 2xl:text-[20px] xl:right-[-13px] 2xl:top-6 xl:top-4 bg-white text-[#F38181] border rounded-full 2xl:px-2 xl:px-1 lg:right-[-15px] lg:top-1 lg:px-[5px] text-[12px] xl:text-[14x] md:right-[-15px] md:top-1 md:px-[5px] sm:right-[-15px] sm:top-1 sm:px-[5px] right-[-15px] top-1 px-[5px] cartCount">
                    {/* {token ? lengths + cartIt : lengths} */}
                  </p>
                  <Image
                    src={beg}
                    className="2xl:w-10 2xl:h-10  w-[25px] h-[25px]"
                  />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </section>
      {/* ===============Right drawer=============== */}
      <div className="z-50 drawer drawer-end">
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
              {!cart ||
              cart.length === 0 ||
              !getCartItems ||
              getCartItems.length === 0 ? (
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
                      {cart?.map((item, index) => {
                        const { data } = item;
                        const itemSubtotal = data.price * item.quantity;
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
                        <p className="font-[500] text-[16px] py-[1rem]">
                          FREE delivery on orders over £55
                        </p>
                      </div>
                    ) : (
                      <div className="w-full">
                        <button
                          onClick={handleLoginClick}
                          className="alata font-[400] bg-[#DB5353] text-white mx-auto 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[15px] text-[14px] w-full py-2 lg:h-[47px] flex flex-col items-center justify-center"
                        >
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>

      {/* =======Signup popup======= */}
      <div className="">
        <dialog
          id="my_modal_1"
          className="modal rounded-[10px] 2xl:w-[1000px] 2xl:h-[605px] xl:w-[620px] xl:h-[440px] lg:w-[480px] md:h-[550px] h-[550px] w-[90%] 2xl:mt-40 xl:mt-24 mt-14 p-0 signup"
        >
          <form
            method="dialog"
            className="  h-full mt-0 w-[90%] md:w-[70%]"
            onSubmit={handleSubmits}
          >
            {/* if there is a button in form, it will close the modal */}
            <div className="flex justify-center items-center  w-full 2xl:h-[80px] xl:h-[55px] h-[40px]">
              <div
                className="absolute right-3 cursor-pointer"
                onClick={handleClosee}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="2xl:w-9 2xl:h-9 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h4 className="fourth_p">Sign Up</h4>
            </div>
            <div className=" my-3 ">
              <div className="flex flex-wrap justify-between 2xl:w-[775px] xl:w-[480px] mx-auto w-full">
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-full">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="alata font-[400] login-inputad text-[#929292] w-full h-[40px] "
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    onChange={inputHandlers}
                    value={userDetail.firstname}
                    maxLength={100}
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-full">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="alata font-[400] login-inputad text-[#929292] w-full h-[40px]"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    onChange={inputHandlers}
                    value={userDetail.lastname}
                    maxLength={100}
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-full">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="alata font-[400] login-inputad text-[#929292] w-full h-[40px]"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    onChange={inputHandlers}
                    value={userDetail.email}
                  />
                </div>
                <div className="2xl:mt-[35px] mt-[25px] 2xl:w-[368px] xl:w-[230px] w-full">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="alata font-[400] login-inputad text-[#929292] w-full h-[40px]"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                    onChange={inputHandlers}
                    value={userDetail.password}
                  />
                </div>
              </div>
              <div className="flex">
                <button className="w-full mx-auto alata text-white 2xl:text-[20px] 2xl:w-[368px] xl:w-[230px] lg:w-[190px] xl:text-[14px] text-[12px] rounded-[5px] 2xl:mt-[30px] xl:mt-[15px] mt-[25px] 2xl:h-[60px] xl:h-[40px] lg:h-[32px] h-[40px] text-center bg-[#DB5353] sign-button">
                  Create Account
                </button>
              </div>
              <div>
                <p className="alata font-[400] 2xl:my-[20px] xl:my-[10px] text-[14px] leading-[26px] text-center">
                  or
                </p>
              </div>
              <div className="flex 2xl:mt-[20px]">
                <div className="mx-auto 2xl:w-[368px] xl:w-[230px] w-full md:w-[50%]">
                  {/* <div className="menu">
                    {isLoggedIn && currentUser ? (
                      <>Welcome, {currentUser.firstname}</>
                    ) : (
                      <button onClick={handleGoogleOAuth}>
                        Continue with Google
                      </button>
                    )}
                  </div> */}
                  <div className="my-[12px] social_div social_btn h-[40px] gap-3 w-full ">
                    <Image className="social_img " src={google} />
                    <h3 className="checkoutlable menu">
                      {isLoggedIn && currentUser ? (
                        <>Welcome, {currentUser.firstname}</>
                      ) : (
                        <button onClick={handleGoogleOAuth}>
                          Continue with Google
                        </button>
                      )}
                    </h3>
                  </div>{" "}
                  {/* </a> */}
                  <Link href="https://www.facebook.com/login/" target="_blank">
                    <div className="my-[12px] social_div social_btn h-[40px] gap-3 w-full">
                      <Image className="social_img " src={fb} />
                      <h3 className="checkoutlable">Continue with Facebook</h3>
                    </div>{" "}
                  </Link>
                </div>
              </div>
              {/* <div className="my-[30px]">
                <h4 className="text-[#555555] alata font-[400] text-[14px] leading-[26px] text-center">
                  Browse as Guest
                </h4>
              </div> */}
            </div>
          </form>
        </dialog>
      </div>
      {/* =======Login======= */}
      <div className="">
        <dialog
          id="my_modal_2"
          className="modal rounded-[10px] 2xl:w-[1000px] 2xl:h-[551px] xl:w-[620px] xl:h-[400px] lg:w-[480px] h-[350px] w-[90%] 2xl:mt-40 xl:mt-24 mt-14 p-0 loginpop"
        >
          <form
            method="dialog"
            className=" mt-0 w-[90%] md:w-[50%] lg:w-[490px]"
            onSubmit={handleSubmit}
          >
            <div className="w-full ">
              <div className="flex justify-center items-center w-full ">
                <div
                  className="absolute right-3 cursor-pointer"
                  onClick={handleClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="2xl:w-7 2xl:h-7 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h4 className="fourth_p">Login</h4>
              </div>
              <div className="2xl:w-[368px] xl:w-[280px] lg:w-[490px] w-full mx-auto">
                <div className="2xl:mt-[35px] mt-[25px]">
                  <input
                    type="email"
                    name="email"
                    onChange={InputHandler}
                    placeholder="Enter your mail id"
                    className="alata font-[400] login-inputad w-full h-[40px]"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                  />
                  <label className="checkoutlable text-[#929292] cursor-pointer">
                    Forgot Email?
                  </label>
                </div>
                <div className="2xl:mt-[35px] mt-[20px]">
                  <input
                    type="password"
                    name="password"
                    onChange={InputHandler}
                    placeholder="Enter your Password"
                    className="alata font-[400] login-inputad w-full h-[40px]"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="enter valid email ex. abc@gmail.com"
                  />
                  <label className="checkoutlable text-[#929292] cursor-pointer">
                    Forgot Password?
                  </label>
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="w-full mx-auto alata text-white 2xl:text-[20px] 2xl:w-[368px] xl:w-[280px] lg:w-[220px] xl:text-[16px] text-[12px] rounded-[5px] 2xl:mt-[40px] xl:mt-[25px] mt-[20px] 2xl:h-[60px] xl:h-[40px] lg:h-[32px] h-[40px] text-center bg-[#DB5353] login-button"
                  >
                    Login
                  </button>
                </div>
                <div>
                  <p className="alata font-[400] 2xl:my-[20px] xl:my-[10px] text-[14px] leading-[26px] text-center">
                    or
                  </p>
                </div>
                <div className="lg:my-[30px] flex justify-center my-[10px]">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="nav_login1"
                  >
                    <h4 className="text-[#DB5353] alata font-[400] text-[14px] leading-[26px] text-center mx-auto ">
                      Sign Up
                    </h4>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </dialog>
      </div>
    </>
  );
};
export default Navbar;
