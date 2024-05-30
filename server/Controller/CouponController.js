const Coupon = require("../Model/Coupon");

// @desc Create a new coupon
// @route POST /api/v1/coupons
exports.createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json({
            success: true,
            data: coupon
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message // Provide error message for better understanding
        });
    }
}

// @desc Get all coupons
// @route GET /api/v1/coupons
exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json({
            success: true,
            count: coupons.length,
            data: coupons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error' // Generic error message to hide sensitive details
        });
    }
}

// @desc Get a single coupon
// @route GET /api/v1/coupons/:id
exports.getCouponbyId = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            return res.status(404).json({
                success: false,
                error: 'Coupon not found'
            });
        }
        res.status(200).json({
            success: true,
            data: coupon
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Invalid Coupon ID' // Generic error message for invalid ID
        });
    }
}

// @desc Update a coupon
// @route PUT /api/v1/coupons/:id
exports.updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!coupon) {
            return res.status(404).json({
                success: false,
                error: 'Coupon not found'
            });
        }
        res.status(200).json({
            success: true,
            data: coupon
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message // Provide error message for better understanding
        });
    }
}

exports.deleteCoupon = async (req, res) => {
    const {id}=req.params;
    try{
        const Findid = await Coupon.findById(id)
        if(!Findid){
            return res.status(404).json({
                success: false,
                error: 'Coupon not found'
            });
        }

        const UpdateCoupon = await Coupon.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: UpdateCoupon
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message // Provide error message for better understanding
        });
    }
}
