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













































exports.addToCart = async (req, res, next) => {
  try {
    const { items } = req.body;
    const userId = req.user ? req.user._id : null;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required and should be an array" });
    }

    // Fetch all menu items and calculate the total cost
    let totalCost = 0;
    const menuItemMap = new Map();

    for (const item of items) {
      if (!item.menuItem || !item.quantity) {
        return res.status(400).json({ message: "Each item must include a menuItem and a quantity" });
      }

      // Check if the menu item exists
      const menuItem = await MenuItem.findById(item.menuItem).select("name price");
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item not found: ${item.menuItem}` });
      }

      menuItemMap.set(item.menuItem, menuItem);
      totalCost += menuItem.price * item.quantity;
    }

    // Calculate shipping cost based on total cost
    const shippingCost = totalCost > 55 ? 0 : 5.99;

    if (!userId) {
      // For guest users
      const cartData = items.map(item => ({
        menuItem: item.menuItem,
        quantity: item.quantity,
        customization: item.customization,
      }));

      return res.status(200).json({ message: "Items added to cart", cartData, shippingCost });
    }

    // For logged-in users
    let userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      userCart = new Cart({
        user: userId,
        items: [],
        shippingCost: 0,
      });
    }

    // Update cart items and recalculate total cost
    for (const item of items) {
      const existingItemIndex = userCart.items.findIndex(cartItem => cartItem.menuItem.toString() === item.menuItem);

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        userCart.items[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item to cart
        userCart.items.push({ menuItem: item.menuItem, quantity: item.quantity, customization: item.customization });
      }
    }

    // Recalculate total cost based on the updated cart
    totalCost = userCart.items.reduce((acc, cartItem) => {
      const menuItem = menuItemMap.get(cartItem.menuItem.toString());
      return acc + (menuItem.price * cartItem.quantity);
    }, 0);

    userCart.Shipping_cost = totalCost > 55 ? 0 : 5.99;
    await userCart.save();

    // Populate the menuItem field with name and price
    const updatedCart = await Cart.findById(userCart._id).populate({
      path: "items.menuItem",
      select: "name price",
    });

    res.status(201).json({ message: "Items added to cart", updatedCart });
  } catch (error) {
    next(error);
  }
};




















