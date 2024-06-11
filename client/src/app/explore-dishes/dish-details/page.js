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
  addItemToCart,
} from "@/app/redux/dishSlice";
import config from "@/config";

const DishDetails = ({ dishID, defaultADish, handleAddCart, setItemId }) => {
  const { token } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [getADish, setGetADish] = useState("");
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [cartId, setCartId] = useState("");
  const [getCartItems, setGetCartItems] = useState({});
  const [isRefresh, setRefresh] = useState(false);

  useEffect(() => {
    defaultDish();
  }, []);

  useEffect(() => {
    defaultCartItems();
  }, [!isRefresh]);

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

  const handleIncrement = (itemId) => {
    setCount((prevCount) => prevCount + 1); // Update the count state

    if (token) {
      // If token exists, update using API
      updateCartItemQuantity(cartId, itemId, count + 1);
    } else {
      // If no token, update using Redux
      dispatch(incrementCartItemQuantity(itemId));
    }
  };

  const handleDecrement = (itemId) => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1); // Update the count state

      if (token) {
        // If token exists, update using API
        updateCartItemQuantity(cartId, itemId, count - 1);
      } else {
        // If no token, update using Redux
        dispatch(decrementQuantity(itemId));
      }
    }
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    if (!token) {
      dispatch(updateCartItemQuantityInRedux(itemId, quantity));
      return;
    }

    // Update using API
    axios
      .put(
        `${config.baseURL}/api/Orders/updateItem/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Cart item updated successfully");
        } else {
          console.log("Failed to update cart item", response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error updating cart item:", error);
      });
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
        const userCart = response?.data?.userCart;
        const cartItems = userCart?.items.map((item) => ({
          ...item,
          totalPrice: item.menuItem.price * item.quantity,
        }));
        // console.log("User cart is -------------->>>>>>>>>>>>>", userCart._id);
        setGetCartItems(cartItems);
        setUpdatedCartItems(cartItems); // Initializing updatedCartItems with fetched data
        setSubtotalPrice(
          cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
        );
        setCartId(userCart._id); // Set the cart ID inside the .then callback

        // Update quantities for default cart items
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

  return (
    <>
      <section>
        <div>
          <div className="flex 2xl:gap-[60px] xl:gap-[40px] gap-[20px] justify-between ">
            <div className="2xl:w-[459px] xl:w-[280px] w-[180px] ">
              <img
                src={getADish?.ProfileImage}
                className="rounded-[15px] 2xl:w-[459px] 2xl:h-[339px] xl:w-[280px] xl:h-[200px]"
              />
            </div>
            <div className="2xl:w-[400px] xl:w-[359px] w-[300px]">
              <div>
                <h1 className="pop-head capitalize">{getADish?.name}</h1>
                <p className="pop-chef">by Chef {getADish?.chef_id?.name}</p>
              </div>
              <div className="flex justify-between pop-detail">
                <h3>
                  Price: £{getADish?.price && ` ${getADish.price.toFixed(2)}`}
                </h3>
                <h3>Weight: {getADish?.weight}g</h3>
                <h3>Portion Size: Serves {getADish?.portion_Size}</h3>
              </div>
              <div className="flex flex-wrap 2xl:gap-[10px] xl:gap-[8px] gap-[6px]  2xl:my-[15px] xl:my-[12px] my-[8px]">
                {getADish?.Dietary_id?.title ? (
                  <div className="pop">
                    <img
                      src={getADish?.Dietary_id?.ProfileImage}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    />
                    <h3>{getADish?.Dietary_id?.title}</h3>
                  </div>
                ) : (
                  ""
                )}

                <button className="four_btnn border">
                  <img
                    src={getADish?.spice_level_id?.ProfileImage}
                    className="2xl:[100%] h-auto"
                  />
                  <h3>{getADish?.spice_level_id?.title}</h3>
                </button>

                {getADish?.Nutrition_id &&
                  getADish?.Nutrition_id.length > 0 && (
                    <div className="four_btn">
                      {getADish.Nutrition_id.map((nutrition, index) => (
                        <span key={index} className="fourth_day capitalize">
                          {index > 0 && " | "} {nutrition.Nutritional}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
              <div className="flex justify-center 2xl:w-[103px] 2xl:h-[39px] xl:w-[60px] xl:h-[22px] lg:w-[50px] lg:h-[20px] border rounded-[5px] 2xl:mt-[25px] xl:mt-[20px] mt-[15px]">
                <button
                  className="text-[#DB5353] rounded-l w-1/3"
                  onClick={() => {
                    handleDecrement(getADish?._id, getCartItems);
                  }}
                >
                  -
                </button>
                <p className="flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px]  2xl:leading-[28px] ">
                  {count}
                </p>
                <button
                  className="text-[#DB5353] rounded-r w-1/3"
                  onClick={() => handleIncrement(getADish?._id, getCartItems)}
                >
                  +
                </button>
              </div>

              <div>
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
                  className="pop-btn"
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
              </div>
            </div>
          </div>
          <div className="2xl:my-[15px] xl:my-[10px] my-[8px]">
            <div className="">
              <p className="fourth_p text-[#555555]">Description</p>{" "}
              <p className="fourth_p 2xl:w-[890px] xl:w-[660px] w-[550px]">
                {getADish?.description}
              </p>
            </div>
          </div>
          <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
            <div className="">
              <div>
                <p className="fourth_p text-[#555555]">Main Ingredients</p>{" "}
                <p className="fourth_p "> {getADish?.Ingredients}</p>
              </div>
              <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
                <p className="fourth_p text-[#555555] ">List of Allergens</p>{" "}
                <p className="fourth_p ">{getADish?.List_of_Allergens}</p>
              </div>
              <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
                <p className="fourth_p text-[#555555]">Heating instructions</p>{" "}
                <p className="fourth_p ">{getADish?.Heating_Instruction}</p>
              </div>
              <div>
                <p className="fourth_p text-[#555555]">
                  Nutritional Information:
                </p>
                {getADish?.nutritional_information && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getADish?.nutritional_information,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DishDetails;
