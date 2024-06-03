// const mongoose = require('mongoose');

// const promoCodeSchema = new mongoose.Schema({
//     code: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     discountType: {
//         type: String,
//         enum: ['percentage', 'fixed'],
//         default: 'percentage',
//         required: true
//     },
//     discountValue: {
//         type: Number,
//         required: true
//     },
//     minOrderValue: {
//         type: Number, // Reflects the minimum total order amount required
//         required: true
//     },
//     expiryDate: {
//         type: Date,
//         required: true
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     }
// }, { timestamps: true });

// // Expire the coupon code after 7 days
// promoCodeSchema.pre('save', function(next) {
//     const expiryDate = new Date();
//     expiryDate.setDate(expiryDate.getDate() + 7); // Add 7 days to the current date
//     this.expiryDate = expiryDate;
//     next();
// });

// // Update isActive based on expiryDate
// promoCodeSchema.pre('save', function(next) {
//     const currentDate = new Date();
//     if (this.expiryDate < currentDate) {
//         this.isActive = false; // Set isActive to false if the coupon has expired
//     }
//     next();
// });

// module.exports = mongoose.model('Coupon', promoCodeSchema);


const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
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

}, { timestamps: true });

// Expire the coupon midnight GMT 30th June 2024

promoCodeSchema.pre('save', function(next) {
    const expiryDate = new Date('2024-06-30T23:59:59Z');
    this.expiryDate = expiryDate;
    next();

}
);

// Update isActive based on expiryDate
promoCodeSchema.pre('save', function(next) {
    const currentDate = new Date();
    if (this.expiryDate < currentDate) {
        this.isActive = false; // Set isActive to false if the coupon has expired
    }
    next();
});


module.exports = mongoose.model('Coupon', promoCodeSchema);

