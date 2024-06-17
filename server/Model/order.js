const mongoose = require("mongoose");
const moment = require('moment-timezone');


const getLondonTime = () => {
    // Get current date and time
    const now = new Date();

    // Format the date to the "Europe/London" timezone
    const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // Get the formatted date and time parts
    const parts = formatter.formatToParts(now);

    // Extract the date and time components
    const dateParts = {};
    parts.forEach(({ type, value }) => {
        dateParts[type] = value;
    });

    // Construct the London time as a Date object
    const londonTime = new Date(`${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}Z`);

    return londonTime;
};


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

    Postcode:{
        type:String
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
    
    Postcode:{
        type:String
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
        enum: ["pending", "preparing", "ready", "delivered", "cancelled" ,"completed"],
        default: "pending",
    },


    orderDate: {
        type: Date,
        default: getLondonTime
        // default: moment.tz(Date.now(), "Europe/London").toDate()
    },


    deliveryInfo: [deliveryInfoSchema], // Array of delivery addresses
    BillingInfo: [BillingInfoSchema],
    deliveryDate: {
        type: Date,
        default: () => moment.tz(Date.now(), "Europe/London").toDate()
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

    shippingCharge: {
        type: Number,
        default: 0
    },

    totalAmountBeforeDiscount: { type: Number, default: 0 },
    // Add totalAmountBeforeDiscount field
     
    // Enter the OrderNumber

    OrderNumber: {
        type: Number,
    },

    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
    TransactionId: {
        type: String
    }
},{
    timestamps:true
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
