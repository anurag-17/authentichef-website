const express  = require('express');
const router = express.Router();
const { createCoupon, getCoupons, getCouponbyId ,updateCoupon,deleteCoupon } = require('../Controller/CouponController');
const{isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');


// Create a new coupon
router.post('/', isAuthenticatedUser,  authorizeRoles("admin"), createCoupon);

// Get all coupons

router.get('/', isAuthenticatedUser,  authorizeRoles("admin"), getCoupons);

// Get a single coupon

router.get('/:id',isAuthenticatedUser,  authorizeRoles("admin"), getCouponbyId);

// Update a coupon


router.put('/:id', isAuthenticatedUser,  authorizeRoles("admin"), updateCoupon);

// Delte a coupon

router.delete('/:id', isAuthenticatedUser,  authorizeRoles("admin"), deleteCoupon);

module.exports = router;
