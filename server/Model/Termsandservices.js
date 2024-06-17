const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TermsandServicesSchema = new Schema({
    title: {
        type: String,
        required: true // You might want to make this field required
    },
    Description: {
        type: String,
        required: true // You might want to make this field required
    }
}, {
    timestamps: true // Corrected this part to enable timestamps
});

const TermsandServices = mongoose.model('TermsandServices', TermsandServicesSchema);

module.exports = TermsandServices;
