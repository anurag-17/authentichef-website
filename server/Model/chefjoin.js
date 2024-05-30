const mongoose = require('mongoose');

const chefjoinSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        ref: 'Chef',
        required: true
    },
    Surname: {
        type: String,
        ref: 'Order',
        required: true
    },
    Phone: {
        type: String,
        default: true
    },
    Email: {
        type: String,
        required: true
    },
    Postcode: {
        type: String,
        required: true
    },
    Status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    }
}, 
{ timestamps: true }
);

const BecomeChef = mongoose.model('Chefjoin', chefjoinSchema);

module.exports = BecomeChef;
