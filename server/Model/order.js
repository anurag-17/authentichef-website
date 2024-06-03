const mongoose = require("mongoose");

const deliveryInfoSchema = new mongoose.Schema({
    phone: {
        type: String,
    },
    houseNo: {
        type: String,

    },
    buildingName: String, // Assuming a building name might not always be required
    streetName: {
        type: String,

    },
    City: {
        type: String,

    },
    country: {
        type: String,

    },
    FirstName: {
        type: String,


    },
    LastName: {
        type: String,

    },
    Type_of_Address: {
        type: String,
        enum: ["Shipping Address", "Billing address"],
        default: "Shipping Address"
    }
});

const BillingInfoSchema = new mongoose.Schema({
    phone: {
        type: String,
    },
    houseNo: {
        type: String,

    },
    buildingName: String, // Assuming a building name might not always be required
    streetName: {
        type: String,

    },
    City: {
        type: String,

    },
    country: {
        type: String,

    },
    FirstName: {
        type: String,


    },
    LastName: {
        type: String,
    },
    Type_of_Address: {
        type: String,
        enum: ["Shipping Address", "Billing address"],
        default: "Shipping Address"
    }

})


const orderSchema = new mongoose.Schema({
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MenuItem"
            },
            quantity: {
                type: Number,

            },
            customization: String,
            price: {
                type: Number,

            },
            ProfileImage: {
                type: mongoose.Schema.Types.Mixed,

            },
            name: {
                type: String,

            }
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "preparing", "ready", "delivered", "cancelled"],
        default: "pending",
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryInfo: [deliveryInfoSchema], // Array of delivery addresses
    BillingInfo: [BillingInfoSchema],
    deliveryDate: {
        type: Date,
    },

    totalAmount: {
        type: Number,
    },

    Delivery_instruction: {
        type: String,
        required: false
    },

    Promo_code: {
        type: String,
        required: false
    },
    discountApplied: { type: Number, default: 0 },
    // Add discountApplied field
    DiscountPercentage: {
        type: Number,
        default: 0
    },

    totalAmountBeforeDiscount: { type: Number, default: 0 },
    // Add totalAmountBeforeDiscount field

    // Add the shipping Cost


    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
    TransactionId: {
        type: String
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
