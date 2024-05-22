const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: false,
    },
    paymentMethod: [{
        type: String,
        enum: ["upi", "card" , "COD"],
        default: "COD",
        required: false,
    }],
    
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
