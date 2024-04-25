const express = require('express');
const Order =require("../Model/order")
const Cart = require("../Model/cart");
const validateMongoDbId = require("../Utils/validateMongodbId");

// Create an order
exports.PlaceOrder = async (req, res, next) => {
    try {
        const { deliveryDate, deliveryInfo,status} = req.body;
        
        // Get the cart items
        const cartItems = await Cart.findOne({ user: req.user._id }).populate({
            path: "items.menuItem",
            select: "price"
        });


        if (!cartItems || cartItems.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        // Update item quantities based on the request
        // if (itemsToUpdate && Array.isArray(itemsToUpdate)) {
        //     itemsToUpdate.forEach(item => {
        //         const cartItem = cartItems.items.find(cartItem => cartItem.menuItem._id.equals(item.itemId));
        //         if (cartItem) {
        //             cartItem.quantity = item.quantity;
        //         }
        //     });
        // }

        // Calculate total amount from updated cart items
        const totalAmount = cartItems.items.reduce((total, item) => {
            return total + (item.menuItem.price * item.quantity);
        }, 0);

        // Extract menu items from cart
        const items = cartItems.items.map(item => ({
            menuItem: item.menuItem._id,
            quantity: item.quantity,
            customization: item.customization
        }));

        // Create an order with delivery information
        const newOrder = new Order({
            items: items,
            user: req.user._id,
            deliveryDate: deliveryDate,
            deliveryInfo: deliveryInfo, // Include delivery information
            totalAmount: totalAmount,
            status:status
        });

        // Save the order
        const savedOrder = await newOrder.save();
        
        // Delete the cart after placing the order
        await Cart.deleteOne({ _id: cartItems._id });

        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Check the Order List //


exports.OrderList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const currentPage = parseInt(page, 10);
        const itemsPerPage = parseInt(limit, 10);

        let orderQuery = Order.find({ user: req.user._id }); // Filter by user_id

        if (search) {
            orderQuery = orderQuery.where('items.menuItem').regex(new RegExp(search, 'i'));
        }

        // Count total number of documents
        const totalOrders = await Order.countDocuments(orderQuery);

        // Calculate total number of pages
        const totalPages = Math.ceil(totalOrders / itemsPerPage);

        // Calculate how many documents to skip based on pagination
        const skip = (currentPage - 1) * itemsPerPage;

        // Execute the query
        const orders = await orderQuery.skip(skip).limit(itemsPerPage).populate('items.menuItem').exec();

        res.status(200).json({
            totalOrders,
            totalPages,
            currentPage,
            orders
        });
    } catch (error) {
        next(error);
    }
};



// Get Order By Id
exports.getOrderById = async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order retrieved successfully', order: order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update Order By Id


exports.UpdateOrder = async (req, res, next) => {
    const { id } = req.params;

    try {
        const foundOrder = await Order.findById(id);
        if (!foundOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        next(error);
    }
};


// DeleteOrder 

exports.DeleteOrder = async(req,res,next)=>{
    const{id}=req.params;
    validateMongoDbId(id)
    try{

        const foundOrder =  await  Order.findById(id)
        if(!foundOrder){
            res.status(404).json({error: 'Order not found'})
        }

        // Check of order status is not pendding so order will not cancel
        if(foundOrder.status!=='pending'){
            return res.status(400).json({ error: 'Order cannot be cancelled because it is already being prepared or delivered' });
        }

        res.status(200).json({ message: 'Order cancelled successfully', order: foundOrder });

    }catch(error){
       next(error)
    }

}



