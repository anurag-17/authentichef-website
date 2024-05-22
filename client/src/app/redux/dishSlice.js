// "use client";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cart: [],
// };

// export const dishSlice = createSlice({
//   name: "userCart",
//   initialState,
//   reducers: {
//     setDish: (state, action) => {
//       state.dish = action.payload;
//     },
//   },
// });

// export const { setDish } = dishSlice.actions;

// export default dishSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  dish: null, // Assuming you want to keep track of the currently selected dish
};

export const dishSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    setDish: (state, action) => {
      state.dish = action.payload;
    },
    addItemToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      // console.log("actions>>>>>>", action)
      const itemIdToRemove = action.payload._id;
      // console.log("Item IDs to remove:", itemIdToRemove);
      state.cart = state.cart.filter(
        (item) => !itemIdToRemove.includes(item.data._id)
      );

      // console.log("state_cart------>>>>>>>...", state.cart )
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setDish, addItemToCart, removeItemFromCart, clearCart } =
  dishSlice.actions;

export default dishSlice.reducer;
