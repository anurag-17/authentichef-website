const mongoose = require('mongoose'); 
const RefundPolicySchema = new mongoose.Schema({


    title:{
        type:String,

    },

    intro:{
        type:String,
    },

    sections:[{
        title:{

            type:String,
        },
        content:{
            type:String,
        },
    }],
    queries:{
        type:String,
    },
    Note:{
        type:String,
    }

},{
    timestamps:true
})

const RefundPolicy = mongoose.model('RefundPolicy',RefundPolicySchema);
module.exports = RefundPolicy;