const TermsandServices = require("../Model/Termsandservices");

// create and save a new TermsandServices


exports.create = async(req,res)=>{
    try{
        const newTermsandServices = new TermsandServices({
            title: req.body.title,
            Description: req.body.Description
        });

        const data = await newTermsandServices.save();
        res.send(data);

    }catch(error){
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the TermsandServices."
        });

    }
}



// Retrieve all TermsandServicess from the database.

exports.findAll = async(req, res) => {
    try{
        const finddata = await TermsandServices.find();
        res.status(200).json({
            status: "success",
            data: finddata
        })

    }catch(err){
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving TermsandServicess."
        });
    }
}


// Find a single TermsandServices with an id

exports.findOne = async(req, res) => {
    const id = req.params.id;

    try{
        const data = await TermsandServices.findById(id);
        if (!data)
            res.status(404).send({ message: "Not found TermsandServices with id " + id });
        else res.send(data);

    }catch(err){
        res.status(500).send({ message: "Error retrieving TermsandServices with id=" + id });
    }
}


// Update a TermsandServices by the id in the request

exports.update = async(req, res) => {
    const id = req.params.id;

    try{
        const data = await TermsandServices.findByIdAndUpdate(id, req.body, {new: true});
        if (!data) {
            return res.status(404).send({
                message: "Not found TermsandServices with id " + id
            });
        }
        res.status(200).send({ message: "TermsandServices was updated successfully." });
}
catch(err){
    res.status(500).send({
        message: "Error updating TermsandServices with id=" + id
    });
}

}


// Delete a TermsandServices with the specified id in the reques    

exports.deleteTerms = async(req, res) => {
    const id = req.params.id;

    try{
        const data = await TermsandServices.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).send({
                message: "Not found TermsandServices with id " + id
            });
        }
        res.status(200).send({ message: "TermsandServices was deleted successfully!" });
    }catch(err){
        res.status(500).send({
            message: "Could not delete TermsandServices with id=" + id
        });
    }
}