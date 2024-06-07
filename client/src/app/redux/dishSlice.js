import { createSlice } from "@reduxjs/toolkit";

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

// Helper function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

const initialState = loadState() || {
  cart: [],
  dish: null,
  totalQuantity: 0, // Add this line
  totalAmount: 0, // Add this line
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
        state.totalQuantity += itemToAdd.quantity || 1; // Update totalQuantity
        state.totalAmount += (itemToAdd.quantity || 1) * itemToAdd.data.price; // Update totalAmount
      } else {
        state.cart.push({ ...itemToAdd, quantity: itemToAdd.quantity || 1 });
        state.totalQuantity += itemToAdd.quantity || 1; // Update totalQuantity
        state.totalAmount += (itemToAdd.quantity || 1) * itemToAdd.data.price; // Update totalAmount
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
        state.totalQuantity -= 1; // Update totalQuantity
        state.totalAmount -= item.data.price; // Update totalAmount
        saveState(state);
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter((item) => item.data._id !== itemId);
        state.totalQuantity -= 1; // Update totalQuantity
        state.totalAmount -= item.data.price; // Update totalAmount
        saveState(state);
      }
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      const itemToRemove = state.cart.find(
        (item) => item.data._id === itemIdToRemove
      );
   
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity; // Update totalQuantity
        state.totalAmount -= itemToRemove.quantity * itemToRemove.data.price; // Update totalAmount
      }
   
      state.cart = state.cart.filter(
        (item) => item.data._id !== itemIdToRemove
      );
      saveState(state);
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0; // Reset totalQuantity
      state.totalAmount = 0; // Reset totalAmount
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
} = dishSlice.actions;

export default dishSlice.reducer;