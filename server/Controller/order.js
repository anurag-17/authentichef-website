const express = require('express');
const Order = require("../Model/order")
const Cart = require("../Model/cart");
const validateMongoDbId = require("../Utils/validateMongodbId");
const stripe = require('../config/payment');
const Payment = require('../Model/payment');
const Chef = require("../Model/Chef");
const nodemailer = require('nodemailer'); // Import nodemailer
const userMailOptions = require("../Public/userMailOption")
const adminMailOptions = require("../Public/adminMailOption")
require('dotenv').config(); // Import dotenv to use environment variables

// Nodemailer Connection //
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CLIENT_EMAIL,
        pass: process.env.CLIENT_EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Disable SSL verification
    },
});



// exports.PlaceOrder = async (req, res, next) => {
//     try {
//         const { deliveryDate, deliveryInfo, status, paymentMethodToken, payment_method_types, Type_of_Address } = req.body;


//         // Get the cart items
//         const cartItems = await Cart.findOne({ user: req.user._id }).populate({
//             path: "items.menuItem",
//             select: "price"
//         });

//         if (!cartItems || cartItems.items.length === 0) {
//             return res.status(404).json({ message: "Cart is empty" });
//         }

//         // Calculate total amount from updated cart items
//         const totalAmount = cartItems.items.reduce((total, item) => {
//             return total + (item.menuItem.price * item.quantity);
//         }, 0);
//         // Payment with stripe
//         const paymentIntent = await stripe.paymentIntents.create({
//             Name: req.user.name,
//             amount: totalAmount * 100,
//             currency: 'usd',
//             payment_method: paymentMethodToken, // Replace with a valid payment method token
//             payment_method_types: payment_method_types, // paymentmethod and payment_method_types are the same 
//             confirm: true,
//             customer: req.user.stripeCustomerId,
//             metadata: {
//                 UserName: req.user.firstname + ' ' + req.user.lastname,
//                 UserEmail: req.user.email
//             }
//         });

//         if (!paymentIntent) {
//             return res.status(400).json({ message: 'Payment failed' });
//         }


//         // Create a payment record
//         const payment = new Payment({
//             amount: totalAmount,
//             paymentMethod: payment_method_types,
//             status: "completed",
//             transactionId: paymentIntent.id
//         });

//         // Save the payment
//         const savedPayment = await payment.save();

//         if (!savedPayment) {
//             return res.status(400).json({ message: 'Payment Details is not saved' });
//         }

//         // Extract menu items from cart
//         const items = cartItems.items.map(item => ({
//             menuItem: item.menuItem._id,
//             quantity: item.quantity,
//             customization: item.customization
//         }));

//         // Create an order with delivery information
//         const newOrder = new Order({
//             items: items,
//             user: req.user._id,
//             deliveryDate: deliveryDate,
//             deliveryInfo: deliveryInfo,
//             totalAmount: totalAmount,
//             Type_of_Address: Type_of_Address || "Shipping Address",
//             status: status,
//             payment: savedPayment._id,// Assign the _id of the saved payment to the order's payment field,
//             TransactionId: paymentIntent.id
//         });
//         // Save the order
//         const savedOrder = await newOrder.save();

//         if (!savedOrder) {
//             return res.status(400).json({ message: 'Order creation failed' });
//         }
//         // Update the payment with the order ID
//         savedPayment.order = savedOrder._id;
//         paymentIntent.metadata.orderId = savedOrder._id.toString();
//         await savedPayment.save();

//         // Delete the cart after placing the order
//         await Cart.deleteOne({ _id: cartItems._id });

//         res.status(201).json({ message: 'Order created successfully', order: savedOrder });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// Check the Order List //

exports.PlaceOrder = async (req, res, next) => {
    try {
        const { deliveryDate, deliveryInfo, BillingInfo , status, paymentMethodToken, payment_method_types = 'COD', Type_of_Address } = req.body;

        // Get the cart items
        const cartItems = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');


        if (!cartItems || cartItems.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        // Calculate total amount from updated cart items
        const totalAmount = cartItems.items.reduce((total, item) => {
            return total + (item.menuItem.price * item.quantity);
        }, 0);

        let payment, transactionId, paymentIntent;

        if (payment_method_types === 'COD') {
            // Handle Cash on Delivery
            transactionId = 'COD-' + new Date().getTime(); // Generate a unique transaction ID for COD

            payment = new Payment({
                amount: totalAmount,
                paymentMethod: 'COD',
                status: 'pending',
                transactionId: transactionId
            });

            const savedPayment = await payment.save();

            if (!savedPayment) {
                return res.status(400).json({ message: 'Payment details could not be saved' });
            }
        } else {
            // Payment with Stripe
            paymentIntent = await stripe.paymentIntents.create({
                amount: totalAmount * 100, // Amount in cents
                currency: 'usd',
                payment_method: paymentMethodToken,
                payment_method_types: [payment_method_types],
                confirm: true,
                customer: req.user.stripeCustomerId,
                metadata: {
                    UserName: `${req.user.firstname} ${req.user.lastname}`,
                    UserEmail: req.user.email
                },
                return_url: 'http://www.authentichef.com/' // Add your actual return URL here
            });

            if (!paymentIntent) {
                return res.status(400).json({ message: 'Payment failed' });
            }

            transactionId = paymentIntent.id;

            payment = new Payment({
                amount: totalAmount,
                paymentMethod: payment_method_types,
                status: 'completed',
                transactionId: transactionId
            });

            const savedPayment = await payment.save();

            if (!savedPayment) {
                return res.status(400).json({ message: 'Payment details could not be saved' });
            }
        }

        // Extract menu items from cart
        const items = cartItems.items.map(item => ({
            menuItem: item.menuItem._id,
            quantity: item.quantity,
            customization: item.customization,
            price: item.menuItem.price,
            ProfileImage: item.menuItem.ProfileImage,
            name: item.menuItem.name
        }));

        // Create an order with delivery information
        const newOrder = new Order({
            items,
            user: req.user._id,
            deliveryDate,
            deliveryInfo,
            BillingInfo,
            totalAmount,
            Type_of_Address: Type_of_Address || 'Shipping Address',
            status,
            payment: payment._id,
            TransactionId: transactionId // Include the transaction ID in the order
        });

        const savedOrder = await newOrder.save();

        if (!savedOrder) {
            return res.status(400).json({ message: 'Order creation failed' });
        }

        // Update the payment with the order ID
        payment.order = savedOrder._id;

        if (payment_method_types !== 'COD' && paymentIntent) {
            paymentIntent.metadata.orderId = savedOrder._id.toString();
            await stripe.paymentIntents.update(paymentIntent.id, {
                metadata: { orderId: savedOrder._id.toString() }
            });
        }

        await payment.save();

        // Delete the cart after placing the order
        await Cart.deleteOne({ _id: cartItems._id });

        // Send confirmation email to the user
       // Send confirmation email to the user
       const emailOptions = userMailOptions(req, savedOrder, deliveryDate, deliveryInfo, totalAmount, cartItems, payment_method_types);
        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email to user:', error);
            } else {
                console.log('Email sent to user:', info.response);
            }
        });

        // Send notification email to the admin
        // Send notification email to the admin
        const adminoptions = adminMailOptions(req, savedOrder, deliveryDate, deliveryInfo, payment_method_types, totalAmount ,cartItems)
        transporter.sendMail(adminoptions, (error, info) => {
            if (error) {
                console.error('Error sending email to admin:', error);
            } else {
                console.log('Email sent to admin:', info.response);
            }
        });


        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.OrderList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const currentPage = parseInt(page, 10);
        const itemsPerPage = parseInt(limit, 10);

        let orderQuery = Order.find({ user: req.user._id }).populate('payment'); // Filter by user_id

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

exports.DeleteOrder = async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {

        const foundOrder = await Order.findById(id)
        if (!foundOrder) {
            res.status(404).json({ error: 'Order not found' })
        }

        // Check of order status is not pendding so order will not cancel
        if (foundOrder.status !== 'pending') {
            return res.status(400).json({ error: 'Order cannot be cancelled because it is already being prepared or delivered' });
        }

        res.status(200).json({ message: 'Order cancelled successfully', order: foundOrder });

    } catch (error) {
        next(error)
    }

}



// Now I have to count of the order of the Chef and  Order list


exports.getChefAndOrderCounts = async (req, res, next) => {
    try {
        // Count documents in Chef and Order collections
        const chefCount = await Chef.countDocuments();
        const orderCount = await Order.countDocuments();

        // Send response with the counts
        res.status(200).json({ chefCount, orderCount });
    } catch (error) {
        // Log error for debugging purposes (optional)
        console.error('Error fetching counts:', error);

        // Pass the error to the next middleware
        next(error);
    }
};

