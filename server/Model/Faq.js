const mongoose = require('mongoose')
const faqSchema = new mongoose.Schema({
    title:{

    },
    Queries:[
        {
            question:{
                type:String,

            },
            answer:{
                type:String
            }
        }
    ]
},{
    timestamps:true
})

//  Write the model for Faq here

module.exports = mongoose.model('Faq',faqSchema)