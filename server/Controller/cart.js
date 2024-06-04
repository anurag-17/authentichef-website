const Cart = require("../Model/cart");
const MenuItem = require("../Model/MenuItem");
const User = require("../Model/User");


// Working code on Production
// exports.addToCart = async (req, res, next) => {
//   try {
//     const { items } = req.body;


//     const userId = req.user ? req.user._id : null;

//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ message: "Items are required and should be an array" });
//     }
//     let totalCost = 0;

//     for (const item of items) {
//       if (!item.menuItem || !item.quantity ) {
//         return res.status(400).json({ message: "Each item must include a menuItem and a quantity" });
//       }

//       // Check if the menu item exists
      
//       const menuItemExists = await MenuItem.findById(item.menuItem).select("name price");
//       if (!menuItemExists) {
//         return res.status(404).json({ message: `Menu item not found: ${item.menuItem}` });
//       }

//       totalCost += menuItemExists.price * item.quantity;
//     }

//     console.log("Total cost is", totalCost);

//     // Add the shipping cart logic
//     let shippingCost = totalCost > 55 ? 0 : 5.99;

    

//     if (!userId) {
//       // For guest users
//       const cartData = items.map(item => ({
//         menuItem: item.menuItem,
//         quantity: item.quantity,
//         customization: item.customization,
//       }));

//       return res.status(200).json({ message: "Items added to cart", cartData });
//     }

//     let userCart = await Cart.findOne({ user: userId });
//     if (!userCart) {
//       userCart = new Cart({
//         user: userId,
//         items: [],
//         Shipping_cost:0
//       });
//     }

//     for (const item of items) {
//       const existingItemIndex = userCart.items.findIndex(cartItem => cartItem.menuItem.toString() === item.menuItem);

//       if (existingItemIndex !== -1) {
//         // Update quantity of existing item
//         userCart.items[existingItemIndex].quantity += item.quantity;
//       } else {
//         userCart.items.push({ menuItem: item.menuItem, quantity: item.quantity, customization: item.customization });
//       }
//     }

//     userCart.Shipping_cost = shippingCost;

//     await userCart.save();

//     // Populate the menuItem field with name and price
//     const updatedCart = await Cart.findById(userCart._id).populate({
//       path: "items.menuItem",
//       select: "name price"
//     });

//     res.status(201).json({ message: "Items added to cart", updatedCart , shippingCost});
//   } catch (error) {
//     next(error);
//   }
// }

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
        console.log("Menu item not found:", item.menuItem);
        return res.status(404).json({ message: `Menu item not found: ${item.menuItem}` });
      }

      // Add debugging statement to check if menuItem.price is defined
      if (typeof menuItem.price === 'undefined') {
        console.log("Price is undefined for menu item:", menuItem._id);
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








exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user._id;
    const userCart = await Cart.findOne({ user: userId}).populate('items.menuItem')
    if (!userCart) {
      return res.status(200).json({ message: "Cart is empty", length: 0 });
  }
  

    const TotalPricePerQuntity = userCart.items.map(item => item.menuItem.price * item.quantity).reduce((a, b) => a + b, 0);

    // want to count number of items in the cart
    const userCartCount =userCart.items.length;

    if (!userCart) {
      return res.status(200).json({ message: "Cart is empty" });
    }
   

    res.status(200).json({message:'Cart',userCart,userCartCount,TotalPricePerQuntity})
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: "Failed to retrieve cart items", message: error.message });
  }
};



// Function to update an item in the user's cart
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity, customization } = req.body;
    const userId = req.user._id;
    const cartId = req.params.cardid;
    const menuItem = req.params.menuid;

    // Find the user's cart by ID
    let userCart = await Cart.findOne({ user: userId, _id: cartId });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the item in the cart
    const itemIndex = userCart.items.findIndex(item => String(item.menuItem) === menuItem);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the item details
    userCart.items[itemIndex].quantity = quantity;
    userCart.items[itemIndex].customization = customization;

    // Calculate total cost of items in the cart
    let totalCost = 0;
    for (const item of userCart.items) {
      const menuItem = await MenuItem.findById(item.menuItem).select("price");
      if (menuItem) {
        totalCost += menuItem.price * item.quantity;
      }
    }

    // Determine shipping cost based on total cost
    let shippingCost = totalCost > 55 ? 0 : 5.99;

    // Update the shipping cost in the cart
    userCart.Shipping_cost = shippingCost;

    // Save the updated cart to the database
    userCart = await userCart.save();

    // Respond with a success message and updated cart details
    res.status(200).json({ message: "Item updated successfully", cart: userCart, shippingCost });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: "Failed to update item in cart", message: error.message });
  }
};




exports.deleteCartItem = async (req, res) => {
  try {
    const itemId = req.params.id; // Assuming the parameter name is "itemId"

    // Extract user ID from the request (assuming it's stored in req.user)
    const userId = req.user._id;

    // Find the user's cart
    const userCart = await Cart.findOne({ user: userId});

    // If userCart is null, the cart is empty
    if (!userCart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Find the index of the item in the cart
    const itemIndex = userCart.items.findIndex(item => String(item.menuItem) === itemId);

    // If the item is not found in the cart, return 404
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove the item from the cart
    userCart.items.splice(itemIndex, 1);

    // Save the updated cart to the database
    await userCart.save();

    // Respond with a success message
    return res.status(200).json({ message: "Item deleted successfully", cart: userCart });
  } catch (error) {
    // If an error occurs, respond with an error message
    return res.status(500).json({ error: "Failed to delete item from cart", message: error.message });
  }
};



// Delete all items from the user's cart

exports.deleteAllCartItems = async (req, res) => {
  try {
      // Extract user ID from the request (assuming it's stored in req.user)
      const userId = req.user._id;

      // Find and delete the user's cart
      const deletedCart = await Cart.findOneAndDelete({ user: userId });

      if (!deletedCart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      // Respond with a success message
      return res.status(200).json({ message: "Cart deleted successfully", deletedCart });
  } catch (error) {
      // If an error occurs, respond with an error message
      return res.status(500).json({ error: "Failed to delete cart", message: error.message });
  }
}


exports.placeOrder = async (req, res) => {
  try {
    // Assuming user ID is extracted from the request, you may implement your own authentication logic
    const userId = req.user._id;
    const { deliveryDate } = req.body;

    // Find the user's cart
    const userCart = await Cart.findOne({ user: userId, status: "pending" }).populate({
      path: "items.menuItem",
      select: "price"
    });

    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Check if there is already an order associated with the user's cart
    const existingOrder = await Cart.findOne({ user: userId, status: "pending", items: { $eq: userCart.items } });
    if (existingOrder) {
      // Create a new order instead of updating the existing one
      const totalAmount = await calculateTotalAmount(userCart.items);
      const newOrder = new Cart({
        items: userCart.items,
        user: userId,
        totalAmount,
        status: "pending",
        deliveryDate: deliveryDate || null
      });
      await newOrder.save();

      // Delete the old cart
      if (userCart) {
        await Order.deleteOne({ _id: userCart._id });
      }

      return res.status(201).json({ message: "Order created successfully", order: newOrder });
    }

    // Calculate the total amount
    const totalAmount = await calculateTotalAmount(userCart.items);

    // Create a new order from the items in the cart
    const newOrder = new Order({
      items: userCart.items,
      user: userId,
      totalAmount,
      status: "pending",
      deliveryDate: deliveryDate || null
    });

    // Save the new order to the database
    await newOrder.save();

    // Delete the old cart
    if (userCart) {
      await Order.deleteOne({ _id: userCart._id });
    }

    // Respond with a success message
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: "Failed to create order", message: error.message });
  }
};










// Function to calculate the total amount based on items in the cart
const calculateTotalAmount = async (items, userId) => {
  console.log("Items are", items, "User ID is", userId);
  try {
    // Calculate the total amount based on items in the cart
    const orderItems = await Order.findOne({ user: userId, status: "pending" }).populate({
      path: "items.menuItem",
      select: "price"
    });
    const totalAmount = items.reduce((total, item) => {
      // Access the price property of menuItem
      const itemPrice = item.menuItem.price;
      const itemQuantity = item.quantity;
      return total + (itemPrice * itemQuantity);
    }, 0);

    return totalAmount;
  } catch (error) {
    throw new Error("Failed to calculate total amount");
  }
};



