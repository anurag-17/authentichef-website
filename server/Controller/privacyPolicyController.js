const privacypolicy = require("../Model/privacypolicy");


// Create and Save a new privacypolicy

exports.create = async (req, res) => {
    try {
        const newPrivacyPolicy = await privacypolicy.create(req.body);
        res.status(200).json({
            message: "Privacy Policy created successfully",
            data: newPrivacyPolicy
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



// Get all privacypolicy

exports.findAll = async (req, res) => {
    try {
        const allPrivacyPolicies = await privacypolicy.find();
        res.status(200).json({
            message: "All Privacy Policies fetched successfully",
            data: allPrivacyPolicies
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// Find a single privacypolicy with an id

exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const foundPrivacyPolicy = await privacypolicy.findById(id);
        if (!foundPrivacyPolicy) {
            return res.status(404).json({
                message: `Privacy Policy not found with id ${id}`
            });
        }
        res.status(200).json({
            message: "Privacy Policy fetched successfully",
            data: foundPrivacyPolicy
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// Update a privacypolicy by the id in the request

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedPrivacyPolicy = await privacypolicy.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedPrivacyPolicy) {
            return res.status(404).json({
                message: `Privacy Policy not found with id ${id}`
            });
        }
        res.status(200).json({
            message: "Privacy Policy updated successfully",
            data: updatedPrivacyPolicy
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


exports.deletePolicy = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPrivacyPolicy = await privacypolicy.findByIdAndDelete(id);
        if (!deletedPrivacyPolicy) {
            return res.status(404).json({
                message: `Privacy Policy not found with id ${id}`
            });
        }
        res.status(200).json({
            message: 'Privacy Policy deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
