const stripe = require('../config/payment');
const Order = require("../Model/order");
const Cart = require("../Model/cart");
const Payment = require('../Model/payment');
const userMailOptions = require("../Public/userMailOption");
const adminMailOptions = require("../Public/adminMailOption");

const endpointSecret = 'whsec_kcOaFwGKtjbTXHCtafkCzHSCZuY72f3Z';

exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        console.log("Request received", event.type)
        console.log("Request received", event.data.object)
        console.log("Reqest data",req.body)
        

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            const userId = session.metadata.userId;
            const deliveryDate = session.metadata.deliveryDate;
            const deliveryInfo = JSON.parse(session.metadata.deliveryInfo);
            const BillingInfo = JSON.parse(session.metadata.BillingInfo);
            const Type_of_Address = session.metadata.Type_of_Address;
            const Delivery_instruction = session.metadata.Delivery_instruction;
            const Promo_code = session.metadata.Promo_code;
            const totalAmountBeforeDiscount = parseFloat(session.metadata.totalAmountBeforeDiscount);
            const discountApplied = parseFloat(session.metadata.discountApplied);
            const DiscountPercentage = parseFloat(session.metadata.DiscountPercentage);

            // Get the cart items
            const cartItems = await Cart.findOne({ user: userId }).populate('items.menuItem');

            if (!cartItems || cartItems.items.length === 0) {
                console.error('Cart is empty or not found');
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
                Type_of_Address: Type_of_Address || 'Shipping Address',
                status: 'completed',
                payment: null,
                TransactionId: session.payment_intent // Include the transaction ID in the order
            });

            const savedOrder = await newOrder.save();

            if (!savedOrder) {
                console.error('Order creation failed');
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

            // Delete the cart after placing the order
            await Cart.deleteOne({ _id: cartItems._id });

            // Send confirmation email to the user
            const emailOptions = userMailOptions(req, savedOrder, deliveryDate, deliveryInfo, totalAmount, cartItems, 'card');
            transporter.sendMail(emailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email to user:', error);
                } else {
                    console.log('Email sent to user:', info.response);
                }
            });

            // Send notification email to the admin
            const adminoptions = adminMailOptions(req, savedOrder, deliveryDate, deliveryInfo, 'card', totalAmount, cartItems);
            transporter.sendMail(adminoptions, (error, info) => {
                if (error) {
                    console.error('Error sending email to admin:', error);
                } else {
                    console.log('Email sent to admin:', info.response);
                }
            });

            res.status(200).json({ received: true });
        } else {
            // Handle other event types or ignore unrecognized events
            res.status(200).json({ received: false });
        }
    } catch (err) {
        console.error('Error processing webhook event:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};
