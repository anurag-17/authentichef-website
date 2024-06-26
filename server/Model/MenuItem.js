const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },


    popular_dish: {
      type:String,
      enum:['Yes','No'],
      default:'No'
    },

    popular_chef:{
      type:String,
      enum:['Yes','No'],
      default:'No'
    },

    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    weight:{
      type:Number,
    },
    portion_Size:{
      type:String,
    },
    Ingredients: {
      type: String,
    },

    Heating_Instruction:{
    type:String,
    },

    List_of_Allergens:{
      type:String,
    },

    Cuisines_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuisines"
    },

    Dishtype_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DishType"
    },

    Dietary_id:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Dietary'
    }],

    spice_level_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'SpiceLevel'
    },
    
    chef_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chef",
    },

    // Add Nutrition Id and send a Multiple //
    
    Nutrition_id:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nutritional",
    }],

    nutritional_information:{
      type:String,
    },


    // for the QR code
    qrCode: {
      type: String, // Store the QR code as a data URI string
    },


    ProfileImage: {
      type: Array,
    },

    SKU_Number:{
      type:String,
    },
    
    stocks: {
      type: Number,
      min: 0, // Ensure the stock count can't be negative
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
