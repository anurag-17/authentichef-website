const mongoose = require('mongoose')
const TestimonalSchema = new mongoose.Schema({
    
    Name:{
        type:String,
    },
    Profile_Image:{
        type:String,
    },
    Rating:{
        type:Number,
    },

    Description:{
        type:String,
    }
    
},
{
    timestamps:true
}
)

const Testimonal = mongoose.model('Testimonal',TestimonalSchema)
module.exports = Testimonal