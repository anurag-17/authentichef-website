const FaqModel = require('../Model/Faq');


// Write the controller for Faq here
//  create a new Faq

exports.createFaq = async (req, res) => {
    try {
        const faq = new FaqModel(req.body);
        await faq.save();
        res.status(201).send(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// get all Faq

exports.getAllFaq = async (req, res) => {
    try {
        const faq = await FaqModel.find();
        res.status(200).send(faq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// get a single Faq

exports.getSingleFaq = async (req, res) => {
    try {
        const faq = await FaqModel.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'Faq not found' });
        }
        res.status(200).send(faq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// update a Faq

exports.updateFaq = async (req, res) => {
    try {
        const faq = await FaqModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!faq) {
            return res.status(404).json({ message: 'Faq not found' });
        }
        await faq.save();
        res.status(200).send(faq);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a Faq

exports.deleteFaq = async (req, res) => {
    try {
        const faq = await FaqModel.findByIdAndDelete(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'Faq not found' });
        }
        res.status(200).send({ message: 'Faq deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}