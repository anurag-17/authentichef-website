const mongoose = require("mongoose");
const NutritionalSchema = new mongoose.Schema({

    Nutritional: {
        type: String,
        required: true,
    }

})


const Nutrition = mongoose.model("Nutritional", NutritionalSchema);

module.exports = Nutrition;