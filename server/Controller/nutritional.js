const Nutrition = require("../Model/nutritionalModel");

// Create a new Nutritional

exports.createNutritional = async (req, res) => {
    try {
        const { Nutritional } = req.body;
        const nutritional = await Nutrition.findOne({ Nutritional });
        if(nutritional) {
            return res.status(400).json({ error: 'Nutritional already exists' });
        }
        const newNutritional = new Nutrition({ Nutritional });
        await newNutritional.save();
        res.json(newNutritional);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Get all Nutritional

exports.getAllNutritional = async (req, res) => {
    try {
        const nutritional = await Nutrition.find();
        if (!nutritional) {
            return res.status(404).json({ error: 'Nutritional not found' });
        }
        res.json({ nutritional });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Get a single Nutritional by ID

exports.getNutritionalById = async (req, res) => {
    const { id } = req.params;
    try {
        const nutritional = await Nutrition.findById(id);
        if (!nutritional) {
            return res.status(404).json({ error: 'Nutritional not found' });
        }
        res.json(nutritional);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Update a Nutritional by ID

exports.updateNutritionalById = async (req, res) => {
    const { id } = req.params;
    try {
        const nutritional = await Nutrition.findById(id);
        if (!nutritional) {
            return res.status(404).json({ error: 'Nutritional not found' });
        }
        const updatedNutritional = await Nutrition.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedNutritional) {
            return res.status(404).json({ error: 'Nutritional not found' });
        }
        res.json(updatedNutritional);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Delete a Nutritional by ID

exports.deleteNutritionalById = async (req, res) => {
    const { id } = req.params;
    try {
        const nutritional = await Nutrition.findById(id);
        if (!nutritional) {
            return res.status(404).json({ error: 'Nutritional not found' });
        }
        await Nutrition.findByIdAndDelete(id);
        res.json({ message: 'Nutritional deleted successfully' });

}
catch(error) {
    res.status(500).json({ error: error.message });
}
}