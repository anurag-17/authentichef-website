const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },



    sessionId:{
        type: String,
        required: true
    },


    successUrl:{
        type: String,
        required: true
    }

    
    })

module.exports = mongoose.model('Session', sessionSchema);