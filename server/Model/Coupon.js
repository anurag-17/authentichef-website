const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        default: 'percentage',
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiryDate: {
        type: Date
    },
    duration: {
        type: String,  // Adjusted to String type based on your requirement
        enum: ['once', 'repeating']  // Enum values based on your use case
    },
    duration_in_months: {
        type: Number
    },
    percentOff: {
        type: Number
    }
}, { timestamps: true });

// Expire the coupon midnight GMT 30th June 2024
promoCodeSchema.pre('save', function(next) {
    const expiryDate = new Date('2024-06-30T23:59:59Z');
    this.expiryDate = expiryDate;
    next();
});

// Update isActive based on expiryDate
promoCodeSchema.pre('save', function(next) {
    const currentDate = new Date();
    if (this.expiryDate < currentDate) {
        this.isActive = false; // Set isActive to false if the coupon has expired
    }
    next();
});

module.exports = mongoose.model('Coupon', promoCodeSchema);
