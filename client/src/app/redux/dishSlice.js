import { createSlice } from "@reduxjs/toolkit";
import config from "@/config";

// Helper function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const postCartToApi = async (menuItem, token, cartId) => {
  try {
    const response = await fetch(`${config.baseURL}/api/Orders/AddtoCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(menuItem),
    });
    if (!response.ok) {
      throw new Error("Failed to post cart data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting cart data:", error);
    throw error;
  }
};

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
      const response = await postCartToApi(cartData, state.token, state.cartId);
      return response;
    }
  } catch (err) {
    console.error("Error saving state:", err);
    // Ignore write errors.
  }
};

const initialState = loadState()?.userCart || {
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
  token: null,
  cartId: null,
};

const dishSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    setDish: (state, action) => {
      state.dish = action.payload;
    },
    addItemToCart: (state, action) => {
      const itemToAdd = action.payload;
      const existingItem = state.cart.find(
        (item) => item.data._id === itemToAdd.data._id
      );

      if (existingItem) {
        existingItem.quantity += itemToAdd.quantity || 1;
        state.totalQuantity += itemToAdd.quantity || 1;
        state.totalAmount += (itemToAdd.quantity || 1) * itemToAdd.data.price;
      } else {
        state.cart.push({ ...itemToAdd, quantity: itemToAdd.quantity || 1 });
        state.totalQuantity += itemToAdd.quantity || 1;
        state.totalAmount += (itemToAdd.quantity || 1) * itemToAdd.data.price;
      }

      saveState(state);
    },
    incrementCartItemQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((item) => item.data._id === itemId);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += item.data.price;
        saveState(state);
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((item) => item.data._id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= item.data.price;
        saveState(state);
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter((item) => item.data._id !== itemId);
        state.totalQuantity -= 1;
        state.totalAmount -= item.data.price;
        saveState(state);
      }
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      const itemToRemove = state.cart.find(
        (item) => item.data._id === itemIdToRemove
      );

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalAmount -= itemToRemove.quantity * itemToRemove.data.price;
      }

      state.cart = state.cart.filter(
        (item) => item.data._id !== itemIdToRemove
      );
      saveState(state);
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveState(state);
    },
    setCartData: (state, action) => {
      state.cart = action.payload.cartItems;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      state.cartId = action.payload.cartId;
      saveState(state);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Save token to local storage
      saveState(state);
    },
  },
});

export const {
  setDish,
  addItemToCart,
  incrementCartItemQuantity,
  decrementQuantity,
  removeItemFromCart,
  clearCart,
  setCartData,
  setToken,
} = dishSlice.actions;

export default dishSlice.reducer;
