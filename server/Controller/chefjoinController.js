const BecomeChef = require('../Model/chefjoin');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file if using environment variables

// Nodemailer Connection

const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
        user: process.env.CLIENT_EMAIL,
        pass: process.env.CLIENT_EMAIL_PASSWORD,
    },
});

const sendEmail = async (options) => {
    try {
        const mailOptions = {
            from: process.env.CLIENT_EMAIL,
            to: options.to,
            subject: options.subject,
            html: options.text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}

// create a new chef

exports.createChef = async (req, res) => {
    try {
        const chef = await BecomeChef.create(req.body);
        res.status(201).json({
            success: true,
            data: chef,
        });

        // Send email to the user

        await sendEmail({
            to: req.body.Email,
            subject: 'Welcome to the Authentic Chef Community!',
            text: `
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        width: 100%;
                        padding: 20px;
                        background-color: #ffffff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        margin: 20px auto;
                        max-width: 600px;
                    }
                    .header {
                        text-align: center;
                        padding: 10px 0;
                        border-bottom: 1px solid #eeeeee;
                    }
                    .header h1 {
                        color: #333333;
                    }
                    .content {
                        padding: 20px;
                        line-height: 1.6;
                        color: #333333;
                    }
                    .content p {
                        margin: 0 0 10px;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px 0;
                        border-top: 1px solid #eeeeee;
                        color: #777777;
                        font-size: 12px;
                    }
                </style>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to Authentic Chef!</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${req.body.FirstName},</p>
                        <p>We are thrilled to have you join our diverse chef community, which is at the heart of the delicious food we serve.</p>
                        <p>At Authentic Chef, we support both new and established chefs in starting and growing their food businesses. We are excited to help you showcase your passion for creating exceptional culinary experiences.</p>
                        <p>We will review your application and get back to you soon. In the meantime, feel free to reach out if you have any questions.</p>
                        <p>Welcome aboard!</p>
                        <p>Best Regards,</p>
                        <p>The Authentic Chef Team</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Authentic Chef. All rights reserved.</p>
                    </div>
                </div>
            `,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
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




