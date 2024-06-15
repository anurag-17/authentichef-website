const RefundPolicy = require('../Model/RefundPolicy');

// @desc    Create a new refund policy

// @route   POST /api/v1/refund-policy

exports.createRefundPolicy = async (req, res, next) => {
    try {
        const refundPolicy = await RefundPolicy.create(req.body);

        res.status(201).json({
            success: true,
            data: refundPolicy
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}


// @desc    Get all refund policies

// @route   GET /api/v1/refund-policy

exports.getRefundPolicies = async (req, res, next) => {
    try {
        const refundPolicies = await RefundPolicy.find();

        res.status(200).json({
            success: true,
            data: refundPolicies
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}


// @desc    Get single refund policy

// @route   GET /api/v1/refund-policy/:id

exports.getRefundPolicy = async (req, res, next) => {
    try {
        const refundPolicy = await RefundPolicy.findById(req.params.id);

        if (!refundPolicy) {
            return res.status(404).json({
                success: false,
                error: 'Refund Policy not found'
            });
        }

        res.status(200).json({
            success: true,
            data: refundPolicy
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Invalid Refund Policy ID'
        });
    }
}


// @desc    Update refund policy

// @route   PUT /api/v1/refund-policy/:id

exports.updateRefundPolicy = async (req, res, next) => {
    try {
        const refundPolicy = await RefundPolicy.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!refundPolicy) {
            return res.status(404).json({
                success: false,
                error: 'Refund Policy not found'
            });
        }
        res.status(200).json({
            success: true,
            data: refundPolicy
        });

}catch(error){
    res.status(400).json({
        success: false,
        error: error.message
    });
}

}

// @desc    Delete refund policy

// @route   DELETE /api/v1/refund-policy/:id

exports.deleteRefundPolicy = async (req, res, next) => {
    try {
        const refundPolicy = await RefundPolicy.findByIdAndDelete(req.params.id);
        if (!refundPolicy) {
            return res.status(404).json({
                success: false,
                error: 'Refund Policy not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}