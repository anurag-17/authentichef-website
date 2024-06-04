// models/Cart.js

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        required: true
    },
      customization: String
    }
  ],

  // Add A shipping cost field

  Shipping_cost: {
    type: Number
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
