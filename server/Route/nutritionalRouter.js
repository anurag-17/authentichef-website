const express = require("express");
const router = express.Router();
const {
    createNutritional,
    getAllNutritional,
    getNutritionalById,
    updateNutritionalById,
    deleteNutritionalById
} = require("../Controller/nutritional");


// Create a new Nutritional

router.post("/nutritional", createNutritional);

// Get all Nutritional

router.get("/nutritional", getAllNutritional);


// Get a single Nutritional by ID

router.get("/nutritional/:id", getNutritionalById);

// Update a Nutritional by ID

router.put("/nutritional/:id", updateNutritionalById);

// Delete a Nutritional by ID

router.delete("/nutritional/:id", deleteNutritionalById);

module.exports = router;