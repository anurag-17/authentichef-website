const mongoose = require('mongoose');

const generateUniqueId = () => {
    return Math.floor(10000000 + Math.random() * 90000000); // Generates an 8-digit number
};

const faqSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Assuming title should be required, adjust as needed
    },
    Queries: [
        {
            questionId: {
                type: Number,
                default: generateUniqueId,
                unique: true // Ensures questionId is unique
            },
            question: {
                type: String,
                required: true // Assuming question should be required, adjust as needed
            },
            answer: {
                type: String,
                required: true // Assuming answer should be required, adjust as needed
            }
        }
    ]
}, {
    timestamps: true
});

// Write the model for Faq here
module.exports = mongoose.model('Faq', faqSchema);
