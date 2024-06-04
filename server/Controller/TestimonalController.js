const Testimonal = require('../Model/TestimonalModel');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const multer = require('multer');
dotenv.config();

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
});

const s3 = new AWS.S3();

// Define multer configuration
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
};


const upload = multer({fileFilter}).single('Profile_Image');

exports.upload = upload;

// Create a new Testimonial
exports.create = async (req, res) => {
    try {
        const { Name, Rating, Description } = req.body;

        // Upload image to S3 bucket
        upload(req, res, async (error) => {

            const Profile_Image = req.file;

            if (!Profile_Image || !Profile_Image.buffer || Profile_Image.buffer.length === 0) {
                return res.status(400).json({ error: "Invalid image" });
            }

            const bucketName = process.env.BUCKET;
            const uploadParams = {
                Bucket: bucketName,
                Key: `profile-images/${Date.now()}-${Profile_Image.originalname}`, // Using originalname for unique key
                Body: Profile_Image.buffer,
                ContentType: Profile_Image.mimetype
            };

            const s3UploadResponse = await s3.upload(uploadParams).promise();
            const imageUrl = s3UploadResponse.Location;

            // Create a new Testimonial with the image URL
            const testimonial = new Testimonal({
                Name,
                Rating,
                Description,
                Profile_Image: imageUrl
            });


            // Save the Testimonial to the database
            const newTestimonial = await testimonial.save();

            // Send response with the created Testimonial
            res.status(201).json(newTestimonial);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Get all Testimonials

exports.findAll = async (req, res) => {
    try {
        const testimonials = await Testimonal.find();
        res.status(200).json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Get a single Testimonial by ID

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const testimonial = await Testimonal.findById(id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.status(200).json(testimonial);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }

}


// Update a Testimonial by ID

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { Name, Rating, Description } = req.body;
        const testimonial = await Testimonal.findById(id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        // Upload image to S3 bucket
        upload(req, res, async (error) => {

            const Profile_Image = req.file;

            if (Profile_Image && Profile_Image.buffer && Profile_Image.buffer.length > 0) {
                const bucketName = process.env.BUCKET;
                const uploadParams = {
                    Bucket: bucketName,
                    Key: `profile-images/${Date.now()}-${Profile_Image.originalname}`, // Using originalname for unique key
                    Body: Profile_Image.buffer,
                    ContentType: Profile_Image.mimetype
                };

                const s3UploadResponse = await s3.upload(uploadParams).promise();
                const imageUrl = s3UploadResponse.Location;

                testimonial.Profile_Image = imageUrl;
            }

            testimonial.Name = Name;
            testimonial.Rating = Rating;
            testimonial.Description = Description;

            await testimonial.save();
            res.status(200).json(testimonial);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Delete a Testimonial by ID

exports.deletedTestimonial = async (req, res) => {
    try {
        const id = req.params.id;
        const testimonial = await Testimonal.findById(id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        const deletedTestimonial = await Testimonal.findByIdAndDelete(id);
        res.status(200).json(deletedTestimonial);
    }
    catch(error){
        res.status(500).json({ message: err.message });
    }


}