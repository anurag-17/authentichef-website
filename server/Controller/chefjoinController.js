const BecomeChef = require('../Model/chefjoin');

// create a new chef

exports.createChef = async (req, res) => {
    try {

        const findchef = await BecomeChef.findOne({ Email: req.body.Email });

        if (findchef) {
            return res.status(400).json({
                success: false,
                error: 'Email already exists'
            });
        }

        const chef = await BecomeChef.create(req.body);
        res.status(201).json({
            success: true,
            data: chef
        });

    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}


// get all chefs

exports.getChefs = async (req, res) => {
    try {
        const chefs = await BecomeChef.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: chefs.length,
            data: chefs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}


// get a single chef

exports.getChefbyId = async (req, res) => {
    try {
        const chef = await BecomeChef.findById(req.params.id);
        if (!chef) {
            return res.status(404).json({
                success: false,
                error: 'Chef not found'
            });
        }
        res.status(200).json({
            success: true,
            data: chef
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Invalid Chef ID'
        });
    }
}


// update a chef

exports.updateChef = async (req, res) => {
    const {id}=req.params;
    try{
        const findchef = await BecomeChef.findById(id);
        if(!findchef){
            return res.status(404).json({
                success: false,
                error: 'Chef not found'
            });
        }
        const chef = await BecomeChef.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: chef
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}


// delete a chef

exports.deleteChef = async (req, res) => {
    const {id}=req.params;
    try{
        const findchef = await BecomeChef.findById(id);
        if(!findchef){
            return res.status(404).json({
                success: false,
                error: 'Chef not found'
            });
        }
        const chef = await BecomeChef.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: chef
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}




