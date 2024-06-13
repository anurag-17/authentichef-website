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
const sendEmail = require('../Utils/SendEmail');
const Coupon = require("../Model/Coupon");
const User = require("../Model/User")
const sessionData = require("../Model/session")
const{createShipment}=require("./ShiptheoryController")
require('dotenv').config(); // Import dotenv to use environment variables

// Define your email credentials and configuration
const emailConfig = {
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: process.env.CLIENT_EMAIL,
        pass: process.env.CLIENT_EMAIL_PASSWORD,
    },
};

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(emailConfig);


// Check the Order List //

// exports.PlaceOrder = async (req, res, next) => {
//     try {
//         const { deliveryDate, deliveryInfo, BillingInfo , status, paymentMethodToken, payment_method_types = 'COD', Type_of_Address , Delivery_instruction , Promo_code } = req.body;

//         // Get the cart items
//         const cartItems = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');


//         if (!cartItems || cartItems.items.length === 0) {
//             return res.status(404).json({ message: "Cart is empty" });
//         }

//         // Calculate total amount from updated cart items
//         const totalAmount = cartItems.items.reduce((total, item) => {
//             return total + (item.menuItem.price * item.quantity);
//         }, 0);

//         let payment, transactionId, paymentIntent;

//         if (payment_method_types === 'COD') {
//             // Handle Cash on Delivery
//             transactionId = 'COD-' + new Date().getTime(); // Generate a unique transaction ID for COD

//             payment = new Payment({
//                 amount: totalAmount,
//                 paymentMethod: 'COD',
//                 status: 'pending',
//                 transactionId: transactionId
//             });

//             const savedPayment = await payment.save();

//             if (!savedPayment) {
//                 return res.status(400).json({ message: 'Payment details could not be saved' });
//             }
//         } else {
//             // Payment with Stripe
//             paymentIntent = await stripe.paymentIntents.create({
//                 amount: totalAmount * 100, // Amount in cents
//                 currency: 'usd',
//                 payment_method: paymentMethodToken,
//                 payment_method_types: [payment_method_types],
//                 confirm: true,
//                 customer: req.user.stripeCustomerId,
//                 metadata: {
//                     UserName: `${req.user.firstname} ${req.user.lastname}`,
//                     UserEmail: req.user.email
//                 },
//                 return_url: 'http://www.authentichef.com/' // Add your actual return URL here
//             });

//             if (!paymentIntent) {
//                 return res.status(400).json({ message: 'Payment failed' });
//             }

//             transactionId = paymentIntent.id;

//             payment = new Payment({
//                 amount: totalAmount,
//                 paymentMethod: payment_method_types,
//                 status: 'completed',
//                 transactionId: transactionId
//             });

//             const savedPayment = await payment.save();

//             if (!savedPayment) {
//                 return res.status(400).json({ message: 'Payment details could not be saved' });
//             }
//         }

//         // Extract menu items from cart
//         const items = cartItems.items.map(item => ({
//             menuItem: item.menuItem._id,
//             quantity: item.quantity,
//             customization: item.customization,
//             price: item.menuItem.price,
//             ProfileImage: item.menuItem.ProfileImage,
//             name: item.menuItem.name
//         }));

//         // Create an order with delivery information
//         const newOrder = new Order({
//             items,
//             user: req.user._id,
//             deliveryDate,
//             Delivery_instruction,
//             Promo_code,
//             deliveryInfo,
//             BillingInfo,
//             totalAmount,
//             Type_of_Address: Type_of_Address || 'Shipping Address',
//             status,
//             payment: payment._id,
//             TransactionId: transactionId // Include the transaction ID in the order
//         });

//         const savedOrder = await newOrder.save();

//         if (!savedOrder) {
//             return res.status(400).json({ message: 'Order creation failed' });
//         }

//         // Update the payment with the order ID
//         payment.order = savedOrder._id;

//         if (payment_method_types !== 'COD' && paymentIntent) {
//             paymentIntent.metadata.orderId = savedOrder._id.toString();
//             await stripe.paymentIntents.update(paymentIntent.id, {
//                 metadata: { orderId: savedOrder._id.toString() }
//             });
//         }

//         await payment.save();

//         // Delete the cart after placing the order
//         await Cart.deleteOne({ _id: cartItems._id });

//         // Send confirmation email to the user
//        // Send confirmation email to the user
//        const emailOptions = userMailOptions(req, savedOrder, deliveryDate, deliveryInfo, totalAmount, cartItems, payment_method_types);
//         transporter.sendMail(emailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email to user:', error);
//             } else {
//                 console.log('Email sent to user:', info.response);
//             }
//         });

//         // Send notification email to the admin
//         // Send notification email to the admin
//         const adminoptions = adminMailOptions(req, savedOrder, deliveryDate, deliveryInfo, payment_method_types, totalAmount ,cartItems)
//         transporter.sendMail(adminoptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email to admin:', error);
//             } else {
//                 console.log('Email sent to admin:', info.response);
//             }
//         });


//         res.status(201).json({ message: 'Order created successfully', order: savedOrder });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// Check the Order List //



// ----------  Working code on Production ----------------------------
// exports.PlaceOrder = async (req, res, next) => {
//     try {
//         const { deliveryDate, deliveryInfo, BillingInfo, status, paymentMethodToken, payment_method_types = 'COD', Type_of_Address, Delivery_instruction, Promo_code } = req.body;

//         // Get the cart items
//         const cartItems = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');

//         if (!cartItems || cartItems.items.length === 0) {
//             return res.status(404).json({ message: "Cart is empty" });
//         }

//         // Calculate total amount from updated cart items
//         let totalAmount = cartItems.items.reduce((total, item) => {
//             return total + (item.menuItem.price * item.quantity);
//         }, 0);



//         let discountApplied = 0;
//         let DiscountPercentage = 0;

//         // Check if promo code is provided and valid
//         if (Promo_code) {
//             const coupon = await Coupon.findOne({ code: Promo_code, isActive: true });
//             if (coupon) {
//                 // Check if total amount is above $500
//                 if (totalAmount > 100) {
//                     if (coupon.discountType === 'percentage') {
//                         discountApplied = (coupon.discountValue / 100) * totalAmount;
//                         DiscountPercentage = coupon.discountValue; // Store the percentage value
//                     } else if (coupon.discountType === 'fixed') {
//                         discountApplied = coupon.discountValue;
//                     }
//                 } else {
//                     // Total amount is not eligible for the promo code
//                     console.log("Total amount is below $500. Promo code cannot be applied.");
//                 }
//             } else {
//                 // Promo code is not valid or active
//                 console.log("Invalid or inactive promo code.");
//             }
//         }

//         // Calculate total amount after applying discount
//         const totalAmountBeforeDiscount = totalAmount
//         console.log("TotalAmountBeforeDisCount" ,totalAmountBeforeDiscount )
//         totalAmount -= discountApplied;

//         let payment, transactionId, paymentIntent;

//         if (payment_method_types === 'COD') {
//             // Handle Cash on Delivery
//             transactionId = 'COD-' + new Date().getTime(); // Generate a unique transaction ID for COD

//             payment = new Payment({
//                 amount: totalAmount,
//                 paymentMethod: 'COD',
//                 status: 'pending',
//                 transactionId: transactionId
//             });

//             const savedPayment = await payment.save();

//             if (!savedPayment) {
//                 return res.status(400).json({ message: 'Payment details could not be saved' });
//             }
//         } else {
//             // Payment with Stripe
//             paymentIntent = await stripe.paymentIntents.create({
//                 amount: totalAmount * 100, // Amount in cents
//                 currency: 'usd',
//                 payment_method: paymentMethodToken,
//                 payment_method_types: [payment_method_types],
//                 confirm: true,
//                 customer: req.user.stripeCustomerId,
//                 metadata: {
//                     UserName: `${req.user.firstname} ${req.user.lastname}`,
//                     UserEmail: req.user.email
//                 },
//                 return_url: 'http://www.authentichef.com/' // Add your actual return URL here
//             });

//             if (!paymentIntent) {
//                 return res.status(400).json({ message: 'Payment failed' });
//             }

//             transactionId = paymentIntent.id;

//             payment = new Payment({
//                 amount: totalAmount,
//                 paymentMethod: payment_method_types,
//                 status: 'completed',
//                 transactionId: transactionId
//             });

//             const savedPayment = await payment.save();

//             if (!savedPayment) {
//                 return res.status(400).json({ message: 'Payment details could not be saved' });
//             }
//         }

//         // Extract menu items from cart
//         const items = cartItems.items.map(item => ({
//             menuItem: item.menuItem._id,
//             quantity: item.quantity,
//             customization: item.customization,
//             price: item.menuItem.price,
//             ProfileImage: item.menuItem.ProfileImage,
//             name: item.menuItem.name
//         }));

//         // Create an order with delivery information
//         const newOrder = new Order({
//             items,
//             user: req.user._id,
//             deliveryDate,
//             Delivery_instruction,
//             Promo_code,
//             deliveryInfo,
//             BillingInfo,
//             totalAmount,
//             discountApplied,
//             totalAmountBeforeDiscount,
//             DiscountPercentage,
//             Type_of_Address: Type_of_Address || 'Shipping Address',
//             status,
//             payment: payment._id,
//             TransactionId: transactionId // Include the transaction ID in the order
//         });

//         const savedOrder = await newOrder.save();

//         if (!savedOrder) {
//             return res.status(400).json({ message: 'Order creation failed' });
//         }

//         // Update the payment with the order ID
//         payment.order = savedOrder._id;

//         if (payment_method_types !== 'COD' && paymentIntent) {
//             paymentIntent.metadata.orderId = savedOrder._id.toString();
//             await stripe.paymentIntents.update(paymentIntent.id, {
//                 metadata: { orderId: savedOrder._id.toString() }
//             });
//         }

//         await payment.save();

//         // Delete the cart after placing the order
//         await Cart.deleteOne({ _id: cartItems._id });

//         // Send confirmation email to the user
//         const emailOptions = userMailOptions(req, savedOrder, deliveryDate, deliveryInfo, totalAmount, cartItems, payment_method_types);
//         transporter.sendMail(emailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email to user:', error);
//             } else {
//                 console.log('Email sent to user:', info.response);
//             }
//         });

//         // Send notification email to the admin
//         const adminoptions = adminMailOptions(req, savedOrder, deliveryDate, deliveryInfo, payment_method_types, totalAmount, cartItems)
//         transporter.sendMail(adminoptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email to admin:', error);
//             } else {
//                 console.log('Email sent to admin:', info.response);
//             }
//         });

//         // Send response with order and applied discount
//         res.status(201).json({
//             message: 'Order created successfully', order: savedOrder
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// Working code on Production ----------------------------
exports.PlaceOrder = async (req, res, next) => {
    try {
        const { deliveryDate, deliveryInfo, BillingInfo, status, paymentMethodToken, payment_method_types = 'COD', Type_of_Address, Delivery_instruction, Promo_code } = req.body;

        // Get the cart items
        const cartItems = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');

        if (!cartItems || cartItems.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        // Calculate total amount from updated cart items
        let totalAmount = cartItems.items.reduce((total, item) => {
            return total + (item.menuItem.price * item.quantity);
        }, 0);


        console.log("Total amount before discount:", totalAmount)



        let discountApplied = 0;
        let DiscountPercentage = 0;

        // Check if this is the user's first order and a promo code is provided
        const userOrder = await Order.find({ user: req.user._id });

        if (userOrder.length === 0) {
            if (Promo_code) {
                console.log("First Order with Promo Code");
                const coupon = await Coupon.findOne({ code: Promo_code , isActive: true });
                if (coupon) {
                    // Apply discount if conditions are met
                    if (totalAmount > 0) {
                        console.log("Total amount is above $0. Proceed with applying promo code.", totalAmount)
                        if (coupon.discountType === 'percentage') {
                            console.log("Discount value:", coupon.discountValue)
                            discountApplied = (coupon.discountValue / 100) * totalAmount;
                            console.log("Discount Applied:", discountApplied)
                            DiscountPercentage = coupon.discountValue;

                            console.log("Discount Percentage:", DiscountPercentage)
                            console.log("Total Amount Before Discount:", totalAmount)
                        } else if (coupon.discountType === 'fixed') {
                            discountApplied = coupon.discountValue;
                        }
                    } else {
                        console.log("Total amount is below $0. Promo code cannot be applied.");
                        return res.status(400).json({ message: "Total amount is below $0. Promo code cannot be applied." });
                    }
                } else {
                    console.log("Invalid or inactive promo code.");
                    return res.status(400).json({ message: "Invalid or inactive promo code." });
                }
            } else {
                console.log("First Order without promo code");
                // Proceed with order without applying any discount
            }
        } else if (Promo_code) {
            console.log("Not the first order. Promo code cannot be applied.");
            return res.status(400).json({ message: 'You have already used the promo code' });
        }

        // Calculate total amount after applying discount
        const totalAmountBeforeDiscount = totalAmount;
        totalAmount -= discountApplied;

        console.log("Total amount after discount:", totalAmount)

        // Determine the shipping cost based on the total amount after discount
        let shippingCost = cartItems.Shipping_cost;
        if (totalAmount > 55) {
            shippingCost = 0; // Free shipping for orders above £55
        }
        totalAmount += shippingCost; // Add shipping cost

        // Format totalAmount to two decimal places
        totalAmount = parseFloat(totalAmount.toFixed(2));

        // if (totalAmount < 30) {
        //     return res.status(400).json({ message: 'Order cannot be placed. Minimum order amount is £30.' });
        // }


        let payment, transactionId;

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

            // Extract menu items from cart
            const items = cartItems.items.map(item => ({
                menuItem: item.menuItem._id,
                quantity: item.quantity,
                customization: item.customization,
                price: item.menuItem.price,
                ProfileImage: item.menuItem.ProfileImage,
                name: item.menuItem.name,
                weight:item.menuItem.weight
            }));

            console.log("Items", items)

            // Create an order with delivery information
            const newOrder = new Order({
                items,
                user: req.user._id,
                deliveryDate,
                Delivery_instruction,
                Promo_code,
                deliveryInfo,
                BillingInfo,
                totalAmount,
                discountApplied,
                totalAmountBeforeDiscount,
                DiscountPercentage,
                Type_of_Address: Type_of_Address || 'Shipping Address',
                status,
                shippingCharge: shippingCost,
                payment: payment._id,
                TransactionId: transactionId // Include the transaction ID in the order
            });

            const savedOrder = await newOrder.save();

            // Also Update the Billing and shipping Address

            const user = await User.findById(req.user._id);
            user.BillingInfo = BillingInfo;
            user.deliveryInfo = deliveryInfo;

            user.save();

            if (!savedOrder) {
                return res.status(400).json({ message: 'Order creation failed' });
            }

            // Update the payment with the order ID
            payment.order = savedOrder._id;
            await payment.save();

            // save the order in Shiptheory
            await createShipment(savedOrder , user);
            // Delete the cart after placing the order

            await Cart.deleteOne({ _id: cartItems._id });

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
            const adminoptions = adminMailOptions(req, savedOrder, deliveryDate, deliveryInfo, payment_method_types, totalAmount, cartItems);
            transporter.sendMail(adminoptions, (error, info) => {
                if (error) {
                    console.error('Error sending email to admin:', error);
                } else {
                    console.log('Email sent to admin:', info.response);
                }
            });

            // Send response with order and applied discount
            res.status(201).json({
                message: 'Order created successfully',
                order: savedOrder
            });

        } else {
            // Payment with Stripe Checkout Session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: cartItems.items.map(item => ({
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: item.menuItem.name,
                            images: [item.menuItem.ProfileImage[0]] // Add image URL
                        },
                        unit_amount: item.menuItem.price * 100,
                    },
                    quantity: item.quantity,
                })),
                mode: 'payment',
                discounts: [
                    {
                        coupon: Promo_code
                    }
                ],
                customer: req.user.stripeCustomerId,
                success_url: 'http://www.authentichef.com/thankyou?session_id={CHECKOUT_SESSION_ID}',
                cancel_url: 'http://www.authentichef.com',
                metadata: {
                    userId: req.user._id.toString(),
                    deliveryDate: deliveryDate,
                    deliveryInfo: JSON.stringify(deliveryInfo),
                    BillingInfo: JSON.stringify(BillingInfo),
                    Type_of_Address: Type_of_Address || 'Shipping Address',
                    Delivery_instruction: Delivery_instruction,
                    Promo_code: Promo_code,
                    totalAmountBeforeDiscount: totalAmountBeforeDiscount,
                    discountApplied: discountApplied,
                    DiscountPercentage: DiscountPercentage,

                }
            });

            // Send the session ID in the response-----------

            const sessionDetails = await sessionData.findOneAndUpdate(
                { userId: req.user._id },
                { sessionId: session.id, successUrl: session.success_url },
                { new: true, upsert: true }
            )

            console.log("Session Details", sessionDetails)

            // send session in Shiptheory


          //------------------------

            res.status(200).json({
                message: 'Checkout session created successfully',
                sessionId: session.id,
                sessionUrl: session.url,
                // Include the session URL in the response

            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// make a api to create a coupon //

exports.CreateCouponStripe = async (req, res) => {
    try {
      const { percentOff, duration, name, currency, maxRedemptions, redeemBy } = req.body;
      const couponParams = {
        percent_off: percentOff,
        duration: duration,
        name: name,
        currency: currency,
      };
  
      if (duration === 'repeating') {
        // If the duration is repeating, ensure duration_in_months is set
        couponParams.duration_in_months = req.body.duration_in_months; // Assuming duration_in_months is provided in req.body
      }
  
      if (maxRedemptions) {
        couponParams.max_redemptions = maxRedemptions;
      }
  
      if (redeemBy) {
        couponParams.redeem_by = redeemBy;
      }
  
      const coupon = await stripe.coupons.create(couponParams);
  
      // Store coupon details in your database
      const newCoupon = new Coupon({
        code: coupon.id,
        isActive: true,
        discountValue: percentOff,
        duration: duration,
        duration_in_months: req.body.duration_in_months, // Store duration_in_months if provided
        name: name,
        currency: currency,
        maxRedemptions: maxRedemptions,
        expiryDate: redeemBy,
      });
  
      await newCoupon.save();
  
      res.status(200).json({ message: 'Coupon created successfully', coupon });
    } catch (error) {
      console.error('Error creating coupon:', error);
      res.status(500).send('Error creating coupon');
    }
  };



// Delete the Coupon //

exports.DeleteCouponStripe = async (req, res) => {
    try {
        const { couponId } = req.params;
        const coupon = await stripe.coupons.del(couponId);
        res.status(200).json({ message: 'Coupon deleted successfully', coupon });
    } catch (error) {
        console.error('Error deleting coupon:', error);
        res.status(500).send('Error deleting coupon');
    }

}


// Working

// exports.BookOrder = async (req, res) => {
//     const { sessionId } = req.body;

//     try {
//         // Retrieve the checkout session from Stripe
//         const session = await stripe.checkout.sessions.retrieve(sessionId);

//         // Ensure the session is valid and belongs to the authenticated user
//         if (!session || session.metadata.userId !== req.user._id.toString()) {
//             return res.status(403).json({ message: 'Unauthorized' });
//         }

//         const userId = session.metadata.userId;
//         const deliveryDate = session.metadata.deliveryDate;
//         const deliveryInfo = JSON.parse(session.metadata.deliveryInfo);
//         const BillingInfo = JSON.parse(session.metadata.BillingInfo);
//         const Type_of_Address = session.metadata.Type_of_Address;
//         const Delivery_instruction = session.metadata.Delivery_instruction;
//         const Promo_code = session.metadata.Promo_code;
//         const totalAmountBeforeDiscount = parseFloat(session.metadata.totalAmountBeforeDiscount);
//         const discountApplied = parseFloat(session.metadata.discountApplied);
//         const DiscountPercentage = parseFloat(session.metadata.DiscountPercentage);

//         // Get the cart items
//         const cartItems = await Cart.findOne({ user: userId }).populate('items.menuItem');

//         if (!cartItems || cartItems.items.length === 0) {
//             return res.status(404).json({ message: "Cart is empty or not found" });
//         }

//         // Extract menu items from cart
//         const items = cartItems.items.map(item => ({
//             menuItem: item.menuItem._id,
//             quantity: item.quantity,
//             customization: item.customization,
//             price: item.menuItem.price,
//             ProfileImage: item.menuItem.ProfileImage,
//             name: item.menuItem.name
//         }));

//         // Create an order
//         const newOrder = new Order({
//             items,
//             user: userId,
//             deliveryDate,
//             Delivery_instruction,
//             Promo_code,
//             deliveryInfo,
//             BillingInfo,
//             totalAmount: session.amount_total / 100,
//             discountApplied,
//             totalAmountBeforeDiscount,
//             DiscountPercentage,
//             Type_of_Address: Type_of_Address || 'Shipping Address',
//             payment: null,
//             TransactionId: session.payment_intent,
//             payment_method_types: 'card',
//             TotalAmount: session.amount_total / 100,
//             // Include the transaction ID in the order
//         });


//         // check if Trascation id is null then show 400 error
//         if (!session.payment_intent) {
//             return res.status(400).json({ message: 'Complete Your Payment Process' });
//         }

//         const savedOrder = await newOrder.save();

//         if (!savedOrder) {
//             return res.status(400).json({ message: 'Order creation failed' });
//         }

//         // Create a payment record
//         const payment = new Payment({
//             amount: session.amount_total / 100,
//             paymentMethod: 'card',
//             status: 'completed',
//             transactionId: session.payment_intent,
//             order: savedOrder._id
//         });

//         await payment.save();

//         // Link the payment to the order
//         savedOrder.payment = payment._id;
//         await savedOrder.save();

//         // Delete the cart after placing the order
//         await Cart.deleteOne({ _id: cartItems._id });

//         // Send confirmation email to the user
//         const emailOptions = userMailOptions(req, savedOrder, deliveryDate, deliveryInfo, session.amount_total / 100, cartItems, session.payment_method_types);
//         transporter.sendMail(emailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email to user:', error);
//             } else {
//                 console.log('Email sent to user:', info.response);
//             }
//         });

//         // Send notification email to the admin
//         const adminoptions = adminMailOptions(req, savedOrder, deliveryDate, deliveryInfo, session.payment_method_types, session.amount_total / 100, cartItems);
//         transporter.sendMail(adminoptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email to admin:', error);
//             } else {
//                 console.log('Email sent to admin:', info.response);
//             }
//         });

//         res.status(200).json({ message: 'Order placed successfully' });
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// }

exports.BookOrder = async (req, res) => {
    const { sessionId } = req.body;

    try {
        // Retrieve the checkout session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Ensure the session is valid and belongs to the authenticated user
        if (!session || session.metadata.userId !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Validate and parse session metadata
        const userId = session.metadata.userId;
        const deliveryDate = session.metadata.deliveryDate;
        const deliveryInfo = validateAndParseJson(session.metadata.deliveryInfo, 'deliveryInfo');
        const BillingInfo = validateAndParseJson(session.metadata.BillingInfo, 'BillingInfo');
        const Type_of_Address = session.metadata.Type_of_Address || 'Shipping Address';
        const Delivery_instruction = session.metadata.Delivery_instruction || '';
        const Promo_code = session.metadata.Promo_code || '';
        const totalAmountBeforeDiscount = parseFloat(session.metadata.totalAmountBeforeDiscount) || 0;
        const discountApplied = parseFloat(session.metadata.discountApplied) || 0;
        const DiscountPercentage = parseFloat(session.metadata.DiscountPercentage) || 0;

        // Get the cart items
        const cartItems = await Cart.findOne({ user: userId }).populate('items.menuItem');

        if (!cartItems || cartItems.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty or not found" });
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

        // Create an order
        const newOrder = new Order({
            items,
            user: userId,
            deliveryDate,
            Delivery_instruction,
            Promo_code,
            deliveryInfo,
            BillingInfo,
            totalAmount: session.amount_total / 100,
            discountApplied,
            totalAmountBeforeDiscount,
            DiscountPercentage,
            Type_of_Address,
            payment: null,
            TransactionId: session.payment_intent,
            payment_method_types: 'card'
        });

        // Check if transaction ID is null
        if (!session.payment_intent) {
            return res.status(400).json({ message: 'Complete Your Payment Process' });
        }

        const savedOrder = await newOrder.save();

        if (!savedOrder) {
            return res.status(400).json({ message: 'Order creation failed' });
        }

        // Create a payment record
        const payment = new Payment({
            amount: session.amount_total / 100,
            paymentMethod: 'card',
            status: 'completed',
            transactionId: session.payment_intent,
            order: savedOrder._id
        });

        await payment.save();

        // Link the payment to the order
        savedOrder.payment = payment._id;
        await savedOrder.save();

        // save the order in Shiptheory
        const shipmentCart = await createShipment(savedOrder);
        console.log("Shipment Cart", shipmentCart);

        // Delete the cart after placing the order
        await Cart.deleteOne({ _id: cartItems._id });

        // Send confirmation email to the user
        const emailOptions = userMailOptions(req, savedOrder, deliveryDate, deliveryInfo, session.amount_total / 100, cartItems, session.payment_method_types);
        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email to user:', error);
            } else {
                console.log('Email sent to user:', info.response);
            }
        });

        // Send notification email to the admin
        const adminoptions = adminMailOptions(req, savedOrder, deliveryDate, deliveryInfo, session.payment_method_types, session.amount_total / 100, cartItems);
        transporter.sendMail(adminoptions, (error, info) => {
            if (error) {
                console.error('Error sending email to admin:', error);
            } else {
                console.log('Email sent to admin:', info.response);
            }
        });

        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const validateAndParseJson = (jsonString, fieldName) => {
    try {
        if (!jsonString) {
            console.error(`${fieldName} is undefined or empty.`);
            return null;
        }
        return JSON.parse(jsonString);
    } catch (error) {
        console.error(`Error parsing JSON for ${fieldName}:`, error);
        return null;
    }
};


// Make a api to get a session id//

exports.GetSessionId = async (req, res) => {

    try{

        const userId = req.user._id; 
        const sessionDetails = await sessionData.findOne({ userId });
        if (!sessionDetails) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json({
            message: 'Success URL retrieved successfully',
            success: sessionDetails
        });

    }
    catch(error){
      res.status(500).json({ message: 'Internal server error' });
    }
}




// Make a api to cancel the order //







// exports.PlaceOrder = async (req, res, next) => {
//     try {
//       const { deliveryDate, deliveryInfo, BillingInfo, status, paymentMethodToken, payment_method_types = 'COD', Type_of_Address, Delivery_instruction, Promo_code } = req.body;

//       // Get the cart items
//       const cartItems = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');

//       if (!cartItems || cartItems.items.length === 0) {
//         return res.status(404).json({ message: "Cart is empty" });
//       }

//       // Calculate total amount from updated cart items
//       let totalAmount = cartItems.items.reduce((total, item) => {
//         return total + (item.menuItem.price * item.quantity);
//       }, 0);

//       console.log("Total amount before discount:", totalAmount);

//       let discountApplied = 0;
//       let DiscountPercentage = 0;

//       // Check if this is the user's first order and a promo code is provided
//       const userOrder = await Order.find({ user: req.user._id });

//       if (userOrder.length === 0) {
//         if (Promo_code) {
//           console.log("First Order with Promo Code");
//           const coupon = await Coupon.findOne({ code: Promo_code, isActive: true });
//           if (coupon) {
//             // Apply discount if conditions are met
//             if (totalAmount > 0) {
//               console.log("Total amount is above $0. Proceed with applying promo code.", totalAmount);
//               if (coupon.discountType === 'percentage') {
//                 console.log("Discount value:", coupon.discountValue);
//                 discountApplied = (coupon.discountValue / 100) * totalAmount;
//                 console.log("Discount Applied:", discountApplied);
//                 DiscountPercentage = coupon.discountValue;
//                 console.log("Discount Percentage:", DiscountPercentage);
//                 console.log("Total Amount Before Discount:", totalAmount);
//               } else if (coupon.discountType === 'fixed') {
//                 discountApplied = coupon.discountValue;
//               }
//             } else {
//               console.log("Total amount is below $0. Promo code cannot be applied.");
//               return res.status(400).json({ message: "Total amount is below $0. Promo code cannot be applied." });
//             }
//           } else {
//             console.log("Invalid or inactive promo code.");
//             return res.status(400).json({ message: "Invalid or inactive promo code." });
//           }
//         } else {
//           console.log("First Order without promo code");
//           // Proceed with order without applying any discount
//         }
//       } else if (Promo_code) {
//         console.log("Not the first order. Promo code cannot be applied.");
//         return res.status(400).json({ message: 'You have already used the promo code' });
//       }

//       // Calculate total amount after applying discount
//       const totalAmountBeforeDiscount = totalAmount;
//       totalAmount -= discountApplied;

//       console.log("Total amount after discount:", totalAmount);

//       // Determine the shipping cost based on the total amount after discount
//       let shippingCost = cartItems.Shipping_cost;
//       if (totalAmount > 55) {
//         shippingCost = 0; // Free shipping for orders above £55
//       }
//       totalAmount += shippingCost; // Add shipping cost

//       // Format totalAmount to two decimal places
//       totalAmount = parseFloat(totalAmount.toFixed(2));

//       let payment, transactionId;

//       if (payment_method_types === 'COD') {
//         // Handle Cash on Delivery
//         transactionId = 'COD-' + new Date().getTime(); // Generate a unique transaction ID for COD

//         payment = new Payment({
//           amount: totalAmount,
//           paymentMethod: 'COD',
//           status: 'pending',
//           transactionId: transactionId
//         });

//         const savedPayment = await payment.save();

//         if (!savedPayment) {
//           return res.status(400).json({ message: 'Payment details could not be saved' });
//         }

//         // Extract menu items from cart
//         const items = cartItems.items.map(item => ({
//           menuItem: item.menuItem._id,
//           quantity: item.quantity,
//           customization: item.customization,
//           price: item.menuItem.price,
//           ProfileImage: item.menuItem.ProfileImage,
//           name: item.menuItem.name
//         }));

//         // Create an order with delivery information
//         const newOrder = new Order({
//           items,
//           user: req.user._id,
//           deliveryDate,
//           Delivery_instruction,
//           Promo_code,
//           deliveryInfo,
//           BillingInfo,
//           totalAmount,
//           discountApplied,
//           totalAmountBeforeDiscount,
//           DiscountPercentage,
//           Type_of_Address: Type_of_Address || 'Shipping Address',
//           status,
//           shippingCharge: shippingCost,
//           payment: payment._id,
//           TransactionId: transactionId // Include the transaction ID in the order
//         });

//         const savedOrder = await newOrder.save();

//         if (!savedOrder) {
//           return res.status(400).json({ message: 'Order creation failed' });
//         }

//         // Update the payment with the order ID
//         payment.order = savedOrder._id;
//         await payment.save();

//         // Delete the cart after placing the order
//         await Cart.deleteOne({ _id: cartItems._id });

//         // Send confirmation email to the user
//         const emailOptions = userMailOptions(req, savedOrder, deliveryDate, deliveryInfo, totalAmount, cartItems, payment_method_types);
//         transporter.sendMail(emailOptions, (error, info) => {
//           if (error) {
//             console.error('Error sending email to user:', error);
//           } else {
//             console.log('Email sent to user:', info.response);
//           }
//         });

//         // Send notification email to the admin
//         const adminoptions = adminMailOptions(req, savedOrder, deliveryDate, deliveryInfo, payment_method_types, totalAmount, cartItems);
//         transporter.sendMail(adminoptions, (error, info) => {
//           if (error) {
//             console.error('Error sending email to admin:', error);
//           } else {
//             console.log('Email sent to admin:', info.response);
//           }
//         });

//         // Send response with order and applied discount
//         res.status(201).json({
//           message: 'Order created successfully',
//           order: savedOrder
//         });

//       } else {
//         // Payment with Stripe Checkout Session
//         const session = await stripe.checkout.sessions.create({
//           payment_method_types: ['card'],
//           line_items: cartItems.items.map(item => ({
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: item.menuItem.name
//               },
//               unit_amount: item.menuItem.price * 100,
//             },
//             quantity: item.quantity,
//           })),
//           mode: 'payment',
//           customer: req.user.stripeCustomerId,
//           success_url: 'http://www.authentichef.com/success?session_id={CHECKOUT_SESSION_ID}',
//           cancel_url: 'http://www.authentichef.com/cancel',
//           metadata: {
//             userId: req.user._id.toString(),
//             deliveryDate: deliveryDate.toString(),
//             deliveryInfo: JSON.stringify(deliveryInfo),
//             BillingInfo: JSON.stringify(BillingInfo),
//             Type_of_Address: Type_of_Address || 'Shipping Address',
//             Delivery_instruction: Delivery_instruction,
//             Promo_code: Promo_code,
//             totalAmountBeforeDiscount: totalAmountBeforeDiscount,
//             discountApplied: discountApplied,
//             DiscountPercentage: DiscountPercentage,
//             status: status,
//           }
//         });

//         // Extract transaction ID from payment intent
//         transactionId = session.payment_intent;

//         console.log("Transaction ID:", transactionId);

//         // Create a new payment entry
//         payment = new Payment({
//           amount: totalAmount,
//           paymentMethod: 'card',
//           status: 'pending',
//           transactionId: transactionId
//         });

//         const savedPayment = await payment.save();

//         if (!savedPayment) {
//           return res.status(400).json({ message: 'Payment details could not be saved' });
//         }

//         // Extract menu items from cart
//         const items = cartItems.items.map(item => ({
//           menuItem: item.menuItem._id,
//           quantity: item.quantity,
//           customization: item.customization,
//           price: item.menuItem.price,
//           ProfileImage: item.menuItem.ProfileImage,
//           name: item.menuItem.name
//         }));

//         // Create an order with delivery information
//         const newOrder = new Order({
//           items,
//           user: req.user._id,
//           deliveryDate,
//           Delivery_instruction,
//           Promo_code,
//           deliveryInfo,
//           BillingInfo,
//           totalAmount,
//           discountApplied,
//           totalAmountBeforeDiscount,
//           DiscountPercentage,
//           Type_of_Address: Type_of_Address || 'Shipping Address',
//           status,
//           shippingCharge: shippingCost,
//           payment: payment._id,
//           TransactionId: transactionId // Include the transaction ID in the order
//         });

//         const savedOrder = await newOrder.save();

//         if (!savedOrder) {
//           return res.status(400).json({ message: 'Order creation failed' });
//         }

//         // Update the payment with the order ID
//         payment.order = savedOrder._id;
//         await payment.save();

//         // Delete the cart after placing the order
//         await Cart.deleteOne({ _id: cartItems._id });

//         // Send response with order and applied discount
//         res.status(200).json({
//           message: 'Checkout session created successfully',
//           sessionId: session.id,
//           sessionUrl: session.url, // Include the session URL in the response
//           order: savedOrder
//         });
//       }

//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };




// Make a api to check the Discoun on Users cart

exports.checkDiscount = async (req, res, next) => {
    try {
        const { Promo_code } = req.query;

        if (!Promo_code) {
            return res.status(400).json({ message: "Promo code is required" });
        }

        // Get the cart items
        const cartItems = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');

        if (!cartItems || cartItems.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        // Calculate total amount from updated cart items
        let totalAmount = cartItems.items.reduce((total, item) => {
            return total + (item.menuItem.price * item.quantity);
        }, 0);

        // Format totalAmount to two decimal places
        totalAmount = parseFloat(totalAmount.toFixed(2));

        let discountApplied = 0;
        let DiscountPercentage = 0;

        // Check if this is the user's first order
        const userOrder = await Order.find({ user: req.user._id });

        if (userOrder.length === 0) {
            // Check if the promo code is valid
            const coupon = await Coupon.findOne({ code: Promo_code, isActive: true });
            if (coupon) {
                // Apply discount if conditions are met
                if (totalAmount > 0) {
                    if (coupon.discountType === 'percentage') {
                        discountApplied = (coupon.discountValue / 100) * totalAmount;
                        DiscountPercentage = coupon.discountValue;
                    } else if (coupon.discountType === 'fixed') {
                        discountApplied = coupon.discountValue;
                    }
                    discountApplied = parseFloat(discountApplied.toFixed(2));
                } else {
                    return res.status(400).json({ message: "Total amount is below $0. Promo code cannot be applied." });
                }
            } else {
                return res.status(400).json({ message: "Invalid or inactive promo code." });
            }

            // Calculate total amount after applying discount
            const totalAmountBeforeDiscount = totalAmount;
            totalAmount -= discountApplied;
            totalAmount = parseFloat(totalAmount.toFixed(2));

            res.status(200).json({
                message: "Discount applied successfully",
                totalAmountBeforeDiscount,
                totalAmountAfterDiscount: totalAmount,
                discountApplied,
                DiscountPercentage
            });

        } else {
            return res.status(400).json({ message: "Promo code cannot be applied as this is not your first order." });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




exports.OrderList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search , meanusearch} = req.query;
        const currentPage = parseInt(page, 10);
        const itemsPerPage = parseInt(limit, 10);

        let orderQuery = Order.find({ user: req.user._id }).populate('payment'); // Filter by user_id

        if (search) {
            const startDate = new Date(search);
            startDate.setHours(0, 0, 0, 0); // Set start of the day
            const endDate = new Date(search);
            endDate.setHours(23, 59, 59, 999); // Set end of the day

            orderQuery = orderQuery.where('orderDate').gte(startDate).lte(endDate);

        }

        // Count total number of documents
        const totalOrders = await Order.countDocuments(orderQuery)

        // Calculate total number of pages
        const totalPages = Math.ceil(totalOrders / itemsPerPage);

        // Execute the query
        const orders = await orderQuery.limit(itemsPerPage).populate('items.menuItem').exec();

        // Prepare response data
        const formattedOrders = orders.map(order => ({
            _id: order._id,
            items: order.items.map(item => ({
                ...item.toObject(), // Convert Mongoose document to plain JavaScript object
                OrderId: order._id
            })),
            user: order.user,
            status: order.status,
            deliveryInfo: order.deliveryInfo,
            billingInfo: order.BillingInfo,
            deliveryDate: order.deliveryDate,
            totalAmount: order.totalAmount,
            discountApplied: order.discountApplied,
            totalAmountBeforeDiscount: order.totalAmountBeforeDiscount,
            discountPercentage: order.DiscountPercentage,
            payment: order.payment,
            orderDate: order.orderDate
        }));

        // Send response
        res.status(200).json({
            totalOrders,
            totalPages,
            currentPage,
            orders: formattedOrders
        });
    } catch (error) {
        next(error);
    }
};






// Show All Order List //

exports.AllOrderList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const currentPage = parseInt(page, 10);
        const itemsPerPage = parseInt(limit, 10);

        let orderQuery = Order.find()
            .populate('payment'); // Filter by user_id

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
        const orders = await orderQuery.skip(skip).limit(itemsPerPage)
            .populate({
                path: 'items.menuItem',
                select: '-qrCode'

            }).exec();

        // Prepare response data
        const formattedOrders = orders.map(order => ({
            _id: order._id,
            items: order.items.map(item => ({
                ...item.toObject(), // Convert Mongoose document to plain JavaScript object
                OrderId: order._id
            })),
            user: order.user,
            status: order.status,
            deliveryInfo: order.deliveryInfo,
            billingInfo: order.BillingInfo,
            deliveryDate: order.deliveryDate,
            totalAmount: order.totalAmount,
            discountApplied: order.discountApplied,
            totalAmountBeforeDiscount: order.totalAmountBeforeDiscount,
            discountPercentage: order.DiscountPercentage,
            payment: order.payment

        }));

        res.status(200).json({
            totalOrders,
            totalPages,
            currentPage,
            orders: formattedOrders
        });
    } catch (error) {
        next(error);
    }

}


// Get Order By Id
exports.getOrderById = async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const order = await Order.findById(id);
        console.log(("order is", order))
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
    const companyLogoUrl = 'https://authimages.s3.eu-west-2.amazonaws.com/banner-images/Color+logo+with+background+(2)+1.png'

    try {
        const foundOrder = await Order.findById(id);
        if (!foundOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });

        // Email templates based on order status
        let emailOptions;

        switch (updatedOrder.status) {
            case 'preparing':
                emailOptions = {
                    to: req.user.email,
                    subject: 'Order Preparing',
                    text: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                                color: #333;
                            }
                            .container {
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                overflow: hidden;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                background-color: #FFD700;
                                color: #ffffff;
                                padding: 20px;
                                text-align: center;
                            }
                            .header h1 {
                                margin: 0;
                                font-size: 24px;
                            }
                            .content {
                                padding: 20px;
                            }
                            .content p {
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .footer {
                                background-color: #f4f4f4;
                                color: #777;
                                text-align: center;
                                padding: 10px;
                                font-size: 12px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Your Order is Being Prepared</h1>
                            </div>
                            <div class="content">
                                <p>Hi ${req.user.firstname},</p>
                                <p>Your order is being prepared and will be delivered soon.</p>
                            </div>
                            <div class="footer">
                                <p>Thank you for choosing our service.</p>
                                <p>If you have any questions or concerns, feel free to <a href="mailto:support@authentichef.com">contact us</a> at support@authentichef.com.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    `
                };
                break;

            case 'ready':
                emailOptions = {
                    to: req.user.email,
                    subject: 'Order Ready',
                    text: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                                color: #333;
                            }
                            .container {
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                overflow: hidden;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                background-color: #4CAF50;
                                color: #ffffff;
                                padding: 20px;
                                text-align: center;
                            }
                            .header h1 {
                                margin: 0;
                                font-size: 24px;
                            }
                            .content {
                                padding: 20px;
                            }
                            .content p {
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .footer {
                                background-color: #f4f4f4;
                                color: #777;
                                text-align: center;
                                padding: 10px;
                                font-size: 12px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Your Order is Ready</h1>
                            </div>
                            <div class="content">
                                <p>Hi ${req.user.firstname},</p>
                                <p>Your order is ready and will be delivered soon.</p>
                            </div>
                            <div class="footer">
                                <p>Thank you for choosing our service.</p>
                                <p>If you have any questions or concerns, feel free to <a href="mailto:support@authentichef.com">contact us</a> at support@authentichef.com.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    `
                };
                break;

            case 'delivered':
                emailOptions = {
                    to: req.user.email,
                    subject: 'Order Delivered',
                    text: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                                color: #333;
                            }
                            .container {
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                overflow: hidden;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                background-color: #4CAF50;
                                color: #ffffff;
                                padding: 20px;
                                text-align: center;
                            }
                            .header h1 {
                                margin: 0;
                                font-size: 24px;
                            }
                            .content {
                                padding: 20px;
                            }
                            .content p {
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .footer {
                                background-color: #f4f4f4;
                                color: #777;
                                text-align: center;
                                padding: 10px;
                                font-size: 12px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Your Order has been Delivered</h1>
                            </div>
                            <div class="content">
                                <p>Hi ${req.user.firstname},</p>
                                <p>Your order has been delivered successfully.</p>
                            </div>
                            <div class="footer">
                                <p>Thank you for choosing our service.</p>
                                <p>If you have any questions or concerns, feel free to <a href="mailto:support@authentichef.com">contact us</a> at support@authentichef.com.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    `
                };
                break;

            case 'cancelled':
                emailOptions = {
                    to: req.user.email,
                    subject: 'Order Cancelled',
                    text: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                                color: #333;
                            }
                            .container {
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                overflow: hidden;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                background-color: #FF0000;
                                color: #ffffff;
                                padding: 20px;
                                text-align: center;
                            }
                            .header h1 {
                                margin: 0;
                                font-size: 24px;
                            }
                            .content {
                                padding: 20px;
                            }
                            .content p {
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .footer {
                                background-color: #f4f4f4;
                                color: #777;
                                text-align: center;
                                padding: 10px;
                                font-size: 12px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Your Order has been Cancelled</h1>
                            </div>
                            <div class="content">
                                <p>Hi ${req.user.firstname},</p>
                                <p>Your order has been cancelled.</p>
                            </div>
                            <div class="footer">
                                <p>Thank you for choosing our service.</p>
                                <p>If you have any questions or concerns, feel free to <a href="mailto:support@authentichef.com">contact us</a> at support@authentichef.com.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    `
                };
                break;

            default:
                break;
        }

        // Send email if there is an emailOptions object
        if (emailOptions) {
            await sendEmail(emailOptions);
        }

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

        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully' }); 1

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


// Make a Api to Cancel the order

exports.CancelOrder = async (req, res, next) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findOne({ _id: orderId, user: req.user._id }).populate('payment').populate('items.menuItem');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (!order.payment) {
            return res.status(400).json({ message: 'No payment information found for this order' });
        }

        // Check if the associated payment status is already 'refunded', 'failed', or 'cancelled'
        if (['refunded', 'failed', 'cancelled'].includes(order.payment.status)) {
            return res.status(400).json({ message: `Payment associated with this order is already ${order.payment.status}` });
        }

        // Refund the payment if the payment method is 'card' and the payment status is 'completed'
        if (order.payment.paymentMethod === 'card' && order.payment.transactionId) {
            try {
                console.log("Refunding payment for order:", order._id);
                const refund = await stripe.refunds.create({
                    payment_intent: order.payment.transactionId,
                    amount: order.totalAmount * 100, // Convert amount to cents
                });

                console.log("Refund response:", refund);

                if (!refund || refund.status !== 'succeeded') {
                    // Rollback the payment status to 'completed' if refund fails
                    order.payment.status = 'completed';
                    await order.payment.save();
                    await order.save();
                    return res.status(400).json({ message: 'Refund failed' });
                }
            } 
            catch (refundError) {
                console.error("Error processing refund:", refundError);
                return res.status(400).json({ message: 'Refund failed', error: refundError.message });
            }
        }

        // Update the payment status to 'cancelled'
        order.payment.status = 'cancelled';
        await order.payment.save();

        // Send email notification to the user
        // Implement email sending logic here

        res.status(200).json({ message: 'Order cancelled successfully', order });

    } catch (error) {
        console.error("Error in cancel order:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


