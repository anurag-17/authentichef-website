import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

// Helper function to post cart to API
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

// Helper function to save state to localStorage
const saveStateToLocalStorage = (state) => {
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
  } catch (err) {
    console.error("Error saving state:", err);
    // Ignore write errors.
  }
};

// Async thunk to handle saving state and posting to API
export const saveState = createAsyncThunk(
  "userCart/saveState",
  async (state, { getState }) => {
    saveStateToLocalStorage(state);
    const { token, cartId, cart } = getState().userCart;

    if (token) {
      const cartData = {
        items: cart.map((item) => ({
          menuItem: item.data._id, // Use item ID here
          quantity: item.quantity,
        })),
      };
      const response = await postCartToApi(cartData, token, cartId);
      return response;
    }
  }
);

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
    },
    incrementCartItemQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((item) => item.data._id === itemId);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += item.data.price;
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((item) => item.data._id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= item.data.price;
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter((item) => item.data._id !== itemId);
        state.totalQuantity -= 1;
        state.totalAmount -= item.data.price;
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
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    setCartData: (state, action) => {
      state.cart = action.payload.cartItems;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      state.cartId = action.payload.cartId;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Save token to local storage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveState.fulfilled, (state, action) => {
      // Handle any additional state updates after saving state and posting to API
    });
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
